import { buildSchema } from 'type-graphql'

import {
  relationResolvers,
  ProfileCrudResolver,
  UserCrudResolver,
  WorkspaceCrudResolver,
} from 'generated/typegraphql-prisma'

import { IdentityResolver } from './resolvers/IdentityResolver'

export const getGqlSchema = async () => {
  const graphqlSchema = await buildSchema({
    resolvers: [
      // Generated resolvers
      ...relationResolvers,
      ProfileCrudResolver,
      UserCrudResolver,
      WorkspaceCrudResolver,
      // Custom resolvers
      IdentityResolver,
    ],
    validate: false,
  })

  return graphqlSchema
}
