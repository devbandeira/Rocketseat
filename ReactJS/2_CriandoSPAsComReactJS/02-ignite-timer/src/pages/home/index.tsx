import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
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
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Agora a fn REGISTER é usada dentro do NewCycleForm, para eu acessar, posso jogar como propriedade ou context. Mas ela de fato não é algo do nosso contexto
  // é algo de uma lib de fora, se for trocada, parará de funcionar.
  // Mas não vamos usar nem PROPRIEDADE ou CONTEXT, mas VAMOS USAR O CONTEXT PROPRIO DA LIB REACT-HOOK-FORM
  // AO invés de fazer a desestruturação " { register, handleSubmit, watch, reset } "
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  // Como preciso de umas fn que vem dele newCycleForm vou desestruturar aqui fora
  // continua a mesma coisa que antes, mas continuo tendo acesso a variavel newCycleForm completa sem desestruturar
  // Tirei o registre pq só uso no componente de formulário
  // agora em volta do meu componente <NewCycleForm /> vou por <FormProvider /> que envolverá o <NewCycleForm />
  const { handleSubmit, watch, reset } = newCycleForm

  // COMO NÃO GOSTAMOS DE PASSAR A FUNÇÃO INTEIRA POR CONTEXTO, VAMOS FAZER UM PROXY, UMA FUNÇÃO QUE CHAMA OUTRA FUNÇÃO
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
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

  // Essa fn atualiza o setAmountSecondsPAssed para zero, ela precisa também acesso a variavel amountSecondsPast
  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

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

  const task = watch('task')
  const isSubmitDisable = !task
  return (
    // Envolvendo com form provider e fznd um spreed
    // Como fiz o spreed, to passando para o meu <NewCycleForm /> todo método Ex."register={register} etc..."
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          // Ideal de coisas no contexto, somente coisas que não vão mudar se trocarmos uma LIB ou algo do genero
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
