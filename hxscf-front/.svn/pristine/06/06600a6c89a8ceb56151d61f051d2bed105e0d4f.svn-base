import * as api from "@/api/tradeManage/customRiskCoefficient";

const state = {
  list: {
    list: [],
  },
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  tradeList: [],
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
  saveTradeList(state, response) {
    state.tradeList = response;
  },
};

const actions = {
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  // 行业名称下拉框
  getTradeList({ commit }, params) {
    api.getTradeList(params).then((res) => {
      commit("saveTradeList", res);
    });
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

  //删除
  queryDelete({ commit }, params) {
    return api.deleteRisk(params);
  },
  // 启用
  queryStart({ commit }, params) {
    return api.start(params);
  },
  // 停用
  queryStop({ commit }, params) {
    return api.stop(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
