import '../public/global.css'
import './global-theming.css'

import { ThemeProvider } from 'styled-components'
import { addDecorator } from '@storybook/react'
import { withThemes } from '@react-theming/storybook-addon'

import { Themes } from '../src/styles/theme'

addDecorator(
  withThemes(ThemeProvider, Object.values(Themes), {
    onThemeSwitch: ({ theme }) => {
      if (theme.name === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      return {
        parameters: {
          backgrounds: {},
        },
      }
    },
  }),
)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
