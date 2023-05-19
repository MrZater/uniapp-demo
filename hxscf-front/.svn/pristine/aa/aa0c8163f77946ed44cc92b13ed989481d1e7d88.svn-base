/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-21 18:41:15
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-07 10:11:28
 */

import * as api from "@/api/system/authorityManage";
import { renderAuthority, dealDicPermisson, renderOrganization } from "@/config/mUtils";
const state = {
    authorityListArry: [], //所有资源(未处理过的)
    allResourceList: [], //所有资源(菜单)
    loading: false,
    dicPerData: [] // 目录权限
};

const mutations = {
    saveList(state, response) {
        state.allResourceList = response;
    },
    saveAuthorityListArry(state, response) {
        state.authorityListArry = response;
    },
    saveLoading(state, response) {
        state.loading = response;
    },
    saveDicPerData(state, response) {
        state.dicPerData = response;
    },
};

const actions = {
    //获取权限列表
    queryAllResource({ commit }, params) {
        commit("saveLoading", true);
        api.authorityList(params).then((res) => {
            // 列表
            commit("saveList", renderAuthority(res));
            // 父节点列表
            commit("saveAuthorityListArry", res);
            commit("saveLoading", false);
        });
    },
    //权限-新增
    queryAddAuthority({ commit }, params) {
        return api.authorityAdd(params);
    },
    //权限-编辑
    queryUpdateAuthority({ commit }, params) {
        return api.authorityUpdate(params);
    },
    //权限-删除
    queryDeleteAuthority({ commit }, params) {
        return api.authorityDelete(params);
    },
    //目录权限
    queryDicPermisson({ commit }, params) {
        return api.authorityPermisssions(params).then(res => {
            // console.log(dealDicPermisson(res))
            // console.log(res)
            commit('saveDicPerData', dealDicPermisson(res))
        })
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
