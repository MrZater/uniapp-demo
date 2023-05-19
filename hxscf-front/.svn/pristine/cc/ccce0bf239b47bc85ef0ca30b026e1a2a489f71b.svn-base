import axios from "@/utils/axios";

//获取字典
export const getDictionaryList = (params) => {
  return axios.post("/approve/dic/selectDictData", params);
};

//字典-新增
export const DictionaryAdd = (params) => {
  return axios.post(`/approve/dic/addDic`, params);
};
//字典-编辑
export const DictionaryUpdate = (params) => {
  return axios.post(`/approve/dic/updateDic`, params);
};

// 字典-删除
export const deleteDictionary = (params) => {
  return axios.post(`/approve/dic/deleteDic`, params);
};

//获取编辑选项数据
export const optionList = (params) => {
  return axios.post("/approve/dic/selectDictOptionData", params);
};

//编辑选项-新增
export const optionAdd = (params) => {
  return axios.post(`/approve/dic/addDicOption`, params);
};
//编辑选项-编辑
export const optionUpdate = (params) => {
  return axios.post(`/approve/dic/updateDicOption`, params);
};