import { cssVar } from 'polished'

const Colors = {
  black: `rgb(${cssVar('--black')})`,
  white: `rgb(${cssVar('--white')})`,
  darkGray: `rgb(${cssVar('--darkGray')})`,
  primary: `rgb(${cssVar('--primary')})`,
}

export type ProjectTheme = {
  name: keyof typeof Themes
  colors: {
    bg: string
    text: string
  } & typeof Colors
}

const lightTheme: ProjectTheme = {
  name: 'light',
  colors: {
    ...Colors,
    bg: Colors.white,
    text: Colors.black,
  },
}

const darkTheme: ProjectTheme = {
  name: 'dark',
  colors: {
    ...Colors,
    bg: Colors.darkGray,
    text: Colors.white,
  },
}

export const Themes = {
  light: lightTheme,
  dark: darkTheme,
}

export type ThemeName = keyof typeof Themes

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface DefaultTheme extends ProjectTheme {}
}
