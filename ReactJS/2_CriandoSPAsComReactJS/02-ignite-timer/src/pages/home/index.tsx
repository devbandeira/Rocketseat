import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useState, useEffect, createContext } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { differenceInSeconds, interval } from 'date-fns'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
// Criando interface para o context e dizer quais informações vão ser armazenadas no contexto
// Ou undefined poruqe se não encontrar nenhum ciclo, ela fica como undefined
interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  // Não é aconselhavel passar a função do useState() seyCycles inteira pelo CONTEXT, porque temos que TIPAR com TS e se passar o mouse em cima dela
  // ela é um " React.Dispatch<React.SetStateAction<Cycle[]>> ", ao invés de enviar nesses casos a função setCycles inteira. Ele cria uma variavel
  // usando o setCycles e passo a função no contexto.

  /*  passando como contexto!!!

  if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          ) 
          
  */
  // void para dizer que não tem parametros e nem retorno
  markCurrentCycleAsFinished: () => void
}
// Criando contexto
// as CyclesContextType -> se eu ñ colocar isso, ele vai enteder que é um contexto vazio.
// O maior problema dele vazio é que quando eu for colocar ele em volta dos componentes que vão acessar. TIRANDO O TAB NINE que é extensão do VSCode
// Quando vou por o value passando as propriedades que vão ter acesso, eu não vou ter INTELISENSE, se eu uso o "as alguma coisa" ele já me instrui o que devo por
// linha 90 ( <CyclesContext.Provider value={{ activeCycle }}> )
export const CyclesContext = createContext({} as CyclesContextType) // Exportando o contexto para o Componente CountDown acessar o contexto

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Ao invés de passar o SetCycle do useState(), vou passar essa fn markCurrentCycleAsFinished
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)
  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisable = !task
  return (
    <HomeContainer>
      <form /* </HomeContainer>onSubmit={handleSubmit(handleCreateNewCycle)} */>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisable} */ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
