import { buildSchema } from 'type-graphql'

import {
  relationResolvers,
  WorkspaceCrudResolver,
  FindUniqueConversationResolver,
  TaskCrudResolver,
} from 'generated/typegraphql-prisma'

import { IdentityResolver } from './resolvers/IdentityResolver'
import { GeneralConversationResolver } from './resolvers/GeneralConversationResolver'
import { ConversationResolver } from './resolvers/ConversationResolver'
import { ActivityParticipantResolver } from './resolvers/ActivityParticipantResolver'
import { ActivityResolver } from './resolvers/ActivityResolver'

export const getGqlSchema = async () => {
  const graphqlSchema = await buildSchema({
    resolvers: [
      // Generated resolvers
      ...relationResolvers,
      WorkspaceCrudResolver,
      FindUniqueConversationResolver,
      TaskCrudResolver,

      // Custom resolvers
      IdentityResolver,
      GeneralConversationResolver,
      ConversationResolver,
      ActivityParticipantResolver,
      ActivityResolver,
    ],
    validate: false,
  })

  return graphqlSchema
}
