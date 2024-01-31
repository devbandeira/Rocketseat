import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

// estado/state = variáveis que eu quero que o componente monitore.

//Quais infos variam de um post para o outro
// author: {avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String

//Pondo src={} entre chaves pq é uma variavel JS
//para não ter que ficar escrevendo toda hora props.author, props., props. faço desestruturação do que vou usar apenas
export function Post({ author, publishAt, content }) {
  // console.log(publishAt + "   destruido");
  const [comments, setComments] = useState(["Post muito bacana, hein?"]);

  const [newCommentText, setnewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment() {
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setnewCommentText("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('');
    setnewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    //posso pegar o evento que acontece, de dentro dela.
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete){
    //Uso método FILTER do JS para retornar TRUE nos comentarios que quero manter
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete;
    });

    //Uso o setComments(commentsWithoutDeleteOne); para criar a nova lista sem
    //o comentário que quero excluir.
    setComments(commentsWithoutDeleteOne);
  }
  
  //Para o button
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type == "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type == "link") {
            return (
              <p key={line.content}>
                <a href="">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      {/*Construção da parte de comentário */}
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        {/* Dando um name para conseguir pegar no event.target e passar para o useState */}
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comentarios) => {
          return (
          <Comment 
            key={comentarios} 
            content={comentarios} 
            onDeleteComment={deleteComment}
          />
        );
        })}
      </div>
    </article>
  );
}
