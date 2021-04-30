import { cssVar } from 'polished'

const Colors = {
  black: `${cssVar('--black')}`,
  white: `${cssVar('--white')}`,
  primary: `${cssVar('--primary')}`,

  // Oranges
  orange1: `${cssVar('--orange1')}`,
  orange2: `${cssVar('--orange2')}`,
  orange3: `${cssVar('--orange3')}`,
  orange4: `${cssVar('--orange4')}`,
  orange5: `${cssVar('--orange5')}`,
  orange6: `${cssVar('--orange6')}`,
  orange7: `${cssVar('--orange7')}`,
  orange8: `${cssVar('--orange8')}`,
  orange9: `${cssVar('--orange9')}`,
  orange10: `${cssVar('--orange10')}`,
  orange11: `${cssVar('--orange11')}`,
  orange12: `${cssVar('--orange12')}`,
  orange13: `${cssVar('--orange13')}`,
  orange14: `${cssVar('--orange14')}`,
  orange15: `${cssVar('--orange15')}`,
  orange16: `${cssVar('--orange16')}`,
  orange17: `${cssVar('--orange17')}`,
  orange18: `${cssVar('--orange18')}`,
  orange19: `${cssVar('--orange19')}`,
  orange20: `${cssVar('--orange20')}`,

  // Grays
  gray1: `${cssVar('--gray1')}`,
  gray2: `${cssVar('--gray2')}`,
  gray3: `${cssVar('--gray3')}`,
  gray4: `${cssVar('--gray4')}`,
  gray5: `${cssVar('--gray5')}`,
  gray6: `${cssVar('--gray6')}`,
  gray7: `${cssVar('--gray7')}`,
  gray8: `${cssVar('--gray8')}`,
  gray9: `${cssVar('--gray9')}`,
  gray10: `${cssVar('--gray10')}`,
  gray11: `${cssVar('--gray11')}`,
  gray12: `${cssVar('--gray12')}`,
  gray13: `${cssVar('--gray13')}`,
  gray14: `${cssVar('--gray14')}`,
  gray15: `${cssVar('--gray15')}`,
  gray16: `${cssVar('--gray16')}`,
  gray17: `${cssVar('--gray17')}`,
  gray18: `${cssVar('--gray18')}`,
  gray19: `${cssVar('--gray19')}`,
  gray20: `${cssVar('--gray20')}`,
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
    bg: Colors.gray20,
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
