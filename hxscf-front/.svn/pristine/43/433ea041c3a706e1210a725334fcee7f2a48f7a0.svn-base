/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-28 15:04:39
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-08 15:05:03
 */

import * as api from "@/api/tradeManage/tradeInfoManage/customRiskCoefficient";
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
  saveSearchData({ commit }, params) {
    commit("saveSearchData", params);
  },
  // 查询客户风险系数记录列表
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api
      .showTradeDetailRisk(params)
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
