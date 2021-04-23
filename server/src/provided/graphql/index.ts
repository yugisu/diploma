import { buildSchema } from 'type-graphql'

import { UserCrudResolver } from 'generated/typegraphql-prisma/resolvers/crud'

export const getGqlSchema = async () => {
  const graphqlSchema = await buildSchema({ resolvers: [UserCrudResolver] })

  return graphqlSchema
}
