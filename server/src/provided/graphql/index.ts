import { buildSchema } from 'type-graphql'

import {
  relationResolvers,
  ProfileCrudResolver,
  UserCrudResolver,
  WorkspaceCrudResolver,
  FindUniqueConversationResolver,
} from 'generated/typegraphql-prisma'

import { IdentityResolver } from './resolvers/IdentityResolver'
import { GeneralConversationResolver } from './resolvers/GeneralConversationResolver'
import { ConversationResolver } from './resolvers/ConversationResolver'

export const getGqlSchema = async () => {
  const graphqlSchema = await buildSchema({
    resolvers: [
      // Generated resolvers
      ...relationResolvers,
      ProfileCrudResolver,
      UserCrudResolver,
      WorkspaceCrudResolver,
      FindUniqueConversationResolver,

      // Custom resolvers
      IdentityResolver,
      GeneralConversationResolver,
      ConversationResolver,
    ],
    validate: false,
  })

  return graphqlSchema
}
