import * as api from "@/api/businessInfoManage/enterpriseInfoSearch/records/creditStand";

const state = {
  list: {
    list: [],
  },
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
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  // 查询
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api
      .getList(params)
      .then((res) => {
        commit("saveList", res);
      })
      .finally(() => commit("saveLoading", false));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
