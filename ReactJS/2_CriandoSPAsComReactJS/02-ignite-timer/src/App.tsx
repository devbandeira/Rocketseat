/* ThemeProvider -> Usado podendo ficar no lugar do FRAGMENT e permitir que passamos
passar a propriedade theme={nomeDaConstExportadoPelo default nesse caso} e la
no App.tsx conseguir acessar o valor */
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
