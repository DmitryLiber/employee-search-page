import { generateRandomValue } from '@shared/utils'
import { type IMsg } from '@shared/model'

interface IState {
  msgList: IMsg[]
}

const state = <IState>{
  msgList: <IMsg[]>[]
}

const actions = {
  add({ commit, state } = {} as { commit: any; state: IState }, { text, status }: IMsg) {
    const idMsg = generateRandomValue()

    commit('add', { text, status, id: idMsg } as IMsg)

    // setTimeout(() => {
    //   state.msgList.splice(
    //     state.msgList.findIndex((msg) => msg.id === idMsg),
    //     1
    //   )

    //   console.log(object);

    // }, 4000)
  }
}

const mutations = {
  add(state = {} as IState, msg: IMsg) {
    state.msgList.push(msg)
  }
  // remove(state = {} as IState, id: number) {
  //   state.msgList = state.msgList.filter((msg) => msg.id !== id)
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
