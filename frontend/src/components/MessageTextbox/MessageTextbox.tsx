import React, { useState } from 'react'

import { Separator } from 'components/Common/Separator'

type Props = {
  onSend: (messageContent: string) => void
}

export const MessageTextbox = ({ onSend }: Props) => {
  const [messageContent, setMessageContent] = useState('')

  const handleSend = () => {
    if (messageContent.length > 0) {
      onSend(messageContent)

      setMessageContent('')
    }
  }

  return (
    <div className="flex-1 flex">
      <textarea
        className="flex-1 p-2 resize-none placeholder-gray-500 placeholder-opacity-60 focus:placeholder-opacity-90 bg-transparent focus:bg-gray-500 focus:bg-opacity-5 hover:bg-gray-500 hover:bg-opacity-5 focus:outline-none border border-transparent focus:border-primary focus:border-opacity-70"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Enter message here..."
      />

      <Separator />

      <button
        className="px-4 font-bold text-gray-700 dark:text-gray-300 focus:outline-none bg-transparent focus:bg-gray-500 focus:bg-opacity-5 hover:bg-gray-500 hover:bg-opacity-5 border border-transparent focus:border-primary focus:border-opacity-70"
        type="button"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}
