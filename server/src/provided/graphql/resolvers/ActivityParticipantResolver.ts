import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'

import { ActivityParticipant } from 'generated/typegraphql-prisma'

@Resolver(() => ActivityParticipant)
export class ActivityParticipantResolver {
  @FieldResolver(() => String)
  async name(@Root() activityParticipant: ActivityParticipant, @Ctx() ctx: GqlContext): Promise<String> {
    if (activityParticipant.customName) {
      return activityParticipant.customName
    }

    const profile = await ctx.prisma.profile.findUnique({
      where: { id: activityParticipant.profileId },
      select: { user: { select: { name: true } } },
    })

    return profile!.user.name
  }
}
