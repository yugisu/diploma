import { Args, ArgsType, Ctx, Field, Mutation, Query, Resolver } from 'type-graphql'

import { Conversation, Message } from 'generated/typegraphql-prisma'

@ArgsType()
class SendMessageArgs {
  @Field(() => String, { nullable: false })
  conversationId!: string

  @Field(() => String, { nullable: false })
  content!: string
}

@Resolver()
export class ChatResolver {
  @Query(() => [Conversation])
  async conversationList(@Ctx() ctx: GqlContext): Promise<Conversation[]> {
    if (!ctx.state.profileId) {
      return []
    }

    return ctx.prisma.conversation.findMany({ where: { participants: { some: { profileId: ctx.state.profileId } } } })
  }

  @Mutation(() => Message)
  async sendMessage(@Ctx() ctx: GqlContext, @Args() { conversationId, content }: SendMessageArgs): Promise<Message> {
    return ctx.prisma.message.create({ data: { conversationId, content, createdById: ctx.state.profileId! } })
  }
}
