import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { ActionTypes, addNewCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns/differenceInSeconds'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state');
    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    //Caso não tenha nada no LocalStore, retorne o meu reducer do jeito que está
    return {
      cycles: [],
      activeCycleId: null,
    }
  })

  const { cycles, activeCycleId } = cyclesState
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  //Para comecar no 59 segundos fazer uma fn dentro do useState, e não iniciar ele direto do 00
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(),new Date(activeCycle.startDate),
      )
  
    }
    return 0
  })

  //Para salvar o eSTADO no STORAGE
  // Toda vez que o meu [cyclesState] mudar por qualquer motivo, vou salvar no local storage
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    //dica-> quando for salvar inf no localStorage, sempre coloque um prefixo com o nome da aplicação '@ignite-timer:cycles-state-1.0.0' e por versão
    //versiono devido se algum dia eu precisar trocar essa variavel, salvar um valor dif, quem tiver com valor antigo
    //pode ocasionar algum bug na minha aplicação, caso abram outra atualização mas a maquina continua com a mesma
    //Devido todas nossas aplicações dividirem o mesmo localStorage
    localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
  }, [cyclesState])



  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // setCycles((state) => [...state, newCycle])
    dispatch(addNewCycleAction(newCycle))

    // setCycles((state) => [...state, newCycle])

    // Posso tirar o setActiveCucleID e pegar ele também no meu reduce
    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentAction())

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    // posso tirar isso daqui tbm e ir no meu REDUCE e fazer la tbm
    // setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
