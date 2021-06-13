import { makeVar } from '@apollo/client'

import type { ThemeName } from 'styles/theme'

// TODO: Remove next two lines and restyle certain elements to support light theme
localStorage.setItem('preferredTheme', 'dark')
document.documentElement.classList.add('dark')

export const preferredThemeVar = makeVar<ThemeName>(
  (localStorage.getItem('preferredTheme') as ThemeName | null) ??
    (document.documentElement.classList.contains('dark') ? 'dark' : 'light'),
)

const reactToPreferredThemeChange = (value: ThemeName) => {
  localStorage.setItem('preferredTheme', value)

  if (value === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (value === 'light') {
    document.documentElement.classList.remove('dark')
  }

  preferredThemeVar.onNextChange(reactToPreferredThemeChange)
}

// Update localStorage and application appearance upon theme change
preferredThemeVar.onNextChange(reactToPreferredThemeChange)
