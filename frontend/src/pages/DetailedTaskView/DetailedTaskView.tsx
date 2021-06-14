import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { omit } from 'lodash'
import { CheckIcon, ChevronDownIcon, ChevronLeftIcon, PencilAltIcon } from '@heroicons/react/solid'

import { taskStatusMap } from 'constants/taskStatusMap'

import { Conversation } from 'containers/Conversation/Conversation'

import { Avatar } from 'components/Avatar/Avatar'
import { Button } from 'components/Common/Button'
import { Toolbar } from 'components/Toolbar/Toolbar'
import { Input } from 'components/Common/Input'

import * as Gql from './DetailedTaskView.graphql.module'

export const DetailedTaskView = () => {
  const { taskId } = useParams()

  const taskDetailsQuery = useQuery(Gql.GetTaskDetailsDocument, {
    variables: {
      taskId,
    },
    pollInterval: 3000,
    skip: !taskId,
  })
  const task = taskDetailsQuery.data?.task

  const [taskDraftEdits, setTaskDraftEdits] = useState<Record<string, any> | null>(null)

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

        const updatedTask = {
          ...task,
          activity: { ...task.activity, conversation: { id: newConversationId } },
        }
        cache.writeQuery({ query: Gql.GetTaskDetailsDocument, data: { task: updatedTask } })
      },
    })
  }

  const [runEditTask, editTaskMutation] = useMutation(Gql.EditTaskDocument)

  const handleSaveDraftEdits = async () => {
    if (!taskDraftEdits || !task || editTaskMutation.loading) {
      return
    }

    const variables: Gql.EditTaskMutationVariables = { taskId: task.id }

    if (taskDraftEdits.description) {
      variables.taskUpdates ??= {}
      variables.taskUpdates.body = { set: taskDraftEdits.description }
    }

    if (taskDraftEdits.title) {
      variables.activityUpdates ??= {}
      variables.activityUpdates.title = { set: taskDraftEdits.title }
    }

    if (Object.keys(variables).length > 1) {
      await runEditTask({ variables })

      await taskDetailsQuery.refetch()
    }

    setTaskDraftEdits(null)
  }

  const editTaskTitle = (title: string) => {
    if (task) {
      if (title === task.activity.title) {
        setTaskDraftEdits((v) => omit(v, ['title']))
      } else {
        setTaskDraftEdits((v) => ({ ...v, title }))
      }
    }
  }

  const editTaskDescription = (description: string) => {
    if (task) {
      if (description === task.body) {
        setTaskDraftEdits((v) => omit(v, ['description']))
      } else {
        setTaskDraftEdits((v) => ({ ...v, description }))
      }
    }
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
              {taskDraftEdits ? (
                <Input
                  value={taskDraftEdits.title ?? task.activity.title}
                  onChange={(e) => editTaskTitle(e.target.value)}
                  type="text"
                  placeholder="Task title"
                  className="mb-6 font-montserrat"
                  fluid
                />
              ) : (
                <h1 className="text-5xl mb-4">{task.activity.title}</h1>
              )}

              <h6 className="font-normal flex items-center gap-4">
                <Button compact>
                  {taskStatusMap[task.status]} <ChevronDownIcon className="inline align-text-bottom" height="1.2em" />
                </Button>

                {taskDraftEdits ? (
                  <>
                    <Button onClick={() => setTaskDraftEdits(null)} compact>
                      Cancel editing
                    </Button>
                    <Button onClick={handleSaveDraftEdits} icon={CheckIcon} primary compact>
                      Save
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setTaskDraftEdits({})} icon={PencilAltIcon} compact>
                    Edit
                  </Button>
                )}

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

              {taskDraftEdits ? (
                <textarea
                  value={taskDraftEdits.description ?? task.body ?? ''}
                  onChange={(e) => editTaskDescription(e.target.value)}
                  className="resize-none h-72 w-full max-w-3xl py-2 px-3 shadow-sm rounded focus:placeholder-opacity-90 focus:bg-transparent focus:outline-none border border-solid focus:ring bg-gray-400 bg-opacity-10 border-gray-400 border-opacity-20 focus:border-primary focus:border-opacity-100 ring-primary ring-opacity-10 placeholder-gray-400 placeholder-opacity-50"
                />
              ) : (
                <div>{task.body || <h3 className="text-gray-500">No description provided</h3>}</div>
              )}
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
  <div className="pr-2 py-0.5 inline-flex items-center font-normal bg-gray-800 rounded-full">
    <Avatar className="mr-1" size={5} iconSize="0.9em" />

    <span className="text-sm">{name}</span>
  </div>
)
