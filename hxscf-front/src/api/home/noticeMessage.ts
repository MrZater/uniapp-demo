/*
 * @Author: mingliang.zhu
 * @Date: 2021-03-01 09:46:23
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-03-01 10:55:12
 */

import axios from "@/utils/axios";

//消息通知-列表
export const getList = (params) => {
  return axios.post("/approve/messageWorkbench/selectList", params);
};

//消息通知-重置为已读
export const resetToRead = (params) => {
  return axios.post("/approve/messageWorkbench/resetToRead", params);
};


// 字典项
export const getDataByDicCode = (params) => {
  return axios.post("/approve/dic/showDataByDicCode", params);
};
