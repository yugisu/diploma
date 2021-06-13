import React, { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { EmojiHappyIcon, PaperClipIcon } from '@heroicons/react/outline'

import { Input } from 'components/Common/Input'

type Props = {
  onSend: (messageContent: string) => void
}

export const MessageTextbox = ({ onSend }: Props) => {
  const [messageContent, setMessageContent] = useState('')

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (messageContent.length > 0) {
      onSend(messageContent)

      setMessageContent('')
    }
  }

  return (
    <form className="flex-1 flex flex-col" onSubmit={handleSend}>
      <Input
        type="text"
        name="message"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type a new message..."
        autoComplete="off"
        fluid
      />

      <div className="mt-2 flex justify-between">
        <div className="flex">
          <button
            className="w-8 h-8 flex justify-center items-center rounded-full opacity-80 hover:opacity-100 focus:opacity-100 focus:outline-none ring-primary ring-opacity-40 focus:ring"
            type="button"
          >
            <PaperClipIcon className="inline align-text-bottom" height="1.2em" />
          </button>
          <button
            className="w-8 h-8 flex justify-center items-center rounded-full opacity-80 hover:opacity-100 focus:opacity-100 focus:outline-none ring-primary ring-opacity-40 focus:ring"
            type="button"
          >
            <EmojiHappyIcon className="inline align-text-bottom" height="1.2em" />
          </button>
        </div>

        <button
          className="w-8 h-8 flex justify-center items-center rounded-full opacity-80 hover:opacity-100 focus:opacity-100 focus:outline-none ring-primary ring-opacity-40 focus:ring"
          type="submit"
        >
          <PaperAirplaneIcon className="inline align-text-bottom transform rotate-90" height="1.2em" />
        </button>
      </div>
    </form>
  )
}
