import axios from "@/utils/axios";

//行业名称-下拉框
export const getTradeList = (params) => {
  return axios.post(`/approve/trade/showTradeInfoList`, params);
};

//客户风险系数-列表
export const getList = (params) => {
  return axios.post(`/approve/customer/showCustomerRiskByPage`, params);
};

// 客户风险系数-删除
export const deleteRisk = (params) => {
  return axios.post(`/approve/customer/deleteCustomerRisk`, params);
};

// 客户风险系数-启用
export const start = (params) => {
  return axios.post(`/approve/customer/customerRiskstart`, params);
};

// 客户风险系数-停用
export const stop = (params) => {
  return axios.post(`/approve/customer/customerRiskstop`, params);
};
