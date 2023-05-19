/*
 * @Author: mingliang.zhu
 * @Date: 2021-02-23 14:23:53
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-26 18:46:33
 * @Description: 授信通知管理API
 */

import axios from "@/utils/axios";

//授信通知管理-列表
export const queryList = (params) => {
  return axios.post("/approve/creditNotice/list", params);
};
//授信通知管理-新增编辑
export const addOrUpdate = (params) => {
  return axios.post(`/approve/creditNotice/addOrUpdate`, params);
};
//授信通知管理-详情
export const detail = (params) => {
  return axios.post(`/approve/creditNotice/detail`, params);
};
//授信通知管理-启用
export const start = (params) => {
  return axios.post(`/approve/riskNotice/start`, params);
};
//授信通知管理-停用
export const stop = (params) => {
  return axios.post(`/approve/riskNotice/stop`, params);
};
//机构管理-列表
export const allOrganization = (params) => {
  return axios.post("/approve/organization/showOrgListByFlag", params);
};
