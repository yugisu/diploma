import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

import { MessageTextbox } from 'components/MessageTextbox/MessageTextbox'
import { Separator } from 'components/Common/Separator'

import * as Gql from './Conversation.graphql.module'

export const Conversation = () => {
  const params = useParams()

  const conversationId = params.chatId

  // TODO: Re-write this query to use websockets and subscription instead of polling
  const conversationQuery = useQuery(Gql.GetConversationDocument, {
    pollInterval: 3000,
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
    <div className="flex-1 flex flex-col">
      <div className="flex-shrink-0 h-8 py-1 px-4 flex bg-gray-500 bg-opacity-5 shadow-sm">
        <div className="font-bold text-gray-800 dark:text-gray-200">{conversation?.title}</div>
      </div>

      <Separator />

      <div className="flex-1 flex flex-col">
        <ul className="flex-1 flex flex-col">
          {conversation?.messages.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
        </ul>

        <Separator />

        <div className="flex-shrink-0 h-14 flex bg-gray-500 bg-opacity-5">
          <MessageTextbox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}
