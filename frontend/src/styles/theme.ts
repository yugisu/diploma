export type ProjectTheme = {
  name: keyof typeof Themes
  colors: {
    bg: string
    text: string
    primary: string
  }
}

const Colors = {
  black: '#1D2429',
  darkGrey: '#2f3336',
  white: '#fff',
  orange: '#FFAE4A',
}

const lightTheme: ProjectTheme = {
  name: 'light',
  colors: {
    bg: Colors.white,
    text: Colors.black,
    primary: Colors.orange,
  },
}

const darkTheme: ProjectTheme = {
  name: 'dark',
  colors: {
    bg: Colors.darkGrey,
    text: Colors.white,
    primary: Colors.orange,
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
