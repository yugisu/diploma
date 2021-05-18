import React from 'react'
import { Link, Outlet, useMatch } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import clsx from 'clsx'

import { Separator } from 'components/Common/Separator'

import * as Gql from './ChatView.graphql.module'

export const ChatView = () => {
  const pathMatch = useMatch(`chat/:chatId`)

  const currentConversationId = pathMatch?.params.chatId

  const conversationsQuery = useQuery(Gql.GetConversationListDocument)
  const conversationsList = conversationsQuery.data?.conversationList || []

  return (
    <>
      <Separator />

      <div className="flex-1 flex">
        <div className="w-96 flex-shrink-0 flex flex-col">
          <div className="flex-shrink-0 h-8 py-1 px-4 flex bg-gray-500 bg-opacity-5 shadow-sm" />

          <Separator />

          <ul className="max-h-full flex-1 flex flex-col overflow-y-auto">
            {conversationsList.map((conversation) => (
              <React.Fragment key={conversation.id}>
                <li>
                  <Link
                    className="h-12 py-2 px-4 flex items-center hover:bg-gray-500 hover:bg-opacity-5 focus:bg-gray-500 focus:bg-opacity-5 focus:outline-none border border-transparent focus:border-primary ring-primary ring-opacity-10 focus:ring focus:ring-inset"
                    to={conversation.id}
                  >
                    <span className={clsx(conversation.id === currentConversationId && 'font-bold')}>
                      {conversation.title}
                    </span>
                  </Link>
                </li>

                <Separator />
              </React.Fragment>
            ))}
          </ul>
        </div>

        <Separator />

        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>
    </>
  )
}
