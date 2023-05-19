import * as api from "@/api/businessPromiseManage/limit/general";

const state = {
  list: {},
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  baseInfo: {}, //基础数据
  businessOption: [], //业务类型
  creditTypeOption: [], //授信方式
  enterpriseNatureOption: [], //企业性质
  dynamicTrackingOption: [], //动态跟踪频次
  orgOption: [], //保证机构
  businessNameOption: [], //企业名称
  mortgageeOptions: [], //授信方式：抵押权人
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
  saveBaseInfo(state, response) {
    state.baseInfo = response;
  },
  saveBusinessOption(state, response) {
    state.businessOption = response;
  },
  saveCreditTypeOption(state, response) {
    state.creditTypeOption = response;
  },
  saveEnterpriseNatureOption(state, response) {
    state.enterpriseNatureOption = response;
  },
  saveDynamicTrackingOption(state, response) {
    state.dynamicTrackingOption = response;
  },
  saveMortgageeOptions(state, response) {
    state.mortgageeOptions = response;
  },
  saveOrgOption(state, response) {
    state.orgOption = response;
  },
  saveBusinessNameOption(state, response) {
    state.businessNameOption = response;
  },
};

const actions = {
  // 获取列表
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getCreditInfoByPage(params).then((res) => {
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
    return api.deleteCreditInfo(params);
  },
  // 保存/编辑
  addAndUpdateCreditInfo({ commit }, params) {
    return api.addAndUpdateCreditInfo(params);
  },
  queryBaseInfo({ commit }, params) {
    api.getBaseInfo(params).then((res) => {
      commit("saveBaseInfo", res);
    });
  },
  //详情
  queryDetail({ commit }, params) {
    return api.getCreditInfoDetail(params);
  },
  // 字典项
  queryDataByDicCode({ commit }, params) {
    api.getDataByDicCode(params).then((res) => {
      if (params.dicCode === "businessType") {
        commit("saveBusinessOption", res);
      }
      if (params.dicCode === "creditType") {
        commit("saveCreditTypeOption", res);
      }
      if (params.dicCode === "enterpriseNature") {
        commit("saveEnterpriseNatureOption", res);
      }
      if (params.dicCode === "dynamicTracking") {
        commit("saveDynamicTrackingOption", res);
      }
    });
  },
  //获取组织名称
  queryOrgNameList({ commit }, params) {
    api.getOrgName(params).then((res) => {
      commit("saveMortgageeOptions", res);
    });
  },
  // 授信方式：保证机构下拉框、关联企业：企业名称下拉框
  queryCreditedBiz({ commit }, params) {
    api.getCreditedBiz(params).then((res) => {
      if (params.flag === "01") {
        commit("saveOrgOption", res);
      }
      if (params.flag === "02") {
        commit("saveBusinessNameOption", res);
      }
    });
  },
  // 默认业务开展组织
  queryLoginUserOrg({ commit }, params) {
    return api.getLoginUserOrg(params);
  },
  // 年审
  queryYearAudit({ commit }, params) {
    return api.getYearAudit(params);
  },
  // 变更信息
  querychangeInfo({ commit }, params) {
    return api.getChangeInfo(params);
  },
  // 修改变更信息
  queryUpdateChangeInfo({ commit }, params) {
    return api.updateChangeInfo(params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
