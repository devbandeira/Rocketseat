import { createContext, useContext, useState } from 'react'
// -> Para compartilhar a informação de Contexto eu uso uma outra função chamada
// useContext, também do meu REACt

// Criando meu contexto: É somente uma função, e preciso armazenar o contexto em
// uma variável, nesse caso CyclesContext. Dentro dos parenteses, colocamos o
// valor inicial do contexto, geralmente usamos um objeto para passar diversas infos {}
// Passei as any aqui para que o TS não fique tentando adivinhar ou forçar
const CyclesContext = createContext({} as any)
// const CyclesContext = createContext({
//   activeCycle: 1
// })

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    <h1>
      NewCycleForm: {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Alterar ciclo ativo
      </button>
    </h1>
  )
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {
  // Qualquer coisa que vai ter o valor ALTERADO ao(principalmente pelo usuario) longo da aplicação PRECISA
  // SER UM ESTADO, por isso vou criar aqui o activeCycle para ser mudado
  const [activeCycle, setActiveCycle] = useState(0)
  // É na HOME o nosso componente pai, pois ela quem ENGLOBA os componentes Countdown e NewCycleForm !!!!!!!!!!!!!!!!!!!!
  //  Sempre que quero que as informações sejam acessiveis para o conetxto, ela precisa estar no componente mais externo
  // do contexto onde quero ter acesso a ela..
  return (
    // CyclesContext.Provider -> Por volta dos componentes que preciso que tenha acesso as informações do contexto
    // e ele recebe um valor, e eu preciso enviar quais informações quais sejam compartilhadas entre todos os componentes
    // que estão envoltos pelo provider.
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}

// Reparo que agora todos os outros componentes vai estar acessando a informação que esta sendo passada no nosso componente home
// que é o componente pai (no nosso ESTADO)