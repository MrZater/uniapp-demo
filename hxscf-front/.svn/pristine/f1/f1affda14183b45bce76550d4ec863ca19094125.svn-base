/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-17 09:09:28
 * @Description: 
 */
import axios from "@/utils/axios";

//获取行业下拉框
export const getTradeList = (params) => {
    return axios.post("/approve/trade/showTradeInfoList", params);
};
//资信调查模板列表
export const showTemplateListByPage = (params) => {
    return axios.post("/approve/templateConfig/showTemplateListByPage", params);
};

//资信调查模板管理-新增
export const addTemplate = (params) => {
    return axios.post(`/approve/templateConfig/addTemplate`, params);
};

// 资信调查模板管理-启停用
export const updateTemplateStatus = (params) => {
    return axios.post(`/approve/templateConfig/updateTemplateStatus`, params);
};
// 资信调查模板管理-删除
export const deleteTemplate = (params) => {
    return axios.post(`/approve/templateConfig/deleteTemplate`, params);
};
// 资信调查模板管理-详情
export const showTemplateDetail = (params) => {
    return axios.post(`/approve/templateConfig/showTemplateDetail`, params);
};
// 查询可以委托人列表
export const showCanDelegateList = (params) => {
    return axios.post(`/approve/processBusinessCommon/showCanDelegateList`, params);
};

// 委托
export const consign = (params) => {
    return axios.post(`/approve/limitMultiplier/consign`, params);
};

// 查询可以加签人列表
export const showCanEndorserList = (params) => {
    return axios.post(`/approve/processBusinessCommon/showCanEndorserList`, params);
};

// 加签
export const endorsement = (params) => {
    return axios.post(`/approve/limitMultiplier/endorsement`, params);
};

// 通过
export const adopt = (params) => {
    return axios.post(`/approve/limitMultiplier/adopt`, params);
};

// 查询可退回列表
export const showCanRolledBackList = (params) => {
    return axios.post(`/approve/processBusinessCommon/showCanRolledBackList`, params);
};

// 退回
export const rollback = (params) => {
    return axios.post(`/approve/limitMultiplier/rollback`, params);
};

// 拒绝
export const reject = (params) => {
    return axios.post(`/approve/limitMultiplier/reject`, params);
};
