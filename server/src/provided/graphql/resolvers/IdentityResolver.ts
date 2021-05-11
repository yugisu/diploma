import { Ctx, Query, Resolver } from 'type-graphql'

import { UserSession } from 'generated/typegraphql-prisma'

@Resolver()
export class IdentityResolver {
  @Query(() => UserSession)
  async currentUserSession(@Ctx() ctx: GqlContext): Promise<UserSession | null> {
    return ctx.prisma.userSession.findUnique({ where: { id: ctx.state.sessionId } })
  }
}
