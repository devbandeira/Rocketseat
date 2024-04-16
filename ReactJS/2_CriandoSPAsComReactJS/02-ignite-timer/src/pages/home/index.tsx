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
import { useState } from 'react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5)
    .max(60, 'O ciclo precisa ser de no máximo 60 min'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// Formato de cada ciclo que eu por dentro da minha aplicação
// Ter id para identificar os ciclos, pois além do ciclo ativo, tiveram os que ja foram encerrados na pg history
interface Cycle {
  id: string
  task: string
  minutesAmout: number
}

export function Home() {
  // Após o  const newCycle: Cycle =... é necessário eu dizer qual ciclo ta ativo e quais estão desativados, existem duas formas de fazer isso
  // uma delas seria na interface Cycle eu por um novo atributo isActive: boolean, digo se é TRUE ou FALSE, mas isso trará um problema,
  // toda vez que eu seta um novo ciclo, tenho que percorrer todo array para ver qual estava ativo e desativar antes do meu novo ciclo ativar.
  // Ou podemos fazer da seguinte forma
  // Aqui está iniciado como NULL porque quando eu inicio a aplicação pode ter ID NULL por não ter nenhum ciclo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // activeCycleId -> tenho a informação do ciclo ativo

  // É importante definir qual o formato da nossa informação dos ciclos
  // Aqui vou dizer que ele vai armazenar uma LISTA DE CICLOS <>
  // REPETINDO DEVE INICIAR O ESTADO COM UMA INFORMAÇÃO DO MESMO TIPO QUE VOU MANUSEAR AO LONGO DA APLICAÇÃO
  const [cycles, setCycles] = useState<Cycle[]>([])
  // cycles -> tenho todas informações dos meu ciclos da aplicação

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // Para eu refletir na minha aplicação que um novo ciclo iniciou, eu preciso de um estado. É a unica forma de eu conseguir armazenar
  // alguma informação do meu componente que vai fazer minha interface reaja a essa informação.
  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    // Criando um novo ciclo aqui dentro
    // Pondo : Cycle para eu ganhar intelesense do TS
    const newCycle: Cycle = {
      // getTime vai pegar a data atual convertida para milisegundos, para criar o ID, para n ter que usar uma lib externa
      // id: String(new Date().getTime()), tirando aqui de dentro e pondo em uma variavel
      id,
      task: data.task,
      minutesAmout: data.minutesAmount,
    }
    // setCycles([...cycles, newCycle]) -------------
    // REGRA REACT: Toda vez que to alterando o estado e o mesmo, depende da sua versão anterior é legal ele ser
    // setado em valor de função. (CLOSURES DENTRO DO REACT), então vai ficar:
    setCycles((state) => [...state, newCycle])
    // Quando crio um novo ciclo, vou setar o ciclo recem criado como sendo o meu ciclo ativo.
    // Posso por newCycle.id ou posso criar uma const de chamar de id tirando de dentro do newCycle
    setActiveCycleId(id)

    reset()
  }

  // Para mostrar na tela agora o novo ciclo ativo
  // Essa variavel vai fazer o seguinte, com base no ID do cliclo ativo, vai percorrer todos CICLOS que tenho e me retornar o ciclo que tem o mesmo id
  // do ciclo ativo. Ou seja, vai percorrer o vetor de ciclos ativos e encontrar um cyclo em que o ID do ciclo seja igual ao id do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
