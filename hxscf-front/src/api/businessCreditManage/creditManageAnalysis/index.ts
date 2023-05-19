import axios from "@/utils/axios";

export const getHomeData = (params) => {
  return axios.get(
    "../../../json/businessInfoManage/creditManageAnalysis/index.json",
    params
  );
};
