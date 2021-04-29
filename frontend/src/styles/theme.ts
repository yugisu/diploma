const Colors = {
  black: '#1D2429',
  white: '#ffffff',

  // Oranges
  orange1: '#fff7ed',
  orange2: '#fff2e2',
  orange3: '#ffeed7',
  orange4: '#ffe9cc',
  orange5: '#ffe4c1',
  orange6: '#ffdfb6',
  orange7: '#ffdbab',
  orange8: '#ffd6a1',
  orange9: '#ffd196',
  orange10: '#ffcc8c',
  orange11: '#ffc781',
  orange12: '#ffc277',
  orange13: '#ffbd6c',
  orange14: '#ffb862',
  orange15: '#ffb257',
  orange16: '#ffad4c',
  orange17: '#ffa841',
  orange18: '#ffa235',
  orange19: '#ff9d28',
  orange20: '#ff9718',

  // Grays
  gray1: '#fcfcfc',
  gray2: '#f0f0f0',
  gray3: '#e4e5e5',
  gray4: '#d8d9da',
  gray5: '#cdcece',
  gray6: '#c1c2c3',
  gray7: '#b6b7b8',
  gray8: '#aaacad',
  gray9: '#9fa1a3',
  gray10: '#949698',
  gray11: '#898c8d',
  gray12: '#7e8183',
  gray13: '#747779',
  gray14: '#696c6f',
  gray15: '#5f6265',
  gray16: '#55585b',
  gray17: '#4b4f52',
  gray18: '#424548',
  gray19: '#383c3f',
  gray20: '#2f3336',
}

export type ProjectTheme = {
  name: keyof typeof Themes
  colors: {
    bg: string
    text: string
    primary: string
  } & typeof Colors
}

const lightTheme: ProjectTheme = {
  name: 'light',
  colors: {
    ...Colors,
    bg: Colors.white,
    text: Colors.black,
    primary: Colors.orange18,
  },
}

const darkTheme: ProjectTheme = {
  name: 'dark',
  colors: {
    ...Colors,
    bg: Colors.gray20,
    text: Colors.white,
    primary: Colors.orange18,
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
