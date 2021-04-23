import { buildSchema } from 'type-graphql'

import { CustomUserResolver } from './resolvers/customUserResolver'

export const getGqlSchema = async () => {
  const graphqlSchema = buildSchema({ resolvers: [CustomUserResolver] })

  return graphqlSchema
}
