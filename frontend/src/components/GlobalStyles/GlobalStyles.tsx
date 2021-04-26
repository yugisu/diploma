import { createGlobalStyle } from 'styled-components'

import { mobile } from 'utils/media'

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;

    font-family: Roboto, sans-serif;
    font-size: 16px;

    ${mobile.css`
      font-size: 14px;
    `}
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  *:focus,
  *:active {
    outline-color: ${(props) => props.theme.colors.primary};
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Montserrat, sans-serif;
    font-weight: 800;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
