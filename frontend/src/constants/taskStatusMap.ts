import type { TaskStatus } from 'generated/graphql-types'

// TODO: Remove this map and make columns configurable
export const taskStatusMap: Record<TaskStatus, string> = {
  // eslint-disable-next-line prettier/prettier
  'TODO': 'To do',
  IN_PROGRESS: 'In progress',
  REVIEW: 'Review',
  QA: 'QA',
  DONE: 'Done',
}
