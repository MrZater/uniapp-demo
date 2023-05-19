import { start } from "./../../../api/configManage/limitMultiplier/index";
/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:57:16
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-07 10:07:51
 */

import * as api from "@/api/system/roleManage";
import { renderResouce } from "@/config/mUtils";
import axios from "@/utils/axios";
const state = {
  roleList: {},
  allResourceList: [], //权限中可操作的菜单
  loading: false,
  treeLoading: false,
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  roleAllData: [],
};

const mutations = {
  saveList(state, response) {
    state.roleList = response;
  },
  saveAllResourceList(state, response) {
    state.allResourceList = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  },
  saveTreeLoading(state, response) {
    state.treeLoading = response;
  },
  saveSearchData(state, response) {
    state.searchData = response;
  },
  saveRoleList(state, response) {
    state.roleAllData = response;
  },
};

const actions = {
  queryRoleList({ commit }, params) {
    commit("saveLoading", true);
    api.RoleQueryList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  //根据角色获取权限树
  queryResourceTreeList({ commit }, params) {
    commit("saveTreeLoading", true);
    api.authorityList(params).then((res) => {
      commit("saveAllResourceList", renderResouce(res));
      commit("saveTreeLoading", false);
    });
  },
  //获取全部
  queryAllResource({ commit }, params) {
    return api.roleMenu(params);
  },
  //新增、编辑
  queryAddAndUpdate({ commit }, params) {
    return api.addAndUpdate(params);
  },
  //删除角色
  queryDeleteRole({ commit }, params) {
    return api.DeleteRole(params);
  },
  // 部门权限数据--选中的
  queryCheckedOrg({ commit }, params) {
    return api.departmentAuthorityList(params);
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  queryRoleDataFN({ commit }, params) {
    api.getRoleList(params).then((res) => {
      commit("saveRoleList", res);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
