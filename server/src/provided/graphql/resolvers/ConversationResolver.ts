import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'

import { Conversation, Message } from 'generated/typegraphql-prisma'

@Resolver(() => Conversation)
export class ConversationResolver {
  @FieldResolver(() => Message, { nullable: true })
  async lastMessage(@Root() conversation: Conversation, @Ctx() ctx: GqlContext): Promise<Message | null> {
    return ctx.prisma.message.findFirst({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'desc' },
      take: 1,
    })
  }
}
