/*
 * @Author: xiaoyu.ren
 * @Date: 2019-06-14 17:15:20
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:42:50
 * @Description: 公共接口查询
 */

const state = {
  needTags: true, //是否展示多页签
  fixedHeader: true, //是否固定头部
  tags: [], //已打开的tags
};

const mutations = {
  saveNeedTag(state, response) {
    state.needTags = response;
  },
  saveFixedHeader(state, response) {
    state.fixedHeader = response;
  },
  saveOpenTags(state, response) {
    state.tags = response;
  }
};

const actions = {
  //是否开启多页签模式
  changeNeedTags({ commit }, params) {
    commit("saveNeedTag", params);
  },
  changeFixedHeader({ commit }, params) {
    commit("saveFixedHeader", params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
