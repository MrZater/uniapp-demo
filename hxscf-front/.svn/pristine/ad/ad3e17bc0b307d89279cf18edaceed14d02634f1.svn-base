/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:19:08
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 17:12:09
 * @Description: 
 */
import * as api from "@/api/configManage/tradeDataConfig";

const state = {
    list: {
        list: [],
    },
    searchData: {
        pageNum: 1,
        pageSize: 10,
    },
    loading: false,
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
    // 编辑
    queryUpdate({ commit }, params) {
        return api.update(params);
    },
    // 行业
    queryTradeList({ commit }, params) {
        return api.getTradeList(params)
    },
    // 查询三方获取数据
    queryHisTradeCodeList({ commit }, params) {
        return api.showHisTradeCodeList(params);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
