import { css, ThemedCssFunction, DefaultTheme } from 'styled-components'

type MediaQuery = {
  query: string
  css: ThemedCssFunction<DefaultTheme>
  isActive: () => boolean
}

const createMediaQuery = (query: string): MediaQuery => ({
  query,
  css: (...args: Parameters<typeof css>) => css`
    ${`@media screen and ${query} {
      ${css(...args)}
    }`}
  `,
  isActive: () => window.matchMedia(query).matches,
})

const darkMedia = '(prefers-color-scheme: dark)'
export const dark = createMediaQuery(darkMedia)

const desktopMedia = '(min-width: 850px)'
export const desktop = createMediaQuery(desktopMedia)

const tabletMedia = '(max-width: 849px)'
export const tablet = createMediaQuery(tabletMedia)

const mobileMedia = '(max-width: 575px)'
export const mobile = createMediaQuery(mobileMedia)
