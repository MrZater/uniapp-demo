/*
 * @Author: mingliang.zhu 
 * @Date: 2020-09-15 10:17:59 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-09-15 10:18:51
 */


import axios from "@/utils/axios";

//获取客户群组列表
export const getList = params => {
  return axios.get("../../../json/home.json", params);
};
