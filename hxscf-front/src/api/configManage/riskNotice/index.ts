/*
 * @Author: mingliang.zhu
 * @Date: 2021-02-23 14:23:53
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-26 15:10:53
 * @Description: 风险通知配置API
 */

import axios from "@/utils/axios";

//风险通知配置-列表
export const queryList = (params) => {
  return axios.post("/approve/riskNotice/list", params);
};
//风险通知配置-新增编辑
export const addAndUpdate = (params) => {
  return axios.post(`/approve/riskNotice/addOrUpdate`, params);
};
//风险通知配置-详情
export const detail = (params) => {
  return axios.post(`/approve/riskNotice/detail`, params);
};
//风险通知配置-启用
export const start = (params) => {
  return axios.post(`/approve/riskNotice/start`, params);
};
//风险通知配置-停用
export const stop = (params) => {
  return axios.post(`/approve/riskNotice/stop`, params);
};
//机构管理-列表
export const allOrganization = (params) => {
  return axios.post("/approve/organization/showOrgListByFlag", params);
};

//风险通知配置-风险类型
export const typeList = (params) => {
  return axios.post("/approve/riskNotice/showRiskTypes", params);
};
