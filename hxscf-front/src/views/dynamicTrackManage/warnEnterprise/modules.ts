import * as api from "@/api/dynamicTrackManage/warnEnterprise.ts";
import { renderOrganization } from "@/config/mUtils";

const state = {
  list: {},
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  orgList: [], // 业务部门,
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
  saveOrgList(state, response) {
    state.orgList = response;
  },
};

const actions = {
  // 获取列表
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  // 缓存查询条件
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },

  //删除
  queryDeleteFN({ commit }, params) {
    return api.queryDelete(params);
  },

  // 新增、编辑
  queryAddOrUpdate({ commit }, params) {
    return api.addOrUpdate(params);
  },

  // 启停用
  queryStartOrStop({ commit }, params) {
    return api.startOrStop(params);
  },

  // 根据组织机构查询业务部门
  orgListFN({ commit }, params) {
    api.getOrgListByFlag(params).then((res) => {
      commit("saveOrgList", renderOrganization(res));
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
