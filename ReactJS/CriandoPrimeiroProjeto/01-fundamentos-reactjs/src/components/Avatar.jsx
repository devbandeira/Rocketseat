import styles from './Avatar.module.css'

/*aplicando desestruturacao para deixar o HASBORDER mais automatica com um falor padrao true 
tirando o props e pegando somente o que ta sendo passado e é do meu interesse*/
export function Avatar ({hasBorder = true, src}) {

  return(
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt="" />
  );
}