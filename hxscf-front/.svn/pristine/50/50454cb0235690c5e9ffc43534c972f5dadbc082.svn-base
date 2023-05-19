/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:52:02
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-07 15:46:14
 * @Description: 用户管理 API
 */

import axios from "@/utils/axios";

//获取用户列表
export const getUserList = (params) => {
  // return axios.post(`/user/listbypage`, params);
  // return axios.get("../../../json/user.json", params);
  // return axios.post("/approve/user/listbypage", params);//列表（已废弃）
  return axios.post("/approve/user/showAllOrgAndUser", params);
};

//用户管理-新增
export const UserAdd = (params) => {
  return axios.post(`/approve/user/add`, params);
};
//用户管理-编辑
export const UserUpdate = (params) => {
  return axios.post(`/approve/user/update`, params);
};
//用户管理-重置密码
export const UserResetPwd = (params) => {
  return axios.post(`/approve/user/reset`, params);
};

//用户管理-启停用
export const StartOrStop = (params) => {
  return axios.post(`/approve/user/userStartAndStop`, params);
};

//用户管理-删除用户
export const deleteUser = (params) => {
  return axios.post(`/approve/user/delete`, params);
};
//用户管理-岗位查询
export const userPost = (params) => {
  return axios.post(`/approve/post/findPostAll`, params);
};
//用户管理-详情保存
export const userDetailSave = (params) => {
  //post/findPostAll
  return axios.post(`/approve/post/`, params);
};

// 获取详情数据
export const showUserDetail = (params) => {
  return axios.post(`/approve/user/showUserDetail`, params);
};

// 获取组织名称
export const getOrgName = (params) => {
  return axios.post(`/approve/organization/showOrgListByFlag`, params);
};
