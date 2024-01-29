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
  const [comments, setComments] = useState(['Post muito bacana, hein?']);

  //novo estado para handleNewCommentChange, que vai armazenar um novo valor, limpar o textarea e atualizar com o novo comentario em tela
  const [newCommentText, setnewCommentText] = useState('')

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
  //Tenho o setComments que vai pegar todos os COMENTARIOS "comments", mais o nosso newCommentText que foi criado um novo 
  //estado para monitorar nosso textarea quando acontece o onChange() e criar em tela. E o setnewCommentText() atualiza o newCommentText()
  //Ou seja o setComments vai pegar as duas variaveis, o SPREAD ...comments e o novo textarea newCommentText e dar um setComments que é ativo
  //no onSubmit do formulário. e em seguida vai por o TEXTAREA vazio setnewCommentText(''), mudando na TAG TEXTAREA que o valor dela é o valor
  // do newCommentText, que agora é VAZIO DEVIDO O setnewCommentText('')
    setComments([...comments, newCommentText]);

    setnewCommentText('')
  }

  //Funçao que vai ser chamada após ser relembrado de programação declarativa, que vai monitorar a mudança do nosso textarea
  //Aqui dentro tbm tenho acesso ao event.target que retorna diretamente a textarea diretamente e não o formulário, porque o evento agora
  //foi adicionado no TEXTAREA e não no formulário. Evento do formulário (onSubmit) e do textarea(onChange)
  function handleNewCommentChange() {//Change é para quando o comments alterar
    setnewCommentText(event.target.value); //Agora tenho o valor da TEXTAREA armazenado no meu estado setnewCommentText(), posso usar a variável
    //newCommentText que tem o valor mais recente adicionado para adicionar um novo comentário no final.
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

      {/* Dando um name para conseguir pegar no event.target e passar para o useState */}
        <textarea name="comment" placeholder="Deixe um comentário" value={newCommentText} onChange={handleNewCommentChange}/>

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
       {comments.map(comentarios => {
        return <Comment  content={comentarios}/>
       })}
      </div>
    </article>
  );
}
