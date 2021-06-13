import React, { useLayoutEffect, useRef } from 'react'
import { format } from 'date-fns'

type Props = {
  messages: {
    id: string
    content: string
    createdAt: unknown
    createdByParticipant: {
      id: string
      name: string
    }
  }[]
}

export const MessageList = ({ messages }: Props) => {
  const listRef = useRef<HTMLUListElement | null>(null)

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ul ref={listRef} className="flex-1 overflow-y-auto py-3 flex flex-col">
      <li className="opacity-40">
        <div className="pt-1 pb-3 px-4 flex flex-col">- Start of conversation</div>
      </li>

      {messages.map((message) => (
        <li key={message.id}>
          <div className="py-1 px-4 flex flex-col">
            <div>
              <span className="text-sm font-bold">{message.createdByParticipant.name}</span>
              <span className="ml-2 text-xs opacity-50">
                {format(new Date(message.createdAt as string), 'H:mm d/M/y')}
              </span>
            </div>

            <span>{message.content}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
