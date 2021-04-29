import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { space, SpaceProps, layout, LayoutProps } from 'styled-system'

type Props = {
  fluid?: boolean
} & SpaceProps &
  LayoutProps &
  React.InputHTMLAttributes<HTMLInputElement>

export const Input = (props: Props) => <Inner {...props} />

export const Inner = styled.input<{ fluid?: boolean }>`
  max-width: 100%;
  width: ${(props) => (props.fluid ? '100%' : '15rem')};

  padding: 0.5rem 0.75rem;

  color: inherit;

  background-color: ${(props) => transparentize(0.9, props.theme.colors.gray10)};

  border: solid 1px ${(props) => transparentize(0.9, props.theme.colors.text)};
  border-radius: 0.25rem;

  &::placeholder {
    color: ${(props) => transparentize(0.5, props.theme.colors.text)};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};

    &::placeholder {
      color: ${(props) => transparentize(0.28, props.theme.colors.text)};
    }
  }

  /* Disable autocompletion style */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: inherit;
    transition: background-color 5000s ease-in-out 0s;
  }

  ${space}
  ${layout}
`
