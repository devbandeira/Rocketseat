import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      /* pegando a primeira TH */
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      /* pegando a ultia TH */
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.872rem;
      line-height: 1.6;

      /* pegando a primeira TH */
      &:first-child {
        width: 50%;
        border-top-left-radius: 8px;
      }
      /* pegando a ultia TH */
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
  }
`

// 4 ->
// OBS: O ts entendi isso como um objeto, quando o tS le o objeto, ele pode ter 3 chaves, yello/green/red e o valor
// dessas propriedades é um texto, que pode ser qualquer texto. Para eu dizer par ao TS que SEMPRE vai ser um desses 3
// eu uso o "as const". Se eu por o mouse no STATUS_COLORS sem o as const ele diz STRING/sTRING/STRING, com as const não faz isso
// Pq ele só vai encontrar essas 3 no tema, se eu passar uma que não tem 'red-500f', dará erro pq no tema não tem
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

// Apesar de ser um componente que criamos dentro do styles.ts, podemos passar propriedades.
// 1 -> Crio uma interface falando quais propriedades ele pode receber

// OBS -> posso melhorar mais ainda, se eu for por mais cores, eu vou ter que escrever aqui na interface
// Como as cores que tenho aqui vão ser as chaves do meu objeto STATUS_COLORS, posso usar keyof typeof STATUS_COLORS
interface StatusProps {
  // statusColor: 'yellow' | 'red' | 'green'
  statusColor: keyof typeof STATUS_COLORS
}

// 2 -> passo para o meu span dizendo que ela pode receber essas propriedades, utilizando o generic do TS.
// 3 -> vou no meu index e passar essa propriedade, porque sou obrigado.
// 4 -> vou criar uma constante para fazer o mapeamento dessas cores em RGB.
export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* after e before -> São coisas que conseguimos adicionar um elemento novo
  através do CSS. Que ficam dentro da TAG SPAN*/
  /* tenho que passar um conteudo mesmo que em branco para ele aparecer
  na tela, se não ele n aparece content:'' */
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
