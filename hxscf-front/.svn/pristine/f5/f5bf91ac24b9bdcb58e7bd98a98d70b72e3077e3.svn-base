/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-15 10:11:57
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-10-21 12:26:08
 */
import * as api from "@/api/home";

const state = {
  data: {
    sysInforList: [],
    toDoList: [],
    auditList: [],
  },
  loading: false,
};

const mutations = {
  saveList(state, response) {
    state.data = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  },
};

const actions = {
  getHomeData({ commit }, params) {
    commit("saveLoading", true);
    api.getList(params).then((res) => {
      commit("saveLoading", false);
      commit("saveList", res);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
