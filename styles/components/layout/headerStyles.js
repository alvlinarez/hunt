import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: grid;
    justify-items: center;
  }
`;

export const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 2rem;
  }
`;
