import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useReactiveVar } from '@apollo/client'

import { Themes } from 'styles/theme'
import { preferredThemeVar } from 'vars/preferredThemeVar'

import { GlobalStyles } from 'components/GlobalStyles/GlobalStyles'

export const App = () => {
  const preferredTheme = useReactiveVar(preferredThemeVar)

  return (
    <ThemeProvider theme={Themes[preferredTheme]}>
      <GlobalStyles />

      <button onClick={() => preferredThemeVar(preferredTheme === 'light' ? 'dark' : 'light')} type="button">
        Toggle theme
      </button>
    </ThemeProvider>
  )
}
