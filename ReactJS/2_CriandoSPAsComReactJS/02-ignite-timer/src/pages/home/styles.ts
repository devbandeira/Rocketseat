import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-shrink: column;
  align-items: center;
  justify-content: center;

  /* Alinhando tituo, countdown e o ano e dando um gap */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`


export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  color: ${(props) => props.theme['gray-100']};

  /* PAra testar o botao disable com opacindade 70%, tem que passar como 
  propriedade la no btn */
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};

  /* concatenação de seletores no CSS. Quando não disable, aplicar hover */
  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};

  /* concatenação de seletores no CSS. Quando não disable, aplicar hover */
  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
