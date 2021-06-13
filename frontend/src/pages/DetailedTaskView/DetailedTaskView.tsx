import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'

import { taskStatusMap } from 'constants/taskStatusMap'

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

  if (!task) {
    return null
  }

  return (
    <div className="h-full p-16 flex">
      <div className="flex-1 flex flex-col">
        <h1 className="text-5xl mb-4">{task.activity.title}</h1>

        <h6 className="mb-8 opacity-80">
          <span className="px-2 py-0.5 text-sm font-bold rounded shadow bg-gray-300 dark:bg-gray-600">
            {taskStatusMap[task.status]}
          </span>{' '}
          <span>Assigned to: {task.activity.assignees.map((p) => p.name).join(', ')}</span> &bull;{' '}
          <span>Created by: {task.activity.owner.name}</span> &bull;{' '}
          <span>Created date: {format(new Date(task.createdAt as string), 'd/M/y')}</span>
        </h6>

        <h2 className="text-3xl mb-3">Description</h2>
        <div>{task.body}</div>
      </div>
    </div>
  )
}
