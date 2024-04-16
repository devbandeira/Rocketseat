import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5)
    .max(60, 'O ciclo precisa ser de no máximo 60 min'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmout: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Criando novo estado para contagem em segundos, vai armazenar o tanto de minutos ja passado desde que o ciclo foi ativo
  const [amountSecondsPassed, setamountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])

    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // console.log(activeCycle)

  // Criando uma variavel que vai converter o numero de minutos em segundos, lembrando que
  // devo ter o ciclo ativo ou não, então se tiver o ciclo ativoessa variavel vai ser o numero de minutos possivel * 60
  // se eu não tiver ciclo ativo será 0.
  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // agora que tenho o numero total de segundos e o tempo que passou, preciso converter para exibir em tela
  // Math.floor para arredondar para baixo, devido poder dar numero quebrado 1500 seg e 1499 seg / 60
  const minutesAmout = Math.floor(currentSeconds / 60)
  // Calculando quantos segundos me restam após os minutos
  const secondsAmount = currentSeconds % 60

  // Manipulando para mostrar meu contador em tela, pois em alguns casos, ele pode ter menos de 2 numeros e ser 9min da mesma
  // forma que pode ser 19 min, então quero mostrar o 0 na frente, caso seja menor que 10
  // Converto para String para usar o padStart() que é um método que preenche uma string caso ela não tenha aquele tamanho ainda, com um caractere.
  const minutes = String(minutesAmout).padStart(2, '0') // Quero que meu padStart tenha 2 caracteres, caso não tenha preenche com zero o inicio
  const seconds = String(secondsAmount).padStart(2, '0')
  // Agora só ir nos span e passar elas em forma de função JS, como tenho uma string, eu posso passar a posição minutes[0...] posso trabalhar com strings como fossem vetores

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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          {/* posso trabalhar com strings como fossem vetores */}
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[1]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
