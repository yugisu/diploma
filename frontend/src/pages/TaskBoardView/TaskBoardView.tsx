import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { taskStatusMap } from 'constants/taskStatusMap'
import type { TaskStatus } from 'generated/graphql-types'

import { Button } from 'components/Common/Button'
import { Toolbar } from 'components/Toolbar/Toolbar'

import * as Gql from './TaskBoardView.graphql.module'

export const TaskBoardView = () => {
  const tasksQuery = useQuery(Gql.GetTasksDocument)
  const tasks = tasksQuery.data?.tasks ?? []

  const [execUpdateTaskStatus] = useMutation(Gql.UpdateTaskStatusDocument)

  const [isDragActive, setIsDragActive] = useState(false)

  const handleTaskDragEnd = (result: DropResult) => {
    setIsDragActive(false)

    if (tasks) {
      const { draggableId, destination, source } = result

      if (draggableId && destination) {
        const taskExists = tasks.some((t) => t.id === draggableId)
        const newStatus = destination.droppableId as TaskStatus

        if (taskExists && newStatus in taskStatusMap && newStatus !== source.droppableId) {
          execUpdateTaskStatus({
            variables: {
              taskId: draggableId,
              newStatus,
            },
            optimisticResponse: {
              updateTask: {
                __typename: 'Task',
                id: draggableId,
                status: newStatus,
              },
            },
          })
        }
      }
    }
  }

  const [execCreateTask] = useMutation(Gql.CreateTaskWithActivityDocument)

  const handleTaskCreate = (status: TaskStatus) => {
    execCreateTask({
      variables: {
        status,
      },
      update: (cache, result) => {
        if (!result.data) {
          return
        }

        const newTask = result.data.createTaskWithActivity

        const updatedTasks = tasks.concat({ ...newTask, activity: { ...newTask.activity, assignees: [] } })

        cache.writeQuery({ query: Gql.GetTasksDocument, data: { tasks: updatedTasks } })
      },
    })
  }

  return (
    <div className="h-full flex flex-col">
      <Toolbar>
        <div className="flex justify-between items-center">
          <span className="font-bold">All tasks</span>
        </div>
      </Toolbar>

      <div className="flex-1 h-full overflow-auto pb-4 px-4 grid grid-cols-5 gap-4">
        <DragDropContext onDragStart={() => setIsDragActive(true)} onDragEnd={handleTaskDragEnd}>
          {Object.entries(taskStatusMap).map(([status, statusTitle]) => {
            const relatedTasks = tasks.filter((task) => task.status === status)

            return (
              <Droppable droppableId={status} key={status}>
                {(droppableProvided, droppableSnapshot) => (
                  <div
                    className={clsx(
                      'flex-1 relative mt-4 flex flex-col rounded',
                      droppableSnapshot.isDraggingOver
                        ? 'bg-gray-600 bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-70'
                        : 'bg-gray-800 bg-opacity-5 dark:bg-gray-800 dark:bg-opacity-40',
                    )}
                  >
                    <div
                      style={{ maxWidth: `calc(100% - 2.75rem - ${relatedTasks.length.toString().length}ch)` }}
                      className="sticky top-2 ml-2 mt-2 px-3 py-0.5 w-min truncate font-bold text-sm tracking-wide rounded shadow bg-bg border border-gray-400 border-opacity-40 dark:border-gray-900 dark:border-opacity-40"
                    >
                      {statusTitle}
                    </div>

                    <div className="absolute top-3.5 right-5 text-sm font-bold opacity-50">{relatedTasks.length}</div>

                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                      className="group flex-1 mt-2 px-2 flex flex-col"
                    >
                      {relatedTasks.map((task, taskIdx) => (
                        <Draggable draggableId={task.id} index={taskIdx} key={task.id}>
                          {(provided) => (
                            <Link
                              to={task.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className={clsx(
                                  'my-1 px-3 py-2 flex flex-col rounded shadow-sm bg-bg border border-gray-400 border-opacity-50 dark:border-gray-900 dark:border-opacity-40',
                                )}
                              >
                                <span className="truncate">{task.activity.title}</span>
                                <span className="mt-1 text-sm font-bold opacity-70 truncate">
                                  {task.activity.assignees.map((p) => p.name).join(', ')}
                                </span>
                              </div>
                            </Link>
                          )}
                        </Draggable>
                      ))}

                      {droppableProvided.placeholder}

                      {/* TODO: Hide this button from being focusable if it's hidden */}
                      {!isDragActive && (
                        <div className="w-full my-1 flex opacity-0 group-hover:opacity-40">
                          <Button
                            onClick={() => handleTaskCreate(status as TaskStatus)}
                            className="w-full text-left"
                            compact
                          >
                            + Create new task
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}
