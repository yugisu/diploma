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
export class GeneralConversationResolver {
  @Query(() => [Conversation])
  async conversationList(@Ctx() ctx: GqlContext): Promise<Conversation[]> {
    if (!ctx.state.profileId) {
      return []
    }

    return ctx.prisma.conversation.findMany({
      where: { activity: { participants: { some: { profileId: ctx.state.profileId } } } },
    })
  }

  @Mutation(() => Message)
  async sendMessage(@Ctx() ctx: GqlContext, @Args() { conversationId, content }: SendMessageArgs): Promise<Message> {
    if (!ctx.state.profileId) {
      throw new Error('Unauthorised')
    }

    const activity = await ctx.prisma.activity.findFirst({
      where: { conversation: { id: conversationId } },
      select: { id: true },
    })

    if (!activity) {
      throw new Error('Failed to find related activity')
    }

    return ctx.prisma.message.create({
      data: {
        content,
        conversation: {
          connect: { id: conversationId },
        },
        createdByParticipant: {
          connect: {
            activityId_profileId: { activityId: activity.id, profileId: ctx.state.profileId },
          },
        },
      },
    })
  }
}
