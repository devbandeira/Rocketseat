import styles from './Button.module.css';

interface ButtonProps {
  color?: 'primary' | 'secundary' | 'danger' | 'success';
}

export function Button({ color = 'primary'}: ButtonProps){
  return (
    <button className={`${styles.button} ${styles[color]}`}>Enviar</button>
  )
}