/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-29 09:17:30
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-12-29 18:47:21
 */

import * as api from "@/api/configManage/staffMatrix";

const state = {
  list: [],
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  deptTree: [],
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
  saveDeptTree(state, response) {
    state.deptTree = response;
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
    commit("saveSearchData", params);
  },

  //部门树
  queryDeptTree({ commit }, params) {
    api.getDeptTree(params).then((res) => {
      commit("saveDeptTree", res);
    });
  },
  //用户树
  queryUserTree({ commit }, params) {
    return api.getUserTree(params);
  },
  // 人员矩阵配置-新建
  queryAdd({ commit }, params) {
    return api.save(params);
  },
  // 人员矩阵配置-编辑
  queryEdit({ commit }, params) {
    return api.update(params);
  },
  // 人员矩阵配置-详情
  queryDetail({ commit }, params) {
    return api.details(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
