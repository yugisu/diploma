import { Args, ArgsType, Ctx, Field, Int, Mutation, Query, Resolver } from 'type-graphql'

import { UserSession } from 'generated/typegraphql-prisma'

@ArgsType()
class SelectWorkspaceProfileArgs {
  @Field(() => Int, { nullable: false })
  profileId!: number
}

@Resolver()
export class IdentityResolver {
  @Query(() => UserSession)
  async currentUserSession(@Ctx() ctx: GqlContext): Promise<UserSession | null> {
    return ctx.prisma.userSession.findUnique({ where: { id: ctx.state.sessionId } })
  }

  @Mutation(() => UserSession)
  async selectWorkspaceProfile(
    @Ctx() ctx: GqlContext,
    @Args() { profileId }: SelectWorkspaceProfileArgs,
  ): Promise<UserSession | null> {
    return ctx.prisma.userSession.update({ where: { id: ctx.state.sessionId }, data: { profileId } })
  }
}
