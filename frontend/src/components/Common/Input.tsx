import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

type Props = {
  fluid?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, fluid, ...props }: Props) => (
  <Inner
    className={clsx(
      'py-2 px-3 max-w-full',
      'bg-gray-400 bg-opacity-10 focus:bg-transparent',
      'shadow-sm rounded',
      'focus:outline-none border border-solid border-gray-400 border-opacity-20 focus:border-primary focus:border-opacity-100 focus:ring ring-primary ring-opacity-10',
      'placeholder-gray-400 placeholder-opacity-50 focus:placeholder-opacity-90',
      fluid ? 'w-full' : 'w-60',
      className,
    )}
    {...props}
  />
)

const Inner = styled.input`
  /* Disable autocompletion styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: currentColor;
    transition: background-color 5000s ease-in-out 0s;
  }
`
