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
  task: zod.string().min(1, 'Informe a tarefa'), // Quero que o TASK seja uma string, que tenho no minimo um caractere e que a mensagem caso não tenha no min 1 carc seja 'Informe a tarefa'
  minutesAmount: zod
    .number()
    .min(5)
    .max(60, 'O ciclo precisa ser de no máximo 60 min'),
}) // Aqui o formato é um OBJECT porque na minha FN handleCreateNewCycle, quando clico no btn
// Me retorna um objeto, então a validação vai ser em cima de um object.
// Após fazer a validação, devo usar uma função chamada formState e dentro dele, tenho uma variável chamada ERROS, que vai informar os meus erros de validação

export function Home() {
  // Passando um objeto de configuração para o userForm para usar o zod
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  // posso apagar-> somente para mostrar no console o erro
  console.log(formState.errors)

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
            /* A fn register recebe um parametro que retorna alguns métodos que retorna alguns métodos que usamos em formulário em JS
             function register(name: string) {
                return {
                  onChange: () => void,
                  onBlur: () => void,
                  etc..
                }
             }
             O {...} faz pegar todas as coisas retornadas no regster('task') e acoplha no nosso input como propriedade
            */
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
