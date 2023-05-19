import * as API from "@/api/businessInfoManage/enterpriseInfoManage";
import { renderOrganization } from "@/config/mUtils";

const state = {
  data: {},
  saveSearch: {
    pageNum: 1,
    pageSize: 10,
  },
  isLoading: false,
  orgList: [], // 业务部门,
  personnel: [], // 业务人员,
  tradeList: [], // 所属行业,
};

const mutations = {
  loading(state, payload) {
    state.isLoading = payload;
  },
  data(state, payload) {
    state.data = payload;
  },
  saveSearch(state, payload) {
    state.saveSearch = payload;
  },
  saveOrgList(state, response) {
    state.orgList = response;
  },
  personnel(state, payload) {
    state.personnel = payload;
  },
  tradeList(state, response) {
    state.tradeList = response;
  },
};

const actions = {
  searchFN({ commit }, params) {
    commit("loading", true);
    commit("saveSearch", params);
    API.getList(params)
      .then((res) => {
        commit("data", res);
      })
      .finally(() => commit("loading", false));
  },
  // 根据组织机构查询业务部门
  orgListFN({ commit }, params) {
    API.getOrgListByFlag(params).then((res) => {
      commit("saveOrgList", renderOrganization(res));
    });
  },
  // 所属行业
  tradeListFN({ commit }, params) {
    API.getTradeList(params).then((res) => {
      commit("tradeList", res);
    });
  },
  // 业务人员
  personnelFN({ commit }, params) {
    API.getpersonnel(params).then((res) => {
      commit("personnel", res);
    });
  },
  // 新增或者编辑
  addAndUpFN({ commit }, params) {
    return API.addAndUp(params);
  },
  // 删除
  delFN({ commit }, params) {
    return API.del(params);
  },
  // 资信调查—相应的资信模板
  showCreditTemplateDetail({ commit }, params) {
    return API.showCreditTemplateDetail(params);
  },
  // 资信调查—企业资信信息新增
  addOrUpdateCreditStandFN({ commit }, params) {
    return API.addOrUpdateCreditStand(params);
  },
  // 资信调查-校验
  chectCreditStandFN({ commit }, params) {
    return API.chectCreditStand(params);
  },
  // 资信调查-决策结果
  queryResultDataFN({ commit }, params) {
    return API.decisionResultDatav(params);
  },
  checkEnterpriseLocalFN({ commit }, params) {
    return API.checkEnterpriseLocal(params);
  },
  // 资信调查-提交审核
  queryProcessAudit({ commit }, params) {
    return API.processAudit(params);
  },
  // 资信调查-关联人信息
  queryAffiPersonDetails({ commit }, params) {
    return API.getAffiPersonDetails(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
