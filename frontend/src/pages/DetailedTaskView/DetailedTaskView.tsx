import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { ChevronDownIcon, ChevronLeftIcon, PencilAltIcon } from '@heroicons/react/solid'

import { taskStatusMap } from 'constants/taskStatusMap'

import { Conversation } from 'containers/Conversation/Conversation'

import { Avatar } from 'components/Avatar/Avatar'
import { Button } from 'components/Common/Button'
import { Toolbar } from 'components/Toolbar/Toolbar'

import * as Gql from './DetailedTaskView.graphql.module'

export const DetailedTaskView = () => {
  const { taskId } = useParams()

  const taskDetailsQuery = useQuery(Gql.GetTaskDetailsDocument, {
    variables: {
      taskId,
    },
    skip: !taskId,
  })
  const task = taskDetailsQuery.data?.task

  const [runCreateConversationMutation, createConversationMutation] = useMutation(Gql.CreateConversationForTaskDocument)

  const startConversation = () => {
    if (!task || task.activity.conversation?.id) {
      return
    }

    runCreateConversationMutation({
      variables: { activityId: task.activity.id },
      update: (cache, result) => {
        if (!result.data || !task) {
          return
        }

        const newConversationId = result.data.createConversation.id

        const updatedTask = { ...task, activity: { ...task.activity, conversation: { id: newConversationId } } }
        cache.writeQuery({ query: Gql.GetTaskDetailsDocument, data: { task: updatedTask } })
      },
    })
  }

  return (
    <div className="h-full flex flex-col">
      <Toolbar>
        <div className="flex justify-between items-center">
          <Link className="hover:text-primary" to="/t">
            <ChevronLeftIcon className="inline align-text-bottom" height="1.2em" /> Back to board
          </Link>
        </div>
      </Toolbar>

      {task && (
        <div className="overflow-auto">
          <article className="max-w-7xl flex-1 py-12 p-16 flex flex-col gap-16 overflow-auto">
            <div>
              <h1 className="text-5xl mb-4">{task.activity.title}</h1>

              <h6 className="font-normal flex items-center gap-4">
                <Button compact>
                  {taskStatusMap[task.status]} <ChevronDownIcon className="inline align-text-bottom" height="1.2em" />
                </Button>
                <Button icon={PencilAltIcon} compact>
                  Edit
                </Button>
                <div className="flex items-center gap-2">
                  Owner: <ProfileChip name={task.activity.owner.name} />
                </div>
                <div className="flex items-center gap-2">
                  Assignees:
                  {task.activity.assignees.length > 0 ? (
                    task.activity.assignees.map((p) => <ProfileChip name={p.name} key={p.id} />)
                  ) : (
                    <span>None</span>
                  )}
                </div>
                <span>Created at: {format(new Date(task.createdAt as string), 'H:mm d/M/y')}</span>
              </h6>
            </div>

            <section>
              <h2 className="text-3xl mb-3">Description</h2>
              <div>{task.body || <h3 className="text-gray-500">No description provided</h3>}</div>
            </section>

            <section className="max-w-3xl">
              <h2 className="text-3xl ">Conversation</h2>

              {task.activity.conversation ? (
                <Conversation conversationId={task.activity.conversation?.id} hideToolbar />
              ) : (
                <Button
                  onClick={startConversation}
                  loading={createConversationMutation.loading}
                  disabled={createConversationMutation.loading}
                >
                  Create conversation
                </Button>
              )}
            </section>
          </article>
        </div>
      )}
    </div>
  )
}

const ProfileChip = ({ name }: { name: string }) => (
  <div className="pr-2 py-0.5 inline-flex items-center cursor-pointer font-normal bg-gray-800 rounded-full">
    <Avatar className="mr-1" size={5} iconSize="0.9em" />

    <span className="text-sm">{name}</span>
  </div>
)
