import styles from './Post.module.css';

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img className={styles.avatar} src="https://github.com/devbandeira.png"/>
          <div className={styles.authorInfo}>
            <strong>Alexander Bandeira</strong>
            <span>Developer</span>
          </div>
        </div>

        <time title='23 de Janeiro às 10:00' dateTime='2023-01-11'>
          publicado há 1hora
        </time>
      </header>

      <div className={styles.content}>
        <p>Primeiro paragrafo</p>
        <p>Segundo paragrafo</p>
        {/* formas de por espaço, como um backspace no REACT {'    '} */}
        <p><a href=""> #hastag1</a>{' '}
        <a href=""> #hastag2</a>{' '}
        <a href=""> #hastag3</a></p>{' '}
      </div>

      {/*Construção da parte de comentário */}
      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder='Deixe um comentário' 
        />

        <footer>
        <button type='submit'>Publicar</button>
        </footer>
      </form>
    </article>
  )
}