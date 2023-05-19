import * as api from "@/api/system/dictionaryManage";

const state = {
  list: {
    list: [],
  },
  searchData: {
    pageNum: 1,
    pageSize: 10,
  },
  loading: false,
  userPostData: [],
  /** 编辑列表* */
  editList: {
    list: [],
  },
  editLoading: false,
  searchEditData: {
    pageNum: 1,
    pageSize: 10,
  },
  /** 编辑列表* */
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
  saveUserPost(state, response) {
    state.userPostData = response;
  },
  /* 编辑列表*/
  saveEditList(state, response) {
    state.editList = response;
  },
  saveEditLoading(state, response) {
    state.editLoading = response;
  },
  saveEditSearchData(state, response) {
    state.searchEditData = response;
  },
  /* 编辑列表*/
};

const actions = {
  queryList({ commit }, params) {
    commit("saveLoading", true);
    api.getDictionaryList(params).then((res) => {
      commit("saveList", res);
      commit("saveLoading", false);
    });
  },
  saveSearchDataFN({ commit }, params) {
    commit("saveSearchData", params);
  },

  //删除
  queryDeleteUser({ commit }, params) {
    return api.deleteDictionary(params);
  },
  //新增
  queryAddUser({ commit }, params) {
    return api.DictionaryAdd(params);
  },
  //编辑
  queryUpdateUser({ commit }, params) {
    return api.DictionaryUpdate(params);
  },
  /* 编辑列表*/
  editListFN({ commit }, params) {
    commit("saveEditLoading", true);
    api.optionList(params).then((res) => {
      commit("saveEditList", res);
      commit("saveEditLoading", false);
    });
  },

  saveEditSearchDataFN({ commit }, params) {
    commit("saveEditSearchData", params);
  },
  //新增
  editAddFN({ commit }, params) {
    return api.optionAdd(params);
  },
  //编辑
  editUpdateFN({ commit }, params) {
    return api.optionUpdate(params);
  },
  /* 编辑列表*/
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
