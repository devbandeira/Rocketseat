function Post(props){/*Dentro da props eu recebo um OBJETO {} que tem minhas propriedades */
  return (
     /*No react quando quero exibir o valor de uma variavel JS dentro do HTML eu uso o {}*/
    <>
    <strong>{props.name}</strong>
    <p>{props.post}</p>
    </>
    )
}

export default Post

