/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 14:56:05
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-07 10:02:57
 * @Description: 角色管理API
 */

import axios from "@/utils/axios";

//获取角色列表
export const RoleQueryList = (params) => {
  return axios.post("/approve/role/list", params);
};
//授权角色
export const addAndUpdate = (params) => {
  return axios.post(`/approve/role/addAndUpdate`, params);
};
//删除角色
export const DeleteRole = (params) => {
  return axios.post(`/approve/role/delete`, params);
};
//根据角色获取可操作的菜单
export const roleMenu = (params) => {
  return axios.get("/approve/role/roleOfResource", params);
};

//权限管理列表
export const authorityList = (params) => {
  return axios.get("/approve/role/select/resource", params);
};

//部门权限列表-机构
export const departmentAuthorityList = (params) => {
  return axios.get("/approve/role/roleOfOrg", params);
};

// 获取角色数据
export const getRoleList = (params) => {
  return axios.get("/approve/role/showAllRole", params);
};
