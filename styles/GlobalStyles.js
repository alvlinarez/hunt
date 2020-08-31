import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --gray: #3d3d3d;
    --gray2: #6f6f6f;
    --gray3: #e1e1e1;
    --orange: #da552f;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    line-height: 1.5;
    font-family: 'PT Sans', sans-serif;
  }
  h1, h2, h3 {
    margin: 0 0 2rem 0;
    line-height: 1.5;
  }
  h1, h2 {
    font-family: 'Roboto Slab', serif;
    font-weight: 700;
  }
  h3 {
    font-family: 'PT Sans', sans-serif;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
  text-decoration: none;
  }
  img {
    max-width: 100%;
  }
`;

export default GlobalStyle;
