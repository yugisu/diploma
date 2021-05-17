import { buildSchema } from 'type-graphql'

import {
  relationResolvers,
  ProfileCrudResolver,
  UserCrudResolver,
  WorkspaceCrudResolver,
  FindUniqueConversationResolver,
} from 'generated/typegraphql-prisma'

import { IdentityResolver } from './resolvers/IdentityResolver'
import { ChatResolver } from './resolvers/ChatResolver'

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
      ChatResolver,
      FindUniqueConversationResolver,
    ],
    validate: false,
  })

  return graphqlSchema
}
