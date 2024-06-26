import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

// interface CountdownProps {
//   activeCycle: any
//   setCycles: any
//   activeCycleId: any
// }

export function Countdown() {
  // Usando o contexto exportado do componente HOME
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // trazendo a setSecondsPassed no lugar do setAmountSecondsPassed() do useState()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          // se o startDate for uma string, vai converter para data. Para resolver o problema do reducer cycles
          // por o new Date em volta
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)

          // COMENTANDO ELA POIS VOU DEIXAR NA HOME E PASSAR COMO CONTEXTO (markCurrentCycleAsFinished)
          //   setCycles((state) =>
          //     state.map((cycle) => {
          //       if (cycle.id === activeCycleId) {
          //         return { ...cycle, finishedDate: new Date() }
          //       } else {
          //         return cycle
          //       }
          //     }),
          //   )
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
    // Como estamos usando eslint toda variavel ou fn que a gente usa, ele obriga a passar como dpeendencia, por isso passo também "markCurrentCycleAsFinished"
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
