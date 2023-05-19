import * as api from "@/api/businessInfoManage/enterpriseInfoSearch/records/creditExten";

const state = {
  list: {
    list: [],
  },
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  businessOption: [], //业务类型
  creditTypeOption: [], //授信方式
  enterpriseNatureOption: [], //企业性质
  dynamicTrackingOption: [], //动态跟踪频次
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
  saveBusinessOption(state, response) {
    state.businessOption = response;
  },
  saveCreditTypeOption(state, response) {
    state.creditTypeOption = response;
  },
  saveEnterpriseNatureOption(state, response) {
    state.enterpriseNatureOption = response;
  },
  saveDynamicTrackingOption(state, response) {
    state.dynamicTrackingOption = response;
  },
};

const actions = {
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  // 查询授信记录
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api
      .getList(params)
      .then((res) => {
        commit("saveList", res);
      })
      .finally(() => commit("saveLoading", false));
  },
  // 字典项
  queryDataByDicCode({ commit }, params) {
    api.getDataByDicCode(params).then((res) => {
      if (params.dicCode === "businessType") {
        commit("saveBusinessOption", res);
      }
      if (params.dicCode === "creditType") {
        commit("saveCreditTypeOption", res);
      }
      if (params.dicCode === "enterpriseNature") {
        commit("saveEnterpriseNatureOption", res);
      }
      if (params.dicCode === "dynamicTracking") {
        commit("saveDynamicTrackingOption", res);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
