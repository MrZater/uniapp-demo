import * as api from "@/api/configManage/limitMultiplier";

const state = {
  list: {
    list: [],
  },
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  canDelegateList: [], // 委托
  canEndorserList: [], // 加签
  canRolledBackList: [], // 退回
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
  saveCanDelegateList(state, response) {
    state.canDelegateList = response;
  },
  saveCanEndorserList(state, response) {
    state.canEndorserList = response;
  },
  saveCanRolledBackList(state, response) {
    state.canRolledBackList = response;
  },
};

const actions = {
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  // 查询
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api
      .getList(params)
      .then((res) => {
        commit("saveList", res);
      })
      .finally(() => commit("saveLoading", false));
  },

  //删除
  queryDelete({ commit }, params) {
    return api.deleteLimit(params);
  },
  //新增/编辑
  queryAddOrUpdate({ commit }, params) {
    return api.addAndUpdateLimit(params);
  },
  // 详情
  queryDetail({ commit }, params) {
    return api.showDetails(params);
  },
  // 启用
  queryStart({ commit }, params) {
    return api.start(params);
  },
  // 停用
  queryStop({ commit }, params) {
    return api.stop(params);
  },
  // 撤回
  queryRevoke({ commit }, params) {
    return api.revoke(params);
  },
  // 校验是否有点击流程按钮的权限
  queryDisplayControl({ commit }, params) {
    return api.processDisplayControl(params);
  },
  // 查询可以委托人列表
  queryCanDelegateList({ commit }, params) {
    api.showCanDelegateList(params).then((res) => {
      commit("saveCanDelegateList", res);
    });
  },
  // 委托
  queryConsign({ commit }, params) {
    return api.consign(params);
  },
  // 查询可以加签人列表
  queryCanEndorserList({ commit }, params) {
    api.showCanEndorserList(params).then((res) => {
      commit("saveCanEndorserList", res);
    });
  },
  // 加签
  queryEndorsement({ commit }, params) {
    return api.endorsement(params);
  },
  // 通过
  queryPass({ commit }, params) {
    return api.adopt(params);
  },
  // 查询可退回列表
  queryCanRolledBackList({ commit }, params) {
    api.showCanRolledBackList(params).then((res) => {
      commit("saveCanRolledBackList", res instanceof Array ? res : []);
    });
  },
  // 退回
  queryRollback({ commit }, params) {
    return api.rollback(params);
  },
  // 拒绝
  queryReject({ commit }, params) {
    return api.reject(params);
  },
  // 操作日志
  queryRecordList({ commit }, params) {
    return api.showOperationRecordList(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
