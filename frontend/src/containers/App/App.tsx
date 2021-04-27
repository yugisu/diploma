import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useReactiveVar } from '@apollo/client'

import { Themes } from 'styles/theme'
import { authService } from 'services/authService'
import { authVar } from 'vars/authVar'
import { preferredThemeVar } from 'vars/preferredThemeVar'

import { AuthPage } from 'pages/AuthPage/AuthPage'
import { MainPage } from 'pages/MainPage/MainPage'

export const App = () => {
  const preferredTheme = useReactiveVar(preferredThemeVar)

  const isAuthenticated = useReactiveVar(authVar)
  const [checkingAuthentication, setCheckingAuthentication] = useState(true)

  useEffect(() => void authService.checkToken().then(() => setCheckingAuthentication(false)), [])

  return (
    <ThemeProvider theme={Themes[preferredTheme]}>
      <button onClick={() => preferredThemeVar(preferredTheme === 'light' ? 'dark' : 'light')} type="button">
        Toggle theme
      </button>

      {!checkingAuthentication && <>{isAuthenticated ? <MainPage /> : <AuthPage />}</>}
    </ThemeProvider>
  )
}
