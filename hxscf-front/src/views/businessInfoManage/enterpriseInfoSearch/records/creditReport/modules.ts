import * as api from "@/api/businessInfoManage/enterpriseInfoSearch/records/creditReport";

const state = {
  list: {
    list: [],
  },
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  reportSourceOption: [], //报告来源
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
  saveReportSourceOption(state, response) {
    state.reportSourceOption = response;
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
      .getReportList(params)
      .then((res) => {
        commit("saveList", res);
      })
      .finally(() => commit("saveLoading", false));
  },
  // 字典项-报告来源
  queryDataByDicCode({ commit }, params) {
    api.getDataByDicCode(params).then((res) => {
      commit("saveReportSourceOption", res);
    });
  },
  // 报告详情
  queryDetail({ commit }, params) {
    return api.getCreditReportDetails(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
