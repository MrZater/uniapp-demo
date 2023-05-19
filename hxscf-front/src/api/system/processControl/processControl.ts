/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 18:16:00
 * @Description: 
 */
import axios from "@/utils/axios";
// 流程控制-流程类型下拉框
export const showDataByDicCode = params => {
    return axios.post(`/approve/dic/showDataByDicCode`, params);
};

// 流程控制-列表
export const processControlList = params => {
    return axios.post(`/approve/process/query`, params)
};
//流程控制-新增
export const processControlCreate = params => {
    return axios.post(`/approve/process/create`, params);
};
//流程控制-增,删 该
export const processControlOpt = params => {
    return axios.post(`/approve/process/operate`, params);
};

//流程控制-定义流程
export const CreateProcessSetting = params => {
    return axios.post(`/approve/process/create`, params);
};

//流程控制-启用
export const CreateProcessStart = params => {
    return axios.post(`/approve/process/processConfigStart`, params);
};

//流程控制-停用
export const CreateProcessStop = params => {
    return axios.post(`/approve/process/processConfigStop`, params);
};