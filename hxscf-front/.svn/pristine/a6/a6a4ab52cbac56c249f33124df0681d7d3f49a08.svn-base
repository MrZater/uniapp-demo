/*
 * @Author: mingliang.zhu
 * @Date: 2021-01-25 11:06:54
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-26 16:30:00
 */

import axios from "@/utils/axios";
//授信记录-获取列表
export const getList = (params) => {
  return axios.post(
    "/approve/generalCredit/showBusSXCreditRecordsList",
    params
  );
};

// 字典项
export const getDataByDicCode = (params) => {
  return axios.post("/approve/dic/showDataByDicCode", params);
};
