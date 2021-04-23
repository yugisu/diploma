import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { promisify } from 'util'
import type { Server } from 'http'
import { PrismaClient } from '@prisma/client'
import { gql, ApolloServer, makeExecutableSchema } from 'apollo-server-koa'

import { __DEV__ } from 'enums/constants'

const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    id: Int
    email: String
  }

  type Query {
    user: User
    number: Float
  }
`

const resolvers = {
  Query: {
    user: async () => ({ id: 1, email: 'email' }),

    number: async () => 2,
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  inheritResolversFromInterfaces: true,
})

const apolloServer = new ApolloServer({
  schema,
  context: (ctx) => ({ ...ctx, prisma }),
  formatError: (error) => (console.log(error), error),
})

export const initServer = async () => {
  await prisma.$connect()

  const app = new Koa()

  app.use(koaBody())

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  const server = app.listen({ port: 3000 }, () => {
    console.log('Server listening on localhost:3000...')
  })

  return server
}

export const shutdownServer = (server: Server) => {
  promisify(server.close)()

  prisma.$disconnect()
}
