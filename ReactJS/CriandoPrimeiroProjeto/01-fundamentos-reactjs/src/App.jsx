import Post from "./Post";
import { Header } from "./components/Header";

import styles from "./App.module.css"; /*Posso ter um importe GLOBAL e um não global */
import "./global.css";
import { Sidebar } from "./components/Sidebar";
/*<div className={styles.wrapper}></div> -> Qnd uso Styles.Já Mosta o que tenho dentro do meu App.module.css 
Devido CSS Modules extensão*/
function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post name="Alexander" post="Novo Poste 1" />
          <Post name="Duda" post="Nuevo Poste 2" />
          <Post name="Allan" post=" New Poste 3" />
        </main>
      </div>
    </>
  );
}

export default App;
