import 'styled-components';
import { defaultTheme } from '../styles/themes/default';
type ThemeType = typeof defaultTheme;


declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}



// Descobri o erro -> Na linha 7, faltou o L do DefaultTheme
// import 'styled-components'
// import { defaultTheme } from '../styles/themes/default'

// type ThemeType = typeof defaultTheme

// declare module 'styled-components' {
//   export interface DefaultTheme extends ThemeType {}
// }