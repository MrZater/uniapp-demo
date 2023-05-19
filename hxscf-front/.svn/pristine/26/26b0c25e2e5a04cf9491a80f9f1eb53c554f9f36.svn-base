import * as api from "@/api/businessInfoManage/enterpriseInfoSearch";

const state = {
  isLoading: false,
  saveSearch: {},
  data: {
    list: [],
  },
};

const mutations = {
  saveLoading(state, response) {
    state.isLoading = response;
  },
  saveList(state, response) {
    state.data = response;
  },
  saveSearch(state, response) {
    state.saveSearch = response;
  },
};

const actions = {
  /* 企业信息-模糊查询 */
  getFuzzyListFN({ commit }, params) {
    return api.getFuzzyData(params);
  },
  /* 企业信息-列表查询 */
  getListFN({ commit }, params) {
    /* 如果pageNum 大于等于 4，则清空数据，终止请求 */
    commit("saveLoading", true);
    if (params.pageNum >= 4) {
      setTimeout(() => {
        commit("saveList", { list: [] });
        commit("saveLoading", false);
      }, 500);
      return;
    }
    api
      .getData(params)
      .then((res) => {
        commit("saveList", res);
      })
      .finally(() => commit("saveLoading", false));
  },
  /* 企业信息-重置列表 */
  resetListFN({ commit }) {
    commit("saveList", []);
  },
  /* 企业信息-缓存检索条件 */
  saveSearchFN({ commit }, params) {
    commit("saveSearch", params);
  },
  /*********************************************已创建 start *************************************/

  /* 企业信息详情-基本信息*/
  getBaseInfoFN({ commit }, params) {
    return api.getBaseInfo(params);
  },
  /* 企业信息详情-经营信息 */
  getBusinessInfoFN({ commit }, params) {
    return api.getBusinessInfo(params);
  },
  /* 企业信息详情-经营不良 */
  getBusinessBadFN({ commit }, params) {
    return api.getBusinessBad(params);
  },
  /* 企业信息详情-司法信息 */
  getJudicialInfoFN({ commit }, params) {
    return api.getJudicialInfo(params);
  },
  /* 企业信息详情-法代信息 */
  getNormalBandFN({ commit }, params) {
    return api.getNormalBand(params);
  },
  /*********************************************已创建 end *************************************/

  /*********************************************未创建 start *************************************/
  /* 企业信息详情-基本信息*/
  getBaseInfoUnCreatedFN({ commit }, params) {
    return api.getBaseInfoUnCreated(params);
  },
  /* 企业信息详情-经营信息 */
  getBusinessInfoUnCreatedFN({ commit }, params) {
    return api.getBusinessInfoUnCreated(params);
  },
  /* 企业信息详情-经营不良 */
  getBusinessBadUnCreatedFN({ commit }, params) {
    return api.getBusinessBadUnCreated(params);
  },
  /* 企业信息详情-司法信息 */
  getJudicialInfoUnCreatedFN({ commit }, params) {
    return api.getJudicialInfoUnCreated(params);
  },
  /* 企业信息详情-获取高管信息 */
  getNormalBandUnCreatedFN({ commit }, params) {
    api.getExecutivesInfo(params).then((res) => {
      commit("saveNormalBandInfoDetail", res);
    });
  },
  /*********************************************未创建 end *************************************/

  /* 已创建-关联公司 dialog */
  associatedFN({ commit }, params) {
    return api.getAssociated(params);
  },
  /* 未创建-关联公司 dialog */
  associatedUnCreatedFN({ commit }, params) {
    return api.getRelationEnterprise(params);
  },
  /* 未创建-保存高管信息 （已废弃） */
  // saveExecutiveFN({ commit }, params) {
  //   return api.saveExecutivesInfo(params);
  // },
  /* 已创建-保存高管信息 */
  updateEmployeesInfo({ commit }, params) {
    return api.updateEmployeesInfo(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
