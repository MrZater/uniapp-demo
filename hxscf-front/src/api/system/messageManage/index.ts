/*
 * @Author: mingliang.zhu 
 * @Date: 2021-02-04 14:56:00 
 * @Last Modified by:   mingliang.zhu 
 * @Last Modified time: 2021-02-04 14:56:00 
 */

import axios from "@/utils/axios";

//消息管理-列表
export const getMsgList = (params) => {
  return axios.post("/approve/messageManagement/selectList", params);
};

//消息管理-发送
export const resend = (params) => {
  return axios.post("/approve/messageManagement/resend", params);
};
// 字典项
export const getDataByDicCode = (params) => {
  return axios.post("/approve/dic/showDataByDicCode", params);
};
