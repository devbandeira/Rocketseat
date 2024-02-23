/* ThemeProvider -> Usado podendo ficar no lugar do FRAGMENT e permitir que passamos
passar a propriedade theme={nomeDaConstExportadoPelo default nesse caso} e la
no App.tsx conseguir acessar o valor */
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

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
