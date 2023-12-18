import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import styles from "./App.module.css"; /*Posso ter um importe GLOBAL e um não global */
import "./global.css";

//Quais infos variam de um post para o outro
// author: {avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String

//Simulando um backend, pai
//OBS DICA -> Evitar a todo custo que o BACKEND retorne HTML
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Alexander",
      role: "Developer",
    },
    content: [
      { type: "paragraph", content: "Primeiro paragrafo" },
      { type: "paragraph", content: "Segundoo paragrafo" },
      { type: "link", content: "#hastag1 #hastag2" },
    ],
    publishAt: new Date("2023-12-12T19:00:00Z"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/devbandeira.png",
      name: "Alex",
      role: "Developer Backend",
    },
    content: [
      { type: "paragraph", content: "Create rules to your software" },
      { type: "paragraph", content: "The best Backend ever" },
      { type: "link", content: "#hastag1 #hastag2" },
    ],
    publishAt: new Date("2023-12-15T12:00:00Z"),
  },
  {
    id: 3,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "DevBandeira",
      role: "Cybersecurity",
    },
    content: [
      { type: "paragraph", content: "Protect your network" },
      { type: "paragraph", content: "Protect yourself" },
      { type: "link", content: "#hastag1 #hastag2" },
    ],
    publishAt: new Date("2023-12-17T07:00:00Z"),
  },
];
//ITERAÇÃO -> UMA DAS COSIAS MAIS IMPORTANTES DO REACTJS (ESTRUTURA DE REPETIÇÃO E PARA CADA POSIÇÃO DO ARRAY EU VOU FAZER ALGO)
//Sempre dentro do JSX onde temos HTML, sempre vamos usar o MAP, pois o MAP tem retorno, diferente do forEach

// {/* MINHAS VARIAVEIS QUE ESTÁO ARMAZENANDO MEU 'BACKEND FICTICIO' */}
// {/* Não posso usar o método foreach, pq ele percorre o array, mas ele não tem nenhum retorno, sempre algo vai ser VOID
// nada vai ser exibido em tela. Nesses casos devemos usar algo semelhante, mas que reotrne algo dentro dele
//  */}

/*<div className={styles.wrapper}></div> -> Qnd uso Styles.Já Mosta o que tenho dentro do meu App.module.css 
Devido CSS Modules extensão*/
function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post 
                author={post.author}
                content={post.content}
                publishAt={post.publishAt}
              />
            )
          })}
        </main>
      </div>
    </>
  );
}

export default App;
