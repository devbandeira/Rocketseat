/* ThemeProvider -> Usado podendo ficar no lugar do FRAGMENT e permitir que passamos
passar a propriedade theme={nomeDaConstExportadoPelo default nesse caso} e la
no App.tsx conseguir acessar o valor*/
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { Button } from "./components/Button";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
    <Button variant="primary"/>
    <Button variant="secundary"/>
    <Button variant="success"/>
    <Button variant="danger"/>
    <Button />
    
    <GlobalStyle />
    </ThemeProvider>
  )
}
