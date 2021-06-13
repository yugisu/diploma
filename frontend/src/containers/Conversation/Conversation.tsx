import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { ChatAltIcon, ExternalLinkIcon, UserGroupIcon } from '@heroicons/react/solid'

import { MessageTextbox } from 'components/MessageTextbox/MessageTextbox'
import { MessageList } from 'components/MessageList/MessageList'
import { Avatar } from 'components/Avatar/Avatar'

import * as Gql from './Conversation.graphql.module'

export const Conversation = () => {
  const params = useParams()

  const { conversationId } = params

  // TODO: Re-write this query to use websockets and subscription instead of polling
  const conversationQuery = useQuery(Gql.GetConversationDocument, {
    pollInterval: 500,
    variables: {
      conversationId,
    },
    skip: !conversationId,
  })
  const conversation = conversationQuery.data?.conversation

  const [execSendMessageMutation, sendMessageMutation] = useMutation(Gql.SendMessageDocument, {
    onCompleted: () => {
      conversationQuery.refetch()
    },
  })

  const handleSendMessage = (content: string) => {
    if (conversationId && !sendMessageMutation.loading) {
      execSendMessageMutation({ variables: { content, conversationId } })
    }
  }

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex-shrink-0 h-11 py-1 px-4 flex justify-between items-center shadow-md bg-gray-800">
        {conversation && (
          <div className="animate-appear flex items-center">
            <Avatar size={7} icon={ChatAltIcon} />

            <span className="font-bold text-gray-800 dark:text-gray-200">{conversation.activity.title}</span>

            {conversation.activity.task && (
              <Link className="ml-2 font-bold text-gray-400" to={`/t/${conversation.activity.task.id}`}>
                Task <ExternalLinkIcon className="inline align-text-bottom" height="1.2em" />
              </Link>
            )}

            <span className="ml-8 text-gray-400">
              <UserGroupIcon className="inline align-text-bottom mr-2 mb-0.5" height="1.2em" />

              {conversation.activity.participants.map((participant) => participant.name).join(', ')}
            </span>
          </div>
        )}
      </div>

      <div className="max-h-full min-h-0 flex-1 w-full max-w-4xl self-center flex flex-col justify-end">
        {conversation && (
          <>
            {conversation.messages.length > 0 ? (
              <MessageList messages={conversation.messages} />
            ) : (
              <div className="flex-1 flex justify-center items-center">
                <h3 className="text-gray-500">No messages yet</h3>
              </div>
            )}
          </>
        )}

        <div className="mt-6 mb-7 flex-shrink-0 flex flex-col">
          <MessageTextbox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}
