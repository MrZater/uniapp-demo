/*
 * @Author: xiaoyu.ren
 * @Date: 2019-02-27 19:47:54
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-18 14:40:55
 * @Description: common公共接口API
 */
import axios from "@/utils/axios";

// 公共获取字典接口
export const getDictByType = params => {
  //   return axios.post(`/system/getDicts`, params);
  return axios.get("../../../json/dicts.json", params);
};
