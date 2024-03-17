import styled from 'styled-components'

// height: calc(100vh - 10rem);-> Usa 100%vh viewPortHeight e tiro 10rem para poder deixar 5rem top e botton
// margin: 5rem auto; -> 5 para cada lado e auto para ficar centralizado
// flex-direction: column; -> se olhar no nosso layout estão estilo coluna, distribuidos
export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
