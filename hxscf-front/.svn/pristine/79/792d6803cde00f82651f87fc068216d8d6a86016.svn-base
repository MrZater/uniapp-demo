import * as api from "@/api/configManage/templateConfigManage/creditTemplate";

const state = {
    tradeList: [],
    list: {
        list: [],
    },
    specialList: {
        list: [],
    },
    searchData: {
        // modelType: "02", // 模块类型
        pageNum: 1,
        pageSize: 10,
    },
    loading: false,
    canDelegateList: [], // 委托
    canEndorserList: [], // 加签
    canRolledBackList: [], // 退回
    industlist: { list: [] }, // 行业调查
};

const mutations = {
    saveTradeList(state, response) {
        state.tradeList = response;
    },
    saveList(state, response) {
        state.list = response;
    },
    saveIndustryList(state, response) {
        state.industlist = response;
    },
    saveSpecialList(state, response) {
        state.specialList = response;
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
    // 获取行业名称
    queryTradeList({ commit }, params) {
        if (state.tradeList && state.tradeList.length == 0) {
            api.getTradeList(params).then((res) => {
                commit("saveTradeList", res);
            });
        }
    },
    // 查询
    queryList({ commit }, params) {
        commit("saveLoading", true);
        api
            .showTemplateListByPage(params)
            .then((res) => {
                if (params.modelFlag == "0" && params.modelType == '02') {
                    // 资信-通用
                    commit("saveList", res);
                } else if (params.modelFlag == "1" && params.modelType == '02') {
                    //   资信-行业特殊
                    commit("saveSpecialList", res);
                } else if (params.modelFlag == "0" && params.modelType == '01') {
                    // 行业调查
                    commit('saveIndustryList', res)
                }
            })
            .finally(() => commit("saveLoading", false));
    },
    // 详情
    queryDetail({ commit }, params) {
        return api.showTemplateDetail(params);
    },
    //启停用
    queryTemplateStatus({ commit }, params) {
        return api.updateTemplateStatus(params);
    },
    //删除
    queryDeleteTemplate({ commit }, params) {
        return api.deleteTemplate(params);
    },
    //新增/编辑
    addTemplate({ commit }, params) {
        return api.addTemplate(params);
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
