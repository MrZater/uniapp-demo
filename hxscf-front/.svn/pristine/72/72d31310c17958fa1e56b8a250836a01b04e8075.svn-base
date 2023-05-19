/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:59:20
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-07 15:06:20
 * @Description: 机构管理 API
 */

import axios from "@/utils/axios";

//机构管理-列表
export const allOrganization = (params) => {
  return axios.post("/approve/organization/showOrgListByFlag", params);
};

//机构管理-删除机构
export const deleteOrganization = (params) => {
  return axios.get(`/approve/organization/delete`, params);
};

//机构管理-新增/更新机构
export const addOrganization = (params) => {
  return axios.post(`/approve/organization/addAndUpdate`, params);
};

//机构管理-启用
export const startOrganization = (params) => {
  return axios.post(`/approve/organization/orgStart`, params);
};

//机构管理-停用
export const stopOrganization = (params) => {
  return axios.post(`/approve/organization/orgStop`, params);
};