import * as api from "@/api/system/logManage";

const state = {
  list: {},
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
};

const mutations = {
  saveList(state, response) {
    state.list = response;
  },
  saveSearchData(state, response) {
    state.searchData = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  },
};

const actions = {
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getLogList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },

  //删除
  queryDeleteUser({ commit }, params) {
    return api.deleteLog(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
