import styled from 'styled-components';

export const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem auto 0 auto;
  width: 40%;
`;

export const SocialMediaIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  img {
    width: 5rem;
  }
  a {
    text-decoration: none;
    color: #000;
    margin-left: 2rem;
  }
  a:hover {
    text-decoration: underline;
  }
`;
