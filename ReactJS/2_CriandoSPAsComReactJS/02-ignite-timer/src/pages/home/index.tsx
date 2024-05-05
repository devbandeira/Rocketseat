import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { useContext } from 'react'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // Usando o contexto criado
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
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
  const { handleSubmit, watch /* reset */ } = newCycleForm

  // COMO NÃO GOSTAMOS DE PASSAR A FUNÇÃO INTEIRA POR CONTEXTO, VAMOS FAZER UM PROXY, UMA FUNÇÃO QUE CHAMA OUTRA FUNÇÃO

  const task = watch('task')
  const isSubmitDisable = !task
  return (
    // Envolvendo com form provider e fznd um spreed
    // Como fiz o spreed, to passando para o meu <NewCycleForm /> todo método Ex."register={register} etc..."
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
