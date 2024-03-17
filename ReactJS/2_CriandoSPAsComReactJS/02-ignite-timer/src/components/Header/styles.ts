import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Alinhar ao centro horizontal e vertical e justify para jogar ele totalmente para os extremos */

  /* O gap vai adicionar dentro do mesmo container 0.5rem para cada item dentro do mesmo container */
  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      /* display:flex -> para centralizar os itens no tamanho de 48px = 3rem */
      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};
      /* add borda, mas não da efeito pq da transparente, ela esta add para o hover, aparecer verde quando der hover*/
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      /*  Coloco a borda top e bottom, porque se eu não por, quando eu der o HOVER ele vai criar uma borda que não tinha
      e automaticamente vai deslogar o icon para cima, e boto a borda superior para ajudar a manter o icone no mesmo local quando der o hover.
      por isso o border 3px fixo, porque quando de rhover ele n vai se mover pq ja existia borda*/

      /* quando eu tiver com o hover nesse botao eu dou um.. */
      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      /* Quando clico nos icones o NavLink, quando carrego a página ativa for a history por exemplo. ele vai
      colocar na Ancora que ta de volta no nosso icone, uma class="active", chamada active e uma aria-current='page'
      posso usar essa class='active' no meu styles.ts para fazer estilização no link, nesse caso por ['gree-500']*/
      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
