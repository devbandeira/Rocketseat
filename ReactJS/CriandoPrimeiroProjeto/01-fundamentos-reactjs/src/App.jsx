import Post from "./Post";
import { Header } from "./components/Header";

function App() {
  return (
  <>
  <Header />
  <Post name = "Alexander" post = "Novo Poste 1"/>
  <Post name = "Duda" post = "Nuevo Poste 2"/>
  <Post name = "Allan" post = " New Poste 3"/>
  </>
  );
}

export default App;
