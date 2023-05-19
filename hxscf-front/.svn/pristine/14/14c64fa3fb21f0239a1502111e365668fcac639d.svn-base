/*
 * @Author: mingliang.zhu
 * @Date: 2021-02-22 09:39:22
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 16:43:33
 */

import * as api from "@/api/system/noticeManage";
const state = {
  messageList: [],
  saveSearch: {},
  loading: false,
  statusOption: [], //状态
  noticeTypeOption: [], //通知类型
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
  saveNoticeTypeOption(state, response) {
    state.noticeTypeOption = response;
  },
};

const actions = {
  queryNoticeList({ commit }, params) {
    commit("saveLoading", true);
    api.getNoticeList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearch", params);
  },

  addNoticeFN({ commit }, params) {
    return api.addNotice(params);
  },
  detailNoticeFN({ commit }, params) {
    return api.detailNotice(params);
  },
  queryNoticeUserList({ commit }, params) {
    return api.findByUserCodeList(params);
  },
  queryDataByDicCode({ commit }, params) {
    api.getDataByDicCode(params).then((res) => {
      if (params.dicCode === "noticeType") {
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
