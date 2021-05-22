import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

import { MessageTextbox } from 'components/MessageTextbox/MessageTextbox'
import { Separator } from 'components/Common/Separator'
import { MessageList } from 'components/MessageList/MessageList'

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
      <div className="flex-shrink-0 h-8 py-1 px-4 flex justify-between bg-gray-500 bg-opacity-5 shadow-sm">
        <div>
          {conversation && (
            <span className="animate-appear font-bold text-gray-800 dark:text-gray-200">
              {conversation.title} (
              {conversation.participants.map((participant) => participant.profile.user.name).join(', ')})
            </span>
          )}
        </div>
      </div>

      <Separator />

      <MessageList messages={conversation?.messages ?? []} />

      <Separator />

      <div className="flex-shrink-0 flex flex-col bg-gray-500 bg-opacity-5">
        <MessageTextbox onSend={handleSendMessage} />
      </div>
    </div>
  )
}
