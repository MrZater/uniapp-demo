/*
 * @Author: mingliang.zhu
 * @Date: 2021-01-21 11:58:46
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-27 18:11:16
 */

import axios from "@/utils/axios";
//一般授信额度-获取列表
export const getCreditInfoByPage = (params) => {
  return axios.post("/approve/generalCredit/showCreditInfoByPage", params);
};

// 一般授信额度-删除
export const deleteCreditInfo = (params) => {
  return axios.post(`/approve/generalCredit/deleteCreditInfo`, params);
};
//一般授信额度-详情
export const getCreditInfoDetail = (params) => {
  return axios.post("/approve/generalCredit/showCreditInfoDetail", params);
};
// 字典项
export const getDataByDicCode = (params) => {
  return axios.post("/approve/dic/showDataByDicCode", params);
};

// 获取组织名称
export const getOrgName = (params) => {
  return axios.post(`/approve/organization/showOrgListByFlag`, params);
};

// 授信申请-基础数据
export const getBaseInfo = (params) => {
  return axios.post("/approve/generalCredit/showBaseInfo", params);
};
// 保存/编辑
export const addAndUpdateCreditInfo = (params) => {
  return axios.file("/approve/generalCredit/addAndUpdateCreditInfo", params);
};

// 授信申请—授信方式—保证机构 01
// 授信申请—关联企业—企业名称 02
export const getCreditedBiz = (params) => {
  return axios.post("/approve/generalCredit/showCreditedBiz", params);
};

// 默认业务开展组织
export const getLoginUserOrg = (params) => {
  return axios.post("/approve/organization/showLoginUserOrg", params);
};

// 年审
export const getYearAudit = (params) => {
  return axios.post("/approve/generalCredit/yearAudit", params);
};

// 变更信息
export const getChangeInfo = (params) => {
  return axios.post("/approve/generalCredit/changeInfo", params);
};

// 修改变更信息
export const updateChangeInfo = (params) => {
  return axios.post("/approve/generalCredit/updateChangeInfo", params);
};
