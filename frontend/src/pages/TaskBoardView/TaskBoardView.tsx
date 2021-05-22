import React from 'react'
import { useQuery } from '@apollo/client'

import { TaskStatus } from 'generated/graphql-types'

import * as Gql from './TaskBoardView.graphql.module'

const statusesArray: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'REVIEW', 'QA', 'DONE']

export const TaskBoardView = () => {
  const tasksQuery = useQuery(Gql.GetTasksDocument)
  const tasks = tasksQuery.data?.tasks

  if (!tasks) {
    return null
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 h-8 py-1 px-4 flex justify-between bg-gray-500 bg-opacity-5 shadow-sm" />

      <div className="flex-1 h-full overflow-auto pb-4 grid grid-cols-5">
        {statusesArray.map((status) => {
          const relatedTasks = tasks.filter((task) => task.status === status)

          return (
            <div className="relative mt-4 mx-2 rounded bg-gray-500 bg-opacity-5" key={status}>
              <div
                style={{ maxWidth: '19rem' }}
                className="sticky top-2 ml-2 mt-2 px-3 py-1 w-min truncate font-bold text-sm rounded shadow bg-gray-100 dark:bg-gray-900"
              >
                {status}
              </div>

              <div className="absolute top-3.5 right-5 text-sm font-bold opacity-50">{relatedTasks.length}</div>

              <div className="mt-2 px-2 flex flex-col">
                {relatedTasks.map((task) => (
                  <div
                    className="my-1 px-3 py-2 flex flex-col bg-gray-200 dark:bg-gray-800 rounded shadow-sm"
                    key={task.id}
                  >
                    <span className="truncate">{task.title}</span>
                    <span className="mt-1 text-sm font-bold opacity-70 truncate">
                      {task.assignees.map((a) => a.profile.user.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
