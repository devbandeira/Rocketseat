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

export function Home() {
  // form é um obj que tem várias funções dentro dele que posso usar, posso desestruturar
  // register -> É um método que vai "add" um input ao nosso formulário, quando uso o useForm()
  // e o register fala quais são os campos que vou ter no meu formulário. Vou passar la no meu TakInput {...register('darUmNomeParaOInput')}
  const { register, handleSubmit, watch } = useForm()

  // Importante no dar o nome do método igual o nome do método que foi desestruturado {handleSubmit}
  // Passando como argumento o data que são os dados de input do nosso formulário
  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  // Habilitando/Desabilitando o btn se o input taks estiver preenchido ou não, e dentro do meu useForm() pego uma fn WATCH
  // Agora consigo saber o valor do meu campo/input task em tempo real, e la no btn posso usar a estratégia de dizer que se o
  // o input taks for fazio ou null, vou desabilitar disabled={!task}
  const task = watch('task')
  // Criando uma variavel auxiliar que não alteram a performance e nem prejudicam a gente, mas melhora a legibilidade
  // Ex: const task = watch('task') -> quem le vai ter que correr até o final para entender o que acontecer e pq utilizando isso
  // Ou seja, o submite desse formulário está desabilitado ou não?(isSubmitDisabled), vai estar desabilitado quando não tenho nada na minha task (!task)
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      {/* Passando no onSubmit o handleSubmit do useForm() e passar para ele como parametro
      a nossa função de submit onSubmit={handleSubmit(handleCreateNewCycle)} */}
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
