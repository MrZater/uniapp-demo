/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-28 15:04:39
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-08 16:44:59
 */

import * as api from "@/api/tradeManage/tradeInfoManage";
const state = {
  tradeList: [],
  list: {
    list: [],
  },
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  riskId: "",
  creditedBizList: [],
};

const mutations = {
  saveTradeList(state, response) {
    state.tradeList = response;
  },
  saveList(state, response) {
    state.list = response;
  },
  saveSearchData(state, response) {
    state.searchData = response;
  },
  saveLoading(state, response) {
    state.loading = response;
  },
  saveRiskId(state, response) {
    state.riskId = response;
  },
  saveCreditedBizList(state, response) {
    state.creditedBizList = response;
  },
};

const actions = {
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },
  // 获取行业名称
  queryTradeList({ commit }, params) {
    api.getTradeList(params).then((res) => {
      commit("saveTradeList", res);
    });
  },
  // 查询
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api
      .getTradeInfoList(params)
      .then((res) => {
        commit("saveList", res);
      })
      .finally(() => commit("saveLoading", false));
  },

  //删除
  queryDeleteTrade({ commit }, params) {
    return api.deleteTrade(params);
  },
  //新增/编辑
  queryAddOrUpdate({ commit }, params) {
    return api.addAndUpdateTradeInfo(params);
  },
  /* 创建客户风险系数 start */

  // 校验是否可以创建客户风险系数
  queryCheck({ commit }, params) {
    return api.check(params);
  },
  // 查看行业基础数据（客户风险系数详情）
  queryRiskTradeBase({ commit }, params) {
    return api.showRiskTradeBase(params);
  },
  // 查看行业基础数据（行业详情）
  queryTradeDetailBase({ commit }, params) {
    return api.showTradeDetailBase(params);
  },
  // 第一页保存/下一步
  addAndUpdateRiskTradeBase({ commit }, params) {
    return api.addAndUpdateRiskTradeBase(params);
  },
  //行业信息模板
  showTradeTemplateDetail({ commit }, params) {
    return api.showTradeTemplateDetail(params);
  },
  // 第二页保存/下一步
  addAndUpdateTradsurvey({ commit }, params) {
    return api.addAndUpdateTradsurvey(params);
  },
  // 行业评级信息
  showTradeRating({ commit }, params) {
    return api.showTradeRating(params);
  },
  // 客户风险系数
  showCustomerRiskDetail({ commit }, params) {
    return api.showCustomerRiskDetail(params);
  },
  // 历史 客户风险系数 和 行业评级
  showHisCustomerDetail({ commit }, params) {
    return api.showHisCustomerDetail(params);
  },
  // 第三页保存/下一步
  addAndUpdateCustomerRisk({ commit }, params) {
    return api.addAndUpdateCustomerRisk(params);
  },

  /* 创建客户风险系数 end */

  /* 维护头部企业 start */
  // 头部企业列表
  showLeadingbizList({ commit }, params) {
    return api.showLeadingbizList(params);
  },
  // 头部企业下拉框
  showCreditedBizList({ commit }, params) {
    api.showCreditedBizList(params).then((res) => {
      commit("saveCreditedBizList", res);
    });
  },
  // 头部企业信用信息
  showCreditInfo({ commit }, params) {
    return api.showCreditInfo(params);
  },

  // 新增头部企业
  addLeadingbiz({ commit }, params) {
    return api.addLeadingbiz(params);
  },

  /* 维护头部企业 end */
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
