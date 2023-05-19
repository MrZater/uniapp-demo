import axios from "@/utils/axios";
// /approve/
//获取列表
export const getLogList = (params) => {
  return axios.post("/approve/log/selectLogData", params);
};

// 删除
export const deleteLog = (params) => {
  return axios.post(`/approve/log/delLogData`, params);
};

// 操作类型
export const types = (params) => {
  return axios.post(`/approve/dic/operateTypeList`, params);
};