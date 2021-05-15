import clsx from 'clsx'
import React from 'react'

type Props = {
  primary?: boolean
  compact?: boolean
  loading?: boolean
  icon?: React.ComponentType<React.ComponentProps<'svg'>> | string | null
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  primary,
  compact,
  loading,
  disabled = loading,
  icon: Icon,
  type = 'button',
  className,
  ...props
}: Props) => {
  const defaultAppearance = !primary

  const icon = typeof Icon === 'function' ? <Icon className="inline align-text-bottom" height="1.2em" /> : Icon

  return (
    <button
      className={clsx(
        'font-bold tracking-wide text-sm rounded shadow-sm focus:outline-none border border-solid border-gray-400 border-opacity-20 focus:border-primary focus:border-opacity-100 focus:ring ring-primary',

        compact ? 'px-3 py-1' : 'px-4 py-2',

        disabled ? 'cursor-not-allowed' : 'cursor-pointer',

        defaultAppearance && [
          'bg-gray-400 ring-opacity-10',
          disabled
            ? 'bg-opacity-10 text-gray-500 dark:text-gray-300'
            : 'bg-opacity-20 hover:bg-opacity-30 text-gray-700 dark:text-gray-200',
        ],

        primary && [
          'bg-primary ring-opacity-40',
          disabled
            ? 'bg-opacity-80 text-gray-50'
            : 'bg-opacity-95 hover:bg-opacity-100 focus:bg-opacity-100 text-white',
        ],

        loading && 'animate-pulse',

        className,
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      {...props}
    >
      {icon} {children}
    </button>
  )
}
