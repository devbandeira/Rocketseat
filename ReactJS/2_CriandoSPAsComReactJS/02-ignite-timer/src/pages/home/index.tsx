import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'

// Vou criar um componente fora da função mesmo e passar de que forma quero realizar as validações
// Camamos de Schema porque essas lib usam um formato de validação que se chama Schema BASIC, ou seja, define um formato
// e usa esse formato para validar meu dado.
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5)
    .max(60, 'O ciclo precisa ser de no máximo 60 min'),
})

// POSSO EXCLUIR DEPOIS DO ZOD.INFER
// interface NewCycleFormData {
//   task: string
//   minutesAmout: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function Home() {
  // Passando um objeto de configuração para o userForm para usar o zod
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      // Vai aparecer aqui as opções porque passei o GENERICS <>, caso não, teria que fazer manual
      task: '',
      minutesAmout: 0,
    },
  })

  // Posso observar aqui que o tipo quando passo por cima ainda é any, eu poderia criar uma interface
  // e deduzir que sei os valores que serão retornados neste objeto, os inputs taks e minutesAmout, mas no useFor()
  // posso passar os valores padrão para este DATA
  function handleCreateNewCycle(data) {
    console.log(data)
  }

  const task = watch('task')

  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          {/* Lista de sugestões para o input */}
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            // Passando um segundo parâmetro, um objeto de confiurações e podemos passar uma variavel
            {...(register('minutesAmount'), { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
