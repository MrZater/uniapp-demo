/*
 * @Author: mingliang.zhu 
 * @Date: 2020-09-17 11:00:03 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-09-28 10:55:18
 */

import axios from "@/utils/axios";
import baseURL from "./api.js";
/*
请求本地假数据 必须用get方法，静态json数据在 static目录下。
参考 登录方法 和 参考static目录下面的 loginData.json  假数据 必须是json类型
*/

// 登录
export const loginFN = params => {
  // return axios.post(`/sys/login`, params);
  // return axios.get("../../../json/menu.json", params);
  return axios.post("/approve/sys/login", params);
};

// 退出登录
export const logoutFN = params => {
  return axios.post(`/approve/sys/logout`, params);
};
// 修改密码
export const updatePassword = params => {
  return axios.post(`/approve/user/updatePassword`, params);
};

// 首次登录修改密码
export const replacePassword = params => {
  return axios.post(`/approve/sys/updatepass`, params);
};
