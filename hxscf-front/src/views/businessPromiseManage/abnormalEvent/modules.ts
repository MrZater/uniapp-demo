/*
 * @Author: mingliang.zhu
 * @Date: 2021-03-03 16:11:09
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-03-03 19:07:14
 */

import * as api from "@/api/businessPromiseManage/abnormalEvent";
const state = {
  messageList: [],
  saveSearch: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  statusOption: [], //状态
  companyList: [], //企业列表
  eventTypeOption: [], //通知类型
  orgInfo: {}, //组织名称
};

const mutations = {
  saveList(state, response) {
    state.messageList = response;
  },
  saveSearch(state, response) {
    state.saveSearch = response;
  },

  saveLoading(state, response) {
    state.loading = response;
  },
  saveStatusOption(state, response) {
    state.statusOption = response;
  },
  saveCompanyList(state, response) {
    state.companyList = response;
  },
  saveEventOption(state, response) {
    state.eventTypeOption = response;
  },
  saveOrg(state, response) {
    state.orgInfo = response;
  },
};

const actions = {
  queryEventList({ commit }, params) {
    commit("saveLoading", true);
    api.getEventList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearch", params);
  },

  queryAdd({ commit }, params) {
    return api.add(params);
  },
  queryCurrentOrg({ commit }, params) {
    api.org(params).then((res) => {
      commit("saveOrg", res);
    });
  },
  queryDetail({ commit }, params) {
    return api.detail(params);
  },
  queryCompanyList({ commit }, params) {
    api.company(params).then((res) => {
      commit("saveCompanyList", res instanceof Array ? res : []);
    });
  },
  queryAddTrack({ commit }, params) {
    return api.addTrack(params);
  },
  queryCloseTrack({ commit }, params) {
    return api.closeTrack(params);
  },
  queryDataByDicCode({ commit }, params) {
    api.getDataByDicCode(params).then((res) => {
      if (params.dicCode === "abnormalEventType") {
        commit("saveEventOption", res);
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
