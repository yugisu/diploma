import { Args, ArgsType, Ctx, Field, Mutation, Resolver } from 'type-graphql'

import { Task, TaskStatus } from 'generated/typegraphql-prisma'

@ArgsType()
class CreateTaskWithActivityArgs {
  @Field(() => TaskStatus, { nullable: false })
  taskStatus!: TaskStatus
}

@Resolver()
export class GeneralTaskResolver {
  @Mutation(() => Task)
  async createTaskWithActivity(
    @Ctx() ctx: GqlContext,
    @Args() { taskStatus }: CreateTaskWithActivityArgs,
  ): Promise<Task> {
    const profile = await ctx.prisma.profile.findUnique({
      where: { id: ctx.state.profileId! },
      select: { workspaceId: true },
    })

    return ctx.prisma.task.create({
      data: {
        status: taskStatus,
        activity: {
          create: {
            title: 'Untitled',
            workspace: {
              connect: { id: profile!.workspaceId },
            },
          },
        },
      },
      include: {
        activity: true,
      },
    })
  }
}
