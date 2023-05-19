/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 18:16:49
 * @Description: 
 */
import {
    showDataByDicCode,
    processControlList,
    processControlCreate,
    processControlOpt,
    CreateProcessSetting,
    CreateProcessStart,
    CreateProcessStop
} from '@/api/system/processControl/processControl'

const state = {
    m_selectList: [],
    s_loading: false,
    s_data: {},
    s_searchData: {
        pageNum: 1,
        pageSize: 10,
    },
};

const mutations = {
    m_selectList(state, response) {
        state.m_selectList = response;
    },
    m_loading(state, response) {
        state.s_loading = response
    },
    m_data(state, response) {
        state.s_data = response
    },
    m_searchData(state, response) {
        state.s_searchData = response;
    },
};

const actions = {
    // 流程类型下拉框
    showDataByDicCodeFN({ commit }, params) {
        showDataByDicCode(params).then((res: any) => {
            commit("m_selectList", res);
        });
    },
    //列表
    processControlListFN({ commit }, params) {
        commit("m_loading", true);
        processControlList(params).then((res: any) => {
            commit("m_loading", false);
            commit("m_data", res);
        })
    },
    // 添加(生成编号)
    processControlCreateFN({ commit }, params) {
        return processControlCreate(params);
    },
    // 添加 修改,删除
    processControlOptFN({ commit }, params) {
        return processControlOpt(params);
    },

    //创建
    queryCreateProcessSettingFN({ commit }, params) {
        return CreateProcessSetting(params);
    },
    // 启用
    startFN({ commit }, params) {
        return CreateProcessStart(params)
    },
    // 停用
    stopFN({ commit }, params) {
        return CreateProcessStop(params)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
