import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// Vou criar essa interface, que será o tipo do estado que vou salvar dentro do reducer
// e passo ele para o Reducer
interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // **********************
      // Ex para o immer -> Quando queremos criar um novo ciclo, copiar todos ciclos existentes e alterar o novo ciclo no final [..state.cycles, action.payload.newCycle]
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }

      // Com o immer vamos fazer o seguinte
      // Informação que quero mudar, no primeiro parametro e no segundo uma variavel (draft que é o rascunho onde faço as alterações que desjeso)
      // ele tem o mesmo formato que o nosso start, tem as mesmas variáveis que tenho no meu state. A diferená é que trabalho com ele como se fosse uma
      // estrutura mutável.
      return produce(state, (draft) => {
        // Para add algo dentro do state, basta eu fazer, e push() era um método que não iriamos utilizar por ser um método
        // que não respeita a imutabilidade
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    // **********************
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),

      //   activeCycleId: null,
      // }

      // Com o immer
      // Achando o index no array de ciclos o ciclo ativo atualmente
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      // retornar o estado sem nenhuma alteração, pois se não encontrar ativo vai retornar -1, ou seja, tentando mudar algo que nem tenho ativo
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }
    default:
      return state
  }
}
