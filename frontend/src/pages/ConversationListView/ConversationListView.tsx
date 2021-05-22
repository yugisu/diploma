import React from 'react'
import { Link, Outlet, useMatch } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import clsx from 'clsx'

import { Separator } from 'components/Common/Separator'

import * as Gql from './ConversationListView.graphql.module'

export const ConversationListView = () => {
  const pathMatch = useMatch('c/:conversationId')
  const currentConversationId = pathMatch?.params.conversationId

  const conversationListQuery = useQuery(Gql.GetConversationListDocument, {
    pollInterval: 1000,
    fetchPolicy: 'cache-and-network',
  })
  const conversationsList = conversationListQuery.data?.conversationList || []

  return (
    <>
      <div className="h-full flex-1 flex">
        <div className="w-96 flex-shrink-0 flex flex-col">
          <div className="flex-shrink-0 h-8 py-1 px-4 flex bg-gray-500 bg-opacity-5 shadow-sm" />

          <Separator />

          {conversationsList.length > 0 && (
            <ul className="flex-1 h-full overflow-y-auto flex flex-col animate-appear">
              {conversationsList.map((conversation) => (
                <React.Fragment key={conversation.id}>
                  <li>
                    <Link
                      className="h-16 py-2 px-4 flex flex-col hover:bg-gray-500 hover:bg-opacity-5 focus:bg-gray-500 focus:bg-opacity-5 focus:outline-none border border-transparent focus:border-primary ring-primary ring-opacity-10 focus:ring focus:ring-inset"
                      to={conversation.id}
                    >
                      <span className={clsx('font-bold', conversation.id === currentConversationId && 'text-primary')}>
                        {conversation.title}
                      </span>

                      <span className="max-w-full truncate text-sm opacity-90">
                        <span>{conversation.lastMessage?.createdByProfile.user.name}</span>:{' '}
                        <span>{conversation.lastMessage?.content}</span>
                      </span>
                    </Link>
                  </li>

                  <Separator />
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>

        <Separator />

        <Outlet />
      </div>
    </>
  )
}
