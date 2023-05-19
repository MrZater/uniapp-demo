/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 18:43:28
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:42:43
 * @Description: 客户管理API
 */

import axios from "@/utils/axios";

//获取客户列表
export const getList = params => {
  return axios.post(`/cust/list`, params);
};
