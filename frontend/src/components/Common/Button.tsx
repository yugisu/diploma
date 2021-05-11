import clsx from 'clsx'
import React from 'react'

type Props = {
  primary?: boolean
  compact?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className, primary, compact, type = 'button', ...props }: Props) => {
  const defaultVariant = !primary

  return (
    <button
      className={clsx(
        'font-bold tracking-wide text-sm rounded shadow-sm cursor-pointer focus:outline-none border border-solid border-gray-400 border-opacity-20 focus:border-primary focus:border-opacity-100 focus:ring ring-primary',
        compact ? 'px-2 py-1' : 'px-4 py-2',
        defaultVariant &&
          'bg-gray-400 bg-opacity-20 hover:bg-opacity-30 text-gray-700 dark:text-gray-200 ring-opacity-10',
        primary && 'bg-primary bg-opacity-95 hover:bg-opacity-100 focus:bg-opacity-100 text-white ring-opacity-40',

        className,
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    />
  )
}
