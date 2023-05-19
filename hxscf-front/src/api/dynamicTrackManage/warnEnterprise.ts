/*
 * @Author: mingliang.zhu
 * @Date: 2021-03-01 16:23:00
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-03-01 18:44:31
 */

import axios from "@/utils/axios";
// 预警企业-列表
export const getList = (params) => {
  return axios.post("/approve/warnEnterprise/list", params);
};

// 预警企业-删除
export const queryDelete = (params) => {
  return axios.post(`/approve/warnEnterprise/delete`, params);
};

// 预警企业-新增、编辑
export const addOrUpdate = (params) => {
  return axios.post("/approve/warnEnterprise/addOrUpdate", params);
};

// 预警企业-启停用
export const startOrStop = (params) => {
  return axios.post("/approve/warnEnterprise/startOrStop", params);
};

// 根据组织机构查询业务部门
export const getOrgListByFlag = (params) => {
  return axios.post("/approve/organization/showOrgListByFlag", params);
};
