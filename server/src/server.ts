import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-koa'

import { getGqlSchema } from 'provided/graphql'

const prisma = new PrismaClient()

export const initServer = async () => {
  await prisma.$connect()

  const app = new Koa()

  app.use(koaBody())

  const graphqlSchema = await getGqlSchema()

  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    context: (ctx) => ({ ...ctx, prisma }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  const server = app.listen({ port: 3000 }, () => {
    console.log('Server listening on localhost:3000...')
  })

  return server
}

export const shutdownServer = async () => {
  await prisma.$disconnect()
}
