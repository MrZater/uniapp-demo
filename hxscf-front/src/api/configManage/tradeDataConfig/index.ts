/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-17 17:11:28
 * @Description: 
 */
import axios from "@/utils/axios";
//行业数据获取方式-列表
export const getList = (params) => {
    return axios.post(`/approve/tradeDataConfig/showTradeCodeList`, params);
};

//行业数据获取方式-编辑
export const update = (params) => {
    return axios.post(`/approve/tradeDataConfig/addAndUpTradeCode`, params);
};

//获取行业下拉框
export const getTradeList = (params) => {
    return axios.post("/approve/trade/showTradeByOrgCode", params);
};
//
export const showHisTradeCodeList = (params) => {
    return axios.post("/approve/tradeDataConfig/showHisTradeCodeList", params);
};
