import clsx from 'clsx'
import { lighten, transparentize } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'
import { space, SpaceProps, layout, LayoutProps } from 'styled-system'

type Props = {
  primary?: boolean
  outline?: boolean
  linkLike?: boolean
} & SpaceProps &
  LayoutProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className, ...props }: Props) => {
  return <Inner {...props} className={clsx('', className)} />
}

const Inner = styled.button<{
  primary?: boolean
  outline?: boolean
  linkLike?: boolean
}>`
  min-height: 1em;

  padding: 0.4rem 0.9rem;

  font-weight: bold;

  border-style: solid;
  border-width: 1px;
  border-radius: 0.25rem;

  ${(props) => css`
    color: ${lighten(0.2, props.theme.colors.text)};
    background-color: ${transparentize(0.7, props.theme.colors.gray10)};
    border-color: ${transparentize(0.6, props.theme.colors.gray10)};
  `}

  ${(props) =>
    props.primary &&
    css`
      color: ${props.theme.colors.white};
      background-color: ${props.theme.colors.primary};
      border-color: ${transparentize(0.7, props.theme.colors.primary)};
    `}

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  ${space}
  ${layout}
`
