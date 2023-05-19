/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-15 18:53:00
 * @Description:
 */
import axios from "@/utils/axios";

//获取行业下拉框
export const getTradeList = (params) => {
  return axios.post("/approve/trade/showTradeInfoList", params);
};
//获取行业信息列表
export const getTradeInfoList = (params) => {
  return axios.post("/approve/trade/showTradeInfoListByPage", params);
  // return axios.get("../../../json/tradLit.json", params);
};

//行业信息管理-新增/编辑
export const addAndUpdateTradeInfo = (params) => {
  return axios.post(`/approve/trade/addAndUpdateTradeInfo`, params);
};

// 行业信息管理-删除
export const deleteTrade = (params) => {
  return axios.post(`/approve/trade/deleteTrade`, params);
};

/* 创建客户风险系数 start */

// 校验是否可以创建客户风险系数
export const check = (params) => {
  return axios.post(`/approve/customer/check`, params);
};

// 查看行业基础数据（客户风险系数详情）
export const showRiskTradeBase = (params) => {
  return axios.post(`/approve/customer/showRiskTradeBase`, params);
};
// 查看行业基础数据（行业详情）
export const showTradeDetailBase = (params) => {
  return axios.post(`/approve/customer/showTradeDetailBase`, params);
};
// 第一页保存/下一步
export const addAndUpdateRiskTradeBase = (params) => {
  return axios.post(`/approve/customer/addAndUpdateRiskTradeBase`, params);
};
// 行业信息模板
export const showTradeTemplateDetail = (params) => {
  return axios.post(`/approve/customer/showTradeTemplateDetail`, params);
};

// 第二页保存/下一步
export const addAndUpdateTradsurvey = (params) => {
  return axios.post(`/approve/customer/addAndUpdateTradsurvey`, params);
};
// 行业评级信息
export const showTradeRating = (params) => {
  return axios.post(`/approve/customer/showTradeRating`, params);
};
// 客户风险系数
export const showCustomerRiskDetail = (params) => {
  return axios.post(`/approve/customer/showCustomerRiskDetail`, params);
};
// 历史 客户风险系数 和 行业评级
export const showHisCustomerDetail = (params) => {
  return axios.post(`/approve/customer/showHisCustomerDetail`, params);
};
// 第三页保存/下一步
export const addAndUpdateCustomerRisk = (params) => {
  return axios.post(`/approve/customer/addAndUpdateCustomerRisk`, params);
};
/* 创建客户风险系数 end */

/* 维护头部企业 start */
// 头部企业列表
export const showLeadingbizList = (params) => {
  return axios.post(`/approve/leadingbiz/showLeadingbizList`, params);
};
// 头部企业下拉框
export const showCreditedBizList = (params) => {
  return axios.post(`/approve/leadingbiz/showCreditedBizList`, params);
};
// 头部企业信用信息
export const showCreditInfo = (params) => {
  return axios.post(`/approve/leadingbiz/showCreditInfo`, params);
};

// 新增头部企业
export const addLeadingbiz = (params) => {
  return axios.post(`/approve/leadingbiz/addLeadingbiz`, params);
};
/* 维护头部企业 end */
