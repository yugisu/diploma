import { Activity } from '@prisma/client'
import { Args, ArgsType, Ctx, Field, Mutation, Resolver } from 'type-graphql'

import { ActivityUpdateInput, Task, TaskStatus, TaskUpdateInput } from 'generated/typegraphql-prisma'

@ArgsType()
class CreateTaskWithActivityArgs {
  @Field(() => TaskStatus, { nullable: false })
  taskStatus!: TaskStatus
}

@ArgsType()
class EditTaskArgs {
  @Field(() => String, { nullable: false })
  taskId!: string

  @Field(() => TaskUpdateInput, { nullable: true })
  taskUpdates?: TaskUpdateInput

  @Field(() => ActivityUpdateInput, { nullable: true })
  activityUpdates?: ActivityUpdateInput
}

@Resolver()
export class GeneralTaskResolver {
  @Mutation(() => Task)
  async createTaskWithActivity(
    @Ctx() ctx: GqlContext,
    @Args() { taskStatus }: CreateTaskWithActivityArgs,
  ): Promise<Task> {
    if (!ctx.state.profileId) {
      throw new Error('Unauthorized')
    }

    const profile = await ctx.prisma.profile.findUnique({
      where: { id: ctx.state.profileId },
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
            participants: {
              create: {
                profileId: ctx.state.profileId,
                role: 'OWNER',
              },
            },
          },
        },
      },
      include: {
        activity: true,
      },
    })
  }

  // TODO: Rewrite it to be more strict on what fields can be edited
  @Mutation(() => Task)
  async editTask(
    @Ctx() ctx: GqlContext,
    @Args() { taskId, taskUpdates, activityUpdates }: EditTaskArgs,
  ): Promise<Task> {
    if (!ctx.state.profileId) {
      throw new Error('Unauthorized')
    }

    let task

    if (taskUpdates) {
      task = await ctx.prisma.task.update({ where: { id: taskId }, data: taskUpdates })
    } else {
      task = await ctx.prisma.task.findUnique({ where: { id: taskId } })
    }

    if (activityUpdates) {
      await ctx.prisma.activity.update({ where: { id: task!.activityId }, data: activityUpdates })
    }

    return task!
  }
}
