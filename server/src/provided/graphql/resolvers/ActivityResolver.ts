import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'

import { Activity, ActivityParticipant } from 'generated/typegraphql-prisma'

@Resolver(() => Activity)
export class ActivityResolver {
  @FieldResolver(() => ActivityParticipant)
  async owner(@Root() activity: Activity, @Ctx() ctx: GqlContext): Promise<ActivityParticipant> {
    const owner = await ctx.prisma.activityParticipant.findFirst({
      where: { activityId: activity.id, role: 'OWNER' },
    })

    return owner!
  }
}
