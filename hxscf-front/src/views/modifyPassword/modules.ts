import { updatePassword } from "@/api/loginAPI";
const state = {};
const mutations = {};
const actions = {
  queryModify({ commit }, params) {
    return updatePassword(params);
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
