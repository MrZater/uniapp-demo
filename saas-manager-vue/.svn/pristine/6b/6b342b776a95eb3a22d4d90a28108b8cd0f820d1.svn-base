import user from './user'

const role = user

const state = {
  allowOperate: role == 'MANAGEMENT'
    ? false : role == 'BUSINESS_DIRECTOR'
      ? false : role != 'OPERATOR_DIRECTOR',
  allowDownload: role == 'MANAGEMENT'
    ? false : role == 'BUSINESS_DIRECTOR'
      ? false : role != 'OPERATOR_DIRECTOR'
}

const mutations = {
  changeAllowOperate(state, role) {
    state.allowOperate = 'MANAGEMENT'
      ? false : role == 'BUSINESS_DIRECTOR'
        ? false : role != 'OPERATOR_DIRECTOR'
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
