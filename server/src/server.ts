import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-koa'
import jwt from 'koa-jwt'
import Router from '@koa/router'
import cors from '@koa/cors'
import { whitelistedUrlPatterns } from '@diploma/shared'

import type { JwtTokenData } from 'types/auth'
import { getGqlSchema } from 'provided/graphql'
import authRouter from 'provided/routes/auth'
import { logger } from 'utils/logger'

export const initServer = async () => {
  // Set up Prisma

  const prismaClient = new PrismaClient()

  await prismaClient.$connect()

  const app = new Koa()

  app.context.prisma = prismaClient

  // Error handling

  app.on('error', (err) => {
    logger.error(err)
  })

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        message: err.message,
      }

      ctx.app.emit('error', err, ctx)
    }
  })

  // Apply middlewares

  app.use(cors())

  // Add request logger when in development
  if (process.env.NODE_ENV === 'development') {
    app.use(async (ctx, next) => {
      let status

      try {
        await next()

        status = ctx.status
      } catch (error) {
        status = error.statusCode || error.status

        throw error
      } finally {
        const maxBodyLength = 300

        let message = `[${ctx.method} ${ctx.url}] ${status}`

        // Ignore graphql requests as they are too verbose
        if (ctx.url !== '/graphql') {
          const serializedRequestBody = JSON.stringify(ctx.request.body, null, 2)

          const serializedResponseBody = typeof ctx.body === 'object' ? JSON.stringify(ctx.body, null, 2) : ctx.body

          if (serializedRequestBody) {
            message += `\nRequest body: ${serializedRequestBody.slice(0, maxBodyLength)}`
          }

          if (serializedResponseBody) {
            message += `\nResponse body: ${serializedResponseBody.slice(0, maxBodyLength * 2)}`
          }
        }

        logger.info(message)
      }
    })
  }

  app.use(
    jwt({
      secret: process.env.JWT_SECRET,
      key: 'decodedToken',
      cookie: 'auth',
    }).unless({
      custom: (ctx) => {
        // Disable authentication for GraphQL tools in development
        if (
          process.env.NODE_ENV === 'development' &&
          ctx.url === '/graphql' &&
          (ctx.method === 'GET' || ctx.headers.authorization === 'graphql-development')
        ) {
          return true
        }

        // All API endpoints are guarded by authentication except of authentication ones (excluding /logout)
        if (
          whitelistedUrlPatterns.some((pattern) =>
            typeof pattern === 'string' ? ctx.url.endsWith(pattern) : pattern.test(ctx.url),
          )
        ) {
          return true
        }

        return false
      },
    }),
  )

  app.use<{ decodedToken?: JwtTokenData }>(async (ctx, next) => {
    if (ctx.state.decodedToken) {
      const { sessionId } = ctx.state.decodedToken

      const activeUserSession = await ctx.prisma.userSession.findFirst({
        where: { id: sessionId, endedAt: null },
        select: {
          userId: true,
          profileId: true,
        },
      })

      if (activeUserSession) {
        const { userId, profileId } = activeUserSession

        ctx.state.sessionId = sessionId
        ctx.state.userId = userId
        ctx.state.profileId = profileId
      } else {
        ctx.throw(401)
      }
    }

    return next()
  })

  app.use(koaBody())

  // Create root API router

  const apiRouter = new Router<{}, Context>({ prefix: '/api' })

  apiRouter.get('/ping', (ctx) => {
    ctx.status = 204
  })

  apiRouter.use(authRouter.routes(), authRouter.allowedMethods())

  // Apply routes

  app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

  // Set up GraphQL server

  const graphqlSchema = await getGqlSchema()

  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    context: ({ ctx }: { ctx: Context }): GqlContext => {
      const { prisma, state } = ctx

      return { prisma, state }
    },
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  // Run server

  const server = app.listen({ port: process.env.PORT }, () => {
    logger.info(`Server running on port "${process.env.PORT}"...`)
  })

  return server
}
