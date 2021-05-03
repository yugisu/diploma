import clsx from 'clsx'
import React from 'react'
import styled from 'styled-components'

type Props = {
  description: React.ReactNode
  control: React.ReactNode

  fluid?: boolean
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'>

export const InputLabel = ({ description, control, fluid, className, ...props }: Props) => (
  <Inner className={clsx('mb-4 flex flex-col', fluid ? 'w-full' : 'w-32', className)} {...props}>
    <span className="mb-1 font-bold text-lesser">{description}</span>

    {control}
  </Inner>
)

const Inner = styled.label<{ fluid?: boolean }>`
  & > input {
    width: 100%;
  }
`
