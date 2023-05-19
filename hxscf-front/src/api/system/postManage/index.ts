/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-14 10:58:45
 * @Description: 
 */
import axios from "@/utils/axios";

//获取角色列表
export const PostQueryList = (params) => {
    return axios.post("/approve/post/listAllPost", params);
};
//新增角色 编辑角色
export const addAndUpdatePost = (params) => {
    return axios.post(`/approve/post/addAndUpdatePost`, params);
};

//删除角色
export const DeleteRole = (params) => {
    return axios.post(`/approve/post/deletePost`, params);
};

// 获取部门名称数据
export const getDepartmentName = (params) => {
    return axios.post(`/approve/organization/showAllOrgByOrgCode`, params);
};

// 岗位名称
export const getPostData = (params) => {
    return axios.post(`/approve/post/showPostByOrg
    `, params);
};