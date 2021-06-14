import React from 'react'
import { useQuery } from '@apollo/client'
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
        <article className="max-w-7xl flex-1 py-12 p-16 flex flex-col gap-16">
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
            <div>{task.body}</div>
          </section>

          <section>
            <h2 className="text-3xl mb-3">Conversation</h2>

            <Conversation hideToolbar />
          </section>
        </article>
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
