/*
 * @Author: mingliang.zhu
 * @Date: 2021-02-04 14:55:50
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 16:40:18
 */

import axios from "@/utils/axios";

//公告管理-列表
export const getNoticeList = (params) => {
  return axios.post("/approve/notice/showNoticeByPage", params);
};

// 公告管理-添加
export const addNotice = (params) => {
  return axios.file("/approve/notice/addNotice", params);
};

// 公告管理-详情
export const detailNotice = (params) => {
  return axios.post("/approve/notice/showNoticeDeatil", params);
};

// 公告管理-通知人员显示
export const findByUserCodeList = (params) => {
  return axios.post("/approve/notice/findByUserCodeList", params);
};

// 字典项
export const getDataByDicCode = (params) => {
  return axios.post("/approve/dic/showDataByDicCode", params);
};
