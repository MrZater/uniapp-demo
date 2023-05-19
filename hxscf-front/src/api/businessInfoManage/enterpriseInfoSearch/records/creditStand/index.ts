import axios from "@/utils/axios";
//获取资信记录列表
export const getList = (params) => {
  return axios.post(`/approve/creditStad/showBusCreditRecordsList`, params);
};
