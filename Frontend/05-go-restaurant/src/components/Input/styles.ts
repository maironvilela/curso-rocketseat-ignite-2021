import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;

}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border: 1px solid #ff9000;
     `}

  ${props =>
    props.isFilled &&
    css`
      input{
        color: #ff9000;
      }
    `}


  svg {
    margin-right: 16px;
  }
`;