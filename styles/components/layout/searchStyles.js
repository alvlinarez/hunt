import styled from 'styled-components';

export const InputText = styled.input`
  border: 1px solid var(--gray3);
  padding: 1rem;
  min-width: 300px;
`;

export const ButtonSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/img/search.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: #fff;
  border: none;
  text-indent: -9999px;
  &:hover {
    cursor: pointer;
  }
`;
