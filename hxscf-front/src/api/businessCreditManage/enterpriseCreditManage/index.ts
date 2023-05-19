/*
 * @Author: mingliang.zhu
 * @Date: 2020-11-24 14:46:17
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 21:06:40
 */

import axios from "@/utils/axios";
//获取列表
export const showCreditStandList = (params) => {
  return axios.post("/approve/creditStad/showCreditStandList", params);
};

// 删除
export const deleteCreditStand = (params) => {
  return axios.post(`/approve/creditStad/deleteCreditStand`, params);
};

// 预览
export const getPreview = (params) => {
  return axios.post(`/approve/creditStad/creditApprovalFormDetails`, params);
};

// 详情
export const showEnterpriseDetails = (params) => {
  return axios.post("/approve/creditStad/showEnterpriseDetails", params);
};

// 操作记录
export const showOperationRecordList = (params) => {
  return axios.post(`/approve/processBusinessCommon/showOperationRecordList`, params);
};

// 撤回
export const revoke = (params) => {
  return axios.post(`/approve/processApproval/revoke`, params);
};

// 委托
export const consign= (params) => {
  return axios.post(`/approve/processApproval/consign`, params);
};

// 加签
export const endorsement= (params) => {
  return axios.post(`/approve/processApproval/endorsement`, params);
};

// 通过
export const adopt= (params) => {
  return axios.post(`/approve/processApproval/adopt`, params);
};

// 退回
export const rollback = (params) => {
  return axios.post(`/approve/processApproval/rollback`, params);
};

// 拒绝
export const reject = (params) => {
  return axios.post(`/approve/processApproval/reject`, params);
};

// 根据组织机构查询业务部门
export const getOrgListByFlag = (params) => {
  return axios.post("/approve/organization/showOrgListByFlag", params);
};
