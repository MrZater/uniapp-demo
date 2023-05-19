import * as api from "@/api/businessCreditManage/enterpriseCreditManage";
import { renderOrganization } from "@/config/mUtils";

const state = {
  list: {},
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  orgList: [], // 业务部门,
  recordList: [], // 操作日志,
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
  saveRecordList(state, response) {
    state.recordList = response;
  },
};

const actions = {
  // 获取列表
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.showCreditStandList(params).then((res) => {
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
    return api.deleteCreditStand(params);
  },

  // 预览
  queryPreview({ commit }, params) {
    return api.getPreview(params);
  },

  // 详情
  getDetailFN({ commit }, params) {
    return api.showEnterpriseDetails(params);
  },

  // 操作日志
  queryRecordList({ commit }, params) {
    api.showOperationRecordList(params).then((res) => {
      commit("saveRecordList", res);
    });
  },

  // 撤回
  queryRevoke({ commit }, params) {
    return api.revoke(params);
  },

  // 委托
  queryConsign({ commit }, params) {
    return api.consign(params);
  },

  // 加签
  queryEndorsement({ commit }, params) {
    return api.endorsement(params);
  },

  // 通过
  queryPass({ commit }, params) {
    return api.adopt(params);
  },

  // 退回
  queryRollback({ commit }, params) {
    return api.rollback(params);
  },
  // 拒绝
  queryReject({ commit }, params) {
    return api.reject(params);
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
