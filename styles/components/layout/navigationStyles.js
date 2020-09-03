import styled from 'styled-components';

export const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: 'PT Sans', sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      color: var(--gray);
    }
  }
  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 2rem;
    a {
      margin-left: 0;
      &:last-of-type {
        margin-left: 2rem;
      }
    }
  }
`;
