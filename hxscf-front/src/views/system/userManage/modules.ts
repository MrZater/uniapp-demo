/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-21 14:47:16
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-08 18:46:08
 */

import * as api from "@/api/system/userManage";

const state = {
  list: [],
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  userPostData: [],
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
  saveUserPost(state, response) {
    state.userPostData = response;
  },
};

const actions = {
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getUserList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  //重置密码
  queryResetPwd({ commit }, params) {
    return api.UserResetPwd(params);
  },
  // 启停用
  queryStartOrStop({ commit }, params) {
    return api.StartOrStop(params);
  },
  //删除用户
  queryDeleteUser({ commit }, params) {
    return api.deleteUser(params);
  },
  //新增用户
  queryAddUser({ commit }, params) {
    return api.UserAdd(params);
  },
  //用户岗位
  queryPostList({ commit }, params) {
    api.userPost(params).then((res) => {
      commit("saveUserPost", res);
    });
  },
  //编辑用户
  queryUpdateUser({ commit }, params) {
    return api.UserUpdate(params);
  },
  // 详情保存
  detailSave({ commit }, params) {
    return api.userDetailSave(params);
  },

  //获取详情数据
  queryDetail({ commit }, params) {
    return api.showUserDetail(params);
  },

  //获取组织名称
  queryOrgNameList({ commit }, params) {
    return api.getOrgName(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
