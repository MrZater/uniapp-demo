/*
 * @Author: mingliang.zhu
 * @Date: 2021-02-22 09:39:22
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-03-01 10:55:24
 */

import * as api from "@/api/home/noticeMessage";
const state = {
  list: [],
  saveSearch: {},
  loading: false,
  noticeTypeOption: [], //通知类型
};

const mutations = {
  saveList(state, response) {
    state.list = response;
  },
  saveSearch(state, response) {
    state.saveSearch = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  },
  saveNoticeTypeOption(state, response) {
    state.noticeTypeOption = response;
  },
};

const actions = {
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearch", params);
  },
  resetToRead({ commit }, params) {
    return api.resetToRead(params);
  },
  queryDataByDicCode({ commit }, params) {
    api.getDataByDicCode(params).then((res) => {
      if (params.dicCode === "messageNoticeType") {
        commit("saveNoticeTypeOption", res);
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
