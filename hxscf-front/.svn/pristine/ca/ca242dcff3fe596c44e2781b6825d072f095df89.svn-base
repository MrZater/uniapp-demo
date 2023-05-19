/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 10:59:54
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-09-22 15:07:33
 */

import * as api from "@/api/loginAPI";
const state = {};
const mutations = {};
const actions = {
  //登录
  queryLogin({ commit }, params) {
    return api.loginFN(params);
  },
  //退出登录
  queryLogout({ commit }, params) {
    return api.logoutFN(params);
  },
  //首次登录修改密码
  queryReplace({ commit }, params) {
    return api.replacePassword(params);
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
