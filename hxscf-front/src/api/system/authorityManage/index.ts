/*
 * @Author: mingliang.zhu
 * @Date: 2020-09-17 15:02:21
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-09-21 18:55:11
 * @Description: 权限管理 api
 */
import axios from "@/utils/axios";

//权限管理列表
export const authorityList = (params) => {
    // return axios.post(`/sys/permissionManage/list`, params);
    // return axios.get("../../../json/allResource.json", params);
    return axios.post("/approve/permission/list", params);
};

//权限管理-新增
export const authorityAdd = (params) => {
    return axios.post(`/approve/permission/add`, params);
};
//权限管理-编辑
export const authorityUpdate = (params) => {
    return axios.post(`/approve/permission/update`, params);
};
//权限管理-删除
export const authorityDelete = (params) => {
    return axios.post(`/approve/permission/delete`, params);
};
// 目录权限
export const authorityPermisssions = (params) => {
    return axios.post(`/approve/permission/getContentsList`, params);
}
