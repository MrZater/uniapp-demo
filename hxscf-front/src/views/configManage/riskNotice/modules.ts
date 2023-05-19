/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:57:16
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-26 11:48:24
 */

import * as api from "@/api/configManage/riskNotice";
import { renderOrganization } from "@/config/mUtils";
const state = {
  roleList: {},
  orgList: [],
  loading: false,
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  treeLoading: false,
};

const mutations = {
  saveList(state, response) {
    state.roleList = response;
  },
  saveOrgList(state, response) {
    state.orgList = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  },
  saveSearchData(state, response) {
    state.searchData = response;
  },
  saveTreeLoading(state, response) {
    state.treeLoading = response;
  },
};

const actions = {
  queryNoticeList({ commit }, params) {
    commit("saveLoading", true);
    api.queryList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  //获取机构列表
  queryOrgList({ commit }, params) {
    commit("saveTreeLoading", true);
    api
      .allOrganization(params)
      .then((res) => {
        commit("saveOrgList", renderOrganization(res));
      })
      .finally(() => commit("saveTreeLoading", false));
  },
  // 风险类型列表
  queryRiskTypeList({ commit }, params) {
    return api.typeList(params);
  },
  //新增、编辑
  queryAddAndUpdate({ commit }, params) {
    return api.addAndUpdate(params);
  },
  //详情
  queryDetail({ commit }, params) {
    return api.detail(params);
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
