import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { format, isSameDay } from 'date-fns'

import { Avatar } from 'components/Avatar/Avatar'

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
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const now = useMemo(() => new Date(), [])

  return (
    <div ref={containerRef} className="flex-1 max-h-full flex flex-col overflow-y-auto justify-end">
      <ul className="max-h-full pt-6 pb-3 flex flex-col gap-3">
        {messages.map((message) => {
          const createdAt = new Date(message.createdAt as number)

          let formattedCreatedDate: string

          if (isSameDay(createdAt, now)) {
            formattedCreatedDate = format(createdAt, 'H:mm')
          } else {
            formattedCreatedDate = format(createdAt, 'H:mm d/M/y')
          }

          return (
            <li key={message.id}>
              <div className="w-max max-w-lg flex">
                <Avatar />

                <div className="flex flex-col justify-between px-3 py-1.5 bg-gray-600 bg-opacity-20 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">{message.createdByParticipant.name}</span>
                    <span className="flex-shrink-0 ml-2 text-right whitespace-nowrap text-gray-600 text-xs">
                      {formattedCreatedDate}
                    </span>
                  </div>

                  <p
                    style={{
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                    className="leading-tight"
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
