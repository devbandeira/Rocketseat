import {Post} from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import styles from "./App.module.css"; /*Posso ter um importe GLOBAL e um não global */
import "./global.css";

/*<div className={styles.wrapper}></div> -> Qnd uso Styles.Já Mosta o que tenho dentro do meu App.module.css 
Devido CSS Modules extensão*/
function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post />
          <Post name="Duda" post="Nuevo Poste 2" />
          <Post name="Allan" post=" New Poste 3" />
        </main>
      </div>
    </>
  );
}

export default App;
