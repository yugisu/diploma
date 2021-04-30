import React from 'react'
import styled from 'styled-components'
import { space, SpaceProps, layout, LayoutProps } from 'styled-system'

type Props = {
  description: React.ReactNode
  control: React.ReactNode

  fluid?: boolean
} & SpaceProps &
  LayoutProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'>

export const InputLabel = ({ description, control, ...props }: Props) => (
  <Inner {...props}>
    <Description>{description}</Description>

    {control}
  </Inner>
)

const Inner = styled.label<{ fluid?: boolean }>`
  flex-grow: 0;
  width: ${(props) => (props.fluid ? '100%' : '15rem')};

  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;

  ${space}
  ${layout}

  & > input {
    width: 100%;
  }
`

const Description = styled.div`
  margin-bottom: 0.25rem;

  font-weight: bold;
  font-size: 0.85rem;
`
