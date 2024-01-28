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
  const [comments, setComments] = useState([1,2,3,])

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

  function handleCreateNewComment(){
    event.preventDefault();
    //comments.push(4);//Então isso vai sumir, dando espaço para o useState()

    //Aqui acontece imutabilidade, porque ele não passa somente o que ele quer inserir, ele passa um novo valor, passando tudo completo
    setComments([...comments, comments.length + 1])
    //para não ficar passando aqui valores fixos sempre, uso o SPREAD OPERADOR, pegando todos os valores anteriores e adicionando o novo valor

    console.log(comments);
  }

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
            return <p>{line.content}</p>;
          } else if (line.type == "link") {
            return (
              <p>
                <a href="">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      {/*Construção da parte de comentário */}
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
       {comments.map(comentarios => {
        return <Comment />
       })}
      </div>
    </article>
  );
}
