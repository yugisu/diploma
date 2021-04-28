import React from 'react'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

type Props = {
  description: React.ReactNode
  control: React.ReactNode
} & SpaceProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'>

export const Label = ({ description, control, ...props }: Props) => (
  <Inner {...props}>
    <Description>{description}</Description>

    {control}
  </Inner>
)

const Inner = styled.label`
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;

  ${space}
`

const Description = styled.div`
  margin-bottom: 0.25rem;

  font-weight: bold;
  font-size: 0.85rem;
`
