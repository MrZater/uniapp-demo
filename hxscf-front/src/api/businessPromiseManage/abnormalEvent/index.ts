/*
 * @Author: mingliang.zhu
 * @Date: 2021-03-03 16:12:52
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-03-03 18:28:58
 */

import axios from "@/utils/axios";

//异常事件-列表
export const getEventList = (params) => {
  return axios.post("/approve/abnormalEventManagement/selectList", params);
};

// 异常事件-添加
export const add = (params) => {
  return axios.file("/approve/abnormalEventManagement/save", params);
};

// 异常事件-添加-组织机构
export const org = (params) => {
  return axios.post(
    "/approve/abnormalEventManagement/getCurrentUserOrgCode",
    params
  );
};

// 异常事件-详情
export const detail = (params) => {
  return axios.post("/approve/abnormalEventManagement/details", params);
};

// 异常事件-添加异常事件追踪说明
export const addTrack = (params) => {
  return axios.post("/approve/abnormalEventManagement/addTrack", params);
};

// 异常事件-关闭异常事件
export const closeTrack = (params) => {
  return axios.post("/approve/abnormalEventManagement/close", params);
};

// 异常事件-企业列表
export const company = (params) => {
  return axios.post(
    "/approve/abnormalEventManagement/getCanToAbnormalEventCompanyList",
    params
  );
};


// 字典项
export const getDataByDicCode = (params) => {
  return axios.post("/approve/dic/showDataByDicCode", params);
};
