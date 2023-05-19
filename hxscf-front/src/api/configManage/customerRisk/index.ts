import axios from "@/utils/axios";
//通用客户风险系数-列表
export const getList = (params) => {
  return axios.post(`/approve/customerRisk/list`, params);
};

//通用客户风险系数-新增/编辑
export const addAndUpdateLimit = (params) => {
  return axios.post(`/approve/customerRisk/save`, params);
};

//通用客户风险系数-详情
export const showDetails = (params) => {
  return axios.post(`/approve/customerRisk/details`, params);
};

// 通用客户风险系数-删除
export const deleteLimit = (params) => {
  return axios.post(`/approve/customerRisk/delete`, params);
};

// 通用客户风险系数-启用
export const start = (params) => {
  return axios.post(`/approve/customerRisk/start`, params);
};

// 通用客户风险系数-停用
export const stop = (params) => {
  return axios.post(`/approve/customerRisk/stop`, params);
};

// 通用客户风险系数-撤回
export const revoke = (params) => {
  return axios.post(`/approve/customerRisk/revoke`, params);
};

// 查询可以委托人列表
export const showCanDelegateList = (params) => {
  return axios.post(`/approve/processBusinessCommon/showCanDelegateList`, params);
};

// 委托
export const consign= (params) => {
  return axios.post(`/approve/customerRisk/consign`, params);
};

// 查询可以加签人列表
export const showCanEndorserList = (params) => {
  return axios.post(`/approve/processBusinessCommon/showCanEndorserList`, params);
};

// 加签
export const endorsement= (params) => {
  return axios.post(`/approve/customerRisk/endorsement`, params);
};

// 通过
export const adopt= (params) => {
  return axios.post(`/approve/customerRisk/adopt`, params);
};

// 查询可退回列表
export const showCanRolledBackList = (params) => {
  return axios.post(`/approve/processBusinessCommon/showCanRolledBackList`, params);
};

// 退回
export const rollback = (params) => {
  return axios.post(`/approve/customerRisk/rollback`, params);
};

// 拒绝
export const reject = (params) => {
  return axios.post(`/approve/customerRisk/reject`, params);
};

// 操作记录
export const showOperationRecordList = (params) => {
  return axios.post(`/approve/processBusinessCommon/showOperationRecordList`, params);
};