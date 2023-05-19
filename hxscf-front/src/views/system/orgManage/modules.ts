/*
 * @Author: xiaoyu.ren
 * @Date: 2019-02-01 10:07:22
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-15 10:12:13
 * @Description:
 */
import * as api from "@/api/system/organizationManage";
import { renderOrganization, dealOrganizationPCode } from "@/config/mUtils";
const state = {
    orgList: [],
    loading: false,
    orgPCodeList: [], //组织机构新建-编辑 使用--上级机构
};

const mutations = {
    saveList(state, response) {
        state.orgList = response;
    },
    saveLoading(state, response) {
        state.loading = response;
    },
    saveOrgPCode(state, response) {
        state.orgPCodeList = response
    },
};

const actions = {
    //获取机构列表
    queryOrgList({ commit }, params) {
        commit("saveLoading", true);
        api.allOrganization(params).then((res) => {
            commit("saveList", renderOrganization(res));
            commit('saveOrgPCode', res) // 组织机构新建-编辑 使用--上级机构
        }).finally(() => commit("saveLoading", false));
    },
    //新增/编辑机构
    queryAddOrg({ commit }, params) {
        return api.addOrganization(params);
    },
    //删除机构
    queryDeleteOrg({ commit }, params) {
        return api.deleteOrganization(params);
    },
    // 启用
    startOrganizationFN({ commit }, params) {
        return api.startOrganization(params)
    },
    // 停用
    stopOrganizationFN({ commit }, params) {
        return api.stopOrganization(params)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
