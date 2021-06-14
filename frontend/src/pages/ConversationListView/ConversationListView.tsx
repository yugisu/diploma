import React, { useMemo } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { format, isSameDay } from 'date-fns'
import { ChatAltIcon } from '@heroicons/react/solid'

import { Conversation } from 'containers/Conversation/Conversation'

import { Separator } from 'components/Common/Separator'
import { Avatar } from 'components/Avatar/Avatar'
import { Toolbar } from 'components/Toolbar/Toolbar'

import * as Gql from './ConversationListView.graphql.module'

export const ConversationListView = () => {
  const conversationListQuery = useQuery(Gql.GetConversationListDocument, {
    pollInterval: 1000,
    fetchPolicy: 'cache-and-network',
  })
  const conversationsList = conversationListQuery.data?.conversationList || []

  const now = useMemo(() => new Date(), [])

  return (
    <>
      <div className="h-full flex-1 flex">
        <div className="z-10 w-96 flex-shrink-0 flex flex-col bg-gray-900 bg-opacity-50">
          <Toolbar>
            <div className="flex justify-between items-center">
              <span className="font-bold">All chats</span>
            </div>
          </Toolbar>

          {conversationsList.length > 0 && (
            <ul className="flex-1 h-full overflow-y-auto overflow-x-hidden flex flex-col animate-appear">
              {conversationsList.map((conversation) => {
                const lastActivityDate = new Date(
                  (conversation.lastMessage?.createdAt ?? conversation.createdAt) as number,
                )

                let formattedLastActivityDate: string | null = null

                if (isSameDay(lastActivityDate, now)) {
                  formattedLastActivityDate = format(lastActivityDate, 'H:mm')
                } else {
                  formattedLastActivityDate = format(lastActivityDate, 'd/M/y')
                }

                return (
                  <li key={conversation.id}>
                    <NavLink
                      className="h-16 py-2 px-4 flex items-center hover:bg-gray-500 hover:bg-opacity-5"
                      activeClassName="bg-gray-500 bg-opacity-10 hover:bg-opacity-10"
                      to={conversation.id}
                    >
                      <Avatar className="mr-2" icon={ChatAltIcon} />

                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-center">
                          <div className="truncate">{conversation.activity.title}</div>

                          <div className="flex-shrink-0 ml-2 text-right whitespace-nowrap text-gray-600 text-xs">
                            {formattedLastActivityDate}
                          </div>
                        </div>

                        <span className="max-w-full truncate text-sm opacity-90">
                          {conversation.lastMessage ? (
                            <>
                              <span>{conversation.lastMessage.createdByParticipant.name}</span>:{' '}
                              <span>{conversation.lastMessage.content}</span>
                            </>
                          ) : (
                            <span className="italic opacity-80">No messages yet</span>
                          )}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <Separator />

        <Routes>
          <Route path=":conversationId" element={<Conversation />} />
          <Route
            path="/"
            element={
              <div className="flex-1 h-full flex flex-col">
                <div className="flex-shrink-0 h-11 py-1 px-4 flex justify-between items-center shadow-md bg-gray-800" />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  )
}
