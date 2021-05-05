import { buildSchema } from 'type-graphql'

import { resolvers as generatedResolvers } from 'generated/typegraphql-prisma'

export const getGqlSchema = async () => {
  const graphqlSchema = await buildSchema({
    resolvers: generatedResolvers,
    validate: false,
  })

  return graphqlSchema
}
