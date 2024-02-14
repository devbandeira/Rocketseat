import styled, { css } from "styled-components";
import 'styled-components';

export type ButtonVariant = "primary" | "secundary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secundary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  /* Acessando as propriedades do meu THEMA default.ts */
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.white}

  /* Interpolação de STIRNG */
  /* ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }} */
`;
