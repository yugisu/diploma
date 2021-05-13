import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

import { Themes } from 'styles/theme'
import { preferredThemeVar } from 'vars/preferredThemeVar'

import { ApplicationRoutes } from 'containers/ApplicationRoutes/ApplicationRoutes'

export const App = () => {
  const preferredTheme = useReactiveVar(preferredThemeVar)

  return (
    <ThemeProvider theme={Themes[preferredTheme]}>
      <BrowserRouter>
        <ApplicationRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
