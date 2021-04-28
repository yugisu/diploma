import React from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'

import { preferredThemeVar } from 'vars/preferredThemeVar'

import { PageHeader } from 'components/Layout/Layout'

export const Topbar = () => {
  const preferredTheme = useReactiveVar(preferredThemeVar)

  return (
    <PageHeader>
      <InnerContainer>
        <Logo>Diploma</Logo>

        <button onClick={() => preferredThemeVar(preferredTheme === 'light' ? 'dark' : 'light')} type="button">
          {preferredTheme === 'light' ? '🌚' : '🌞'}
        </button>
      </InnerContainer>
    </PageHeader>
  )
}

const Logo = styled.span`
  display: flex;
  align-items: center;

  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8rem;
`

const InnerContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`
