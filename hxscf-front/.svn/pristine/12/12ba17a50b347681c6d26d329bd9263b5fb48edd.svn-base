/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:57:16
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-12-18 15:43:10
 */

import * as api from "@/api/configManage/configManage";
import { renderOrganization } from "@/config/mUtils";
const state = {
  orgNameList: [],
};

const mutations = {
  saveOrgName(state, response) {
    state.orgNameList = response;
  },
};

const actions = {
  // 组织名称数据
  queryOrgNameList({ commit }, params) {
    if (state.orgNameList && state.orgNameList.length === 0) {
      api.getOrgName(params).then((res) => {
        commit("saveOrgName", renderOrganization(res));
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
