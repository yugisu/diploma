import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

type Props = {
  fluid?: boolean
  type: 'text' | 'password' | 'email' | 'number'
  hasError?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, fluid, type, hasError, ...props }: Props) => {
  const defaultVariant = !hasError

  return (
    <Inner
      className={clsx(
        'py-2 px-3 max-w-full shadow-sm rounded focus:placeholder-opacity-90 focus:bg-transparent focus:outline-none border border-solid focus:ring',
        defaultVariant &&
          'bg-gray-400 bg-opacity-10 border-gray-400 border-opacity-20 focus:border-primary focus:border-opacity-100 ring-primary ring-opacity-10 placeholder-gray-400 placeholder-opacity-50',
        hasError &&
          'bg-red-400 bg-opacity-10 border-red-400 border-opacity-20 focus:border-red-400 focus:border-opacity-100 placeholder-red-400 placeholder-opacity-50 ring-red-400 ring-opacity-10',
        fluid ? 'w-full' : 'w-60',

        className,
      )}
      type={type}
      {...props}
    />
  )
}

const Inner = styled.input`
  /* Disable autocompletion styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: currentColor;
    transition: background-color 5000s ease-in-out 0s;
  }
`
