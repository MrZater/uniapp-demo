/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-21 11:13:07
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-11-24 15:17:04
 */

import * as api from "@/api/businessCreditManage/creditManageAnalysis";
const state = {
  homeData: {
    creditProgress: {}, // 资信调查进度统计
    messageList: [], // 消息通知
    ceTrendList: [], // 合作企业趋势图
    ceCreditInvestList: [], //合作企业资信调查分布
    ceIndustryList: [], // 合作企业行业分布
  },
  loading: false,
};

const mutations = {
  saveHomeData(state, response) {
    const {
      creditProgress,
      messageList,
      ceTrendList,
      ceIndustryList,
      ceCreditInvestList,
    } = response;

    state.homeData.creditProgress = creditProgress; // 资信调查进度统计
    state.homeData.messageList = messageList; // 消息通知
    state.homeData.ceTrendList = ceTrendList; // 合作企业趋势图
    state.homeData.ceCreditInvestList = ceCreditInvestList; //合作企业资信调查分布
    state.homeData.ceIndustryList = ceIndustryList; // 合作企业行业分布
  },
  saveLoading(state, response) {
    state.loading = response;
  },
};

const actions = {
  getHomeData({ commit }, params) {
    commit("saveLoading", true);
    api.getHomeData(params).then((res) => {
      commit("saveHomeData", res);
      commit("saveLoading", false);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
