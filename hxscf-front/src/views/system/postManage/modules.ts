/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:57:16
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-07 16:32:28
 */

import * as api from "@/api/system/postManage";
import { renderResouce, renderOrganization } from "@/config/mUtils";
const state = {
  roleList: [],
  saveSearch: {},
  loading: false,
};

const mutations = {
  saveList(state, response) {
    state.roleList = response;
  },
  saveSearch(state, response) {
    state.saveSearch = response;
  },

  saveLoading(state, response) {
    state.loading = response;
  },
};

const actions = {
  queryPostList({ commit }, params) {
    commit("saveLoading", true);
    api.PostQueryList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearch", params);
  },

  //新增角色 编辑角色
  addAndUpdatePostFN({ commit }, params) {
    return api.addAndUpdatePost(params);
  },
  //删除角色
  queryDeleteRole({ commit }, params) {
    return api.DeleteRole(params);
  },
  // 部门名称数据
  queryDepartmentName({ commit }, params) {
    return api.getDepartmentName(params);
  },
  // 岗位名称
  queryPostData({ commit }, params) {
    return api.getPostData(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
