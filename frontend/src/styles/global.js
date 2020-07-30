import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
    transition-duration: .3s;
    -webkit-font-smoothing: antialiased;

    &:not(h1, h2, h3, h4, h5, h6) {
      font-family: Arial, Helvetica, sans-serif;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: monospace;
  }

  html, body, #root {
    font-size: 16px;
    min-height: 100%;
  }

  body, input, button {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
