import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';

export function Comment () {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/devbandeira.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Alexander Bandeira</strong>
              <time title='23 de Janeiro às 10:00' dateTime='2023-01-11'>
                 cerca de 1 hora atrás
              </time>
            </div>

            <button title='Deletar comentário'>
              <Trash size={20}/>
            </button>
          </header>

          <p>Muito bom Alex, parabéns!! </p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20}/>
             Aplaudir <span>20</span>
          </button>
        </footer>

      </div>
    </div>
  );
}