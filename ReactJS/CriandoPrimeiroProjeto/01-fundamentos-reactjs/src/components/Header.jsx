import style from "./Header.module.css";

import igniteLogo from '../assets/ignite-logo.svg';

export function Header (){
  return (
    <header className={style.header}>
    <strong> Alexander Bandeira</strong>
    <img src={igniteLogo} alt="Logotipo do Ignite" />
    </header>
  )
}