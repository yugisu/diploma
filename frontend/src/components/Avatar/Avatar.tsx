import React from 'react'
import { UserIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

type Props = {
  icon?: React.ComponentType<React.ComponentProps<'svg'>> | string | null
  size?: number
}

export const Avatar = ({ icon: Icon = UserIcon, size = 9 }: Props) => {
  const icon =
    typeof Icon === 'function' ? (
      <Icon className="inline align-text-bottom text-gray-500 text-opacity-70" height="1.2em" />
    ) : (
      Icon
    )

  return (
    <div
      className={clsx(
        'flex-shrink-0 mr-2 flex items-center justify-center rounded-full bg-gray-700',
        `h-${size} w-${size}`,
      )}
    >
      {icon}
    </div>
  )
}
