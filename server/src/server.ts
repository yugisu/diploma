import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-koa'
import jwt from 'koa-jwt'
import Router from '@koa/router'

import type { JwtTokenData } from 'types/user'
import { getGqlSchema } from 'provided/graphql'
import authRouter from 'provided/routes/auth'

export const initServer = async () => {
  const app = new Koa()

  // Set up Prisma

  const prisma = new PrismaClient()

  await prisma.$connect()

  app.context.prisma = prisma

  // Apply middlewares

  app.use(
    jwt({
      secret: process.env.JWT_SECRET,
      key: 'decodedToken',
      cookie: 'auth',
    }).unless({
      // All API endpoints should be guarded by authentication except of authentication ones (excluding /logout)
      path: [/^\/api\/auth(?!\/logout)/],
    }),
  )

  app.use<{ decodedToken?: JwtTokenData }>(async (ctx, next) => {
    if (ctx.state.decodedToken) {
      const { sessionId } = ctx.state.decodedToken

      const activeUserSession = await ctx.prisma.userSession.findFirst({
        where: { id: sessionId, endedAt: null },
        select: { user: true },
      })

      if (activeUserSession) {
        const { user } = activeUserSession

        ctx.state.sessionId = sessionId
        ctx.state.user = user
      } else {
        ctx.throw(401)
      }
    }

    return next()
  })

  app.use(koaBody())

  // Create root API router

  const apiRouter = new Router<{}, Context>({ prefix: '/api' })

  apiRouter.use(authRouter.routes(), authRouter.allowedMethods())

  // Apply routes

  app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

  // Set up GraphQL server

  const graphqlSchema = await getGqlSchema()

  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    context: (ctx: Context) => ctx,
    playground: {},
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  // Run server

  const server = app.listen({ port: process.env.PORT }, () => {
    console.log('Server listening on localhost:3000...')
  })

  return server
}
