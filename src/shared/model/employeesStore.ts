import { LIMIT_PAGE_EMPLOYEES } from '@shared/config'
import { type IEmployee } from '@shared/model'
import { client } from '@shared/api'
import { isDigit } from '@shared/utils'

interface IState {
  employees: IEmployee[]
  currentPage: number
  isSearchingEmployees: boolean
  isDisabledLazyLoading: boolean
}

const state = <IState>{
  employees: [],
  currentPage: 0,
  isSearchingEmployees: false,
  isDisabledLazyLoading: false
}

const actions = {
  searchingEmployees(
    { commit, state } = {} as { commit: any; state: IState },
    [searchingValue = '', onError = () => {}] = [] as unknown as [string, void]
  ) {
    commit('setIsSearchingEmployees', true)
    commit('setNextPage')

    const searchParams = searchingValue
      .split(',')
      .map((item) => {
        const value = item.trim()
        if (value === '') return ''
        return isDigit(value) ? `id=${value}` : `name=${value}`
      })
      .join('&')

    const onSuccess = (response: any) => {
      commit('addEmployees', response)

      if (response.length === 0) commit('setIsDisabledLazyLoading', true)
    }

    const onFinally = () => {
      commit('setIsSearchingEmployees', false)
    }

    client.get(
      `/users?_limit=${LIMIT_PAGE_EMPLOYEES}&_page=${state.currentPage}&${searchParams}`,
      onSuccess,
      onError,
      onFinally
    )
  }
}

const mutations = {
  addEmployees(state = {} as IState, newEmployees = [] as IEmployee[]) {
    state.employees = [...state.employees, ...newEmployees]
  },
  resetEmployees(state = {} as IState) {
    state.employees = []
    state.currentPage = 0
    state.isDisabledLazyLoading = false
    state.isSearchingEmployees = false
  },
  setIsSearchingEmployees(state = {} as IState, isSearching: boolean) {
    state.isSearchingEmployees = isSearching
  },
  setIsDisabledLazyLoading(state = {} as IState, isDisabled: boolean) {
    state.isDisabledLazyLoading = isDisabled
  },
  setNextPage(state = {} as IState) {
    state.currentPage += 1
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
