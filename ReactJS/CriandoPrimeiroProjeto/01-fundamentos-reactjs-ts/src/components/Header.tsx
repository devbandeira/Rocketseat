import style from "./Header.module.css";

import igniteLogo from '../assets/ignite-logo.svg';/*todas imgs importadas direto no arquivo JavaScript */

export function Header (){
  return (
    <header className={style.header}>
    <img src={igniteLogo} alt="Logotipo do Ignite" />
    <strong> Ignite Feed</strong>
    </header>
  )
}