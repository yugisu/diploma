import { buildSchema } from 'type-graphql'

import {
  relationResolvers,
  WorkspaceCrudResolver,
  TaskCrudResolver,
  ConversationCrudResolver,
} from 'generated/typegraphql-prisma'

import { IdentityResolver } from './resolvers/IdentityResolver'
import { GeneralConversationResolver } from './resolvers/GeneralConversationResolver'
import { ConversationResolver } from './resolvers/ConversationResolver'
import { ActivityParticipantResolver } from './resolvers/ActivityParticipantResolver'
import { ActivityResolver } from './resolvers/ActivityResolver'
import { GeneralTaskResolver } from './resolvers/GeneralTaskResolver'

export const getGqlSchema = async () => {
  const graphqlSchema = await buildSchema({
    resolvers: [
      // Generated resolvers
      ...relationResolvers,
      WorkspaceCrudResolver,
      TaskCrudResolver,
      ConversationCrudResolver,

      // Custom resolvers
      IdentityResolver,
      GeneralConversationResolver,
      ConversationResolver,
      ActivityParticipantResolver,
      ActivityResolver,
      GeneralTaskResolver,
    ],
    validate: false,
  })

  return graphqlSchema
}
