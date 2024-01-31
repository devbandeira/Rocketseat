import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';

export function Comment ({content, onDeleteComment}) {

  function handleDeleteComment(){
    //O ideal seria passar o ID aqui, se tivessemos
    onDeleteComment(content);
  }

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

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={20}/>
            </button>
          </header>

          <p>{content}</p>
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