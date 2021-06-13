import React from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { SunIcon, MoonIcon, ViewBoardsIcon, ChatAlt2Icon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom'

import { authVar } from 'vars/authVar'
import { preferredThemeVar } from 'vars/preferredThemeVar'
import { authService } from 'services/authService'

import { PageHeader } from 'components/Layout/Layout'
import { Button } from 'components/Common/Button'

export const Topbar = () => {
  const isAuthenticated = useReactiveVar(authVar)
  const preferredTheme = useReactiveVar(preferredThemeVar)

  return (
    <PageHeader className="shadow-sm">
      <div className="w-full flex justify-between">
        <Logo>Diploma</Logo>

        {isAuthenticated && (
          <div className="px-4 group flex items-center">
            {([
              [
                <>
                  <ChatAlt2Icon className="inline align-text-bottom" height="1.2em" /> Chats
                </>,
                '/c',
              ],
              [
                <>
                  <ViewBoardsIcon className="inline align-text-bottom" height="1.2em" /> Board
                </>,
                '/t',
              ],
            ] as const).map(([title, path]) => (
              <NavLink
                to={path}
                className="px-1 opacity-50 group-hover:opacity-100 hover:text-primary-300 transition-opacity"
                activeClassName="text-primary hover:text-primary"
                key={path}
              >
                {title}
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center">
          {isAuthenticated && (
            <Button className="mr-2" compact type="button" onClick={() => authService.logout()}>
              Logout
            </Button>
          )}

          <button
            className="w-6 h-6 flex justify-center items-center rounded-full opacity-80 hover:opacity-100 focus:opacity-100 focus:outline-none ring-primary ring-opacity-40 focus:ring"
            onClick={() => preferredThemeVar(preferredTheme === 'light' ? 'dark' : 'light')}
            type="button"
          >
            {preferredTheme === 'light' ? <MoonIcon height="1.2em" /> : <SunIcon height="1.2em" />}
          </button>
        </div>
      </div>
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
