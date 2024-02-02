import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void
  //poderia ser qualquer nome no lugar do comment, só preciso dizer que ela recebe uma string
}

export function Comment ({content, onDeleteComment}: CommentProps) {

  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount((state) => {
      return state + 1;
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/devbandeira.png" alt=""/>

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
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20}/>
             Aplaudir <span>{likeCount}</span>
          </button>
        </footer>

      </div>
    </div>
  );
}