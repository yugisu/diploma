import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Toolbar = ({ children }: Props) => {
  return <div className="flex-shrink-0 h-11 py-1 px-4 flex shadow-md bg-gray-800">{children}</div>
}
