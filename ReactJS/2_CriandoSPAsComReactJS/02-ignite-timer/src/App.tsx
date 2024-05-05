/* ThemeProvider -> Usado podendo ficar no lugar do FRAGMENT e permitir que passamos
passar a propriedade theme={nomeDaConstExportadoPelo default nesse caso} e la
no App.tsx conseguir acessar o valor */
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
// Quando passo um componente "dentro de um componente", preciso falar no componente
// que envolve, onde o componente vai ser acoplado, então vou no CyclesContextProvider
// e por a propriedade Children "export function CyclesContextProvider({ children })".
// Que é criada pelo proprio react e o conteudo dela.
// vai ser tudo que passarmos dentro do nosso <CyclesContextProvider> DENTRO</CyclesContextProvider>
// Agora posso usar o children no return la no CyclesContext.tsx
