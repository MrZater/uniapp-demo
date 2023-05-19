import axios from "@/utils/axios";

// 企业信息-列表查询
export const getFuzzyData = (params) => {
  return axios.get(`/approve/corpInfoSelect/showCorpOnChangeDetails/${params.corpName}`);
};
// 企业信息-列表查询
export const getData = (params) => {
  return axios.post("/approve/corpInfoSelect/showCorpList", params);
};

/*********************************************已创建 start *************************************/
// 基本信息-zml
export const getBaseInfo = (params) => {
  return axios.post("/approve/enterprise/showEssentialDetails", params);
};
// 经营信息-zml
export const getBusinessInfo = (params) => {
  return axios.post("/approve/enterprise/showEnterpriseBusDetails", params);
};
// 经营不良-zml
export const getBusinessBad = (params) => {
  return axios.post("/approve/enterprise/showPoorManageDetails", params);
};
// 司法信息-zml
export const getJudicialInfo = (params) => {
  return axios.post("/approve/enterprise/showJudicialInfoDetails", params);
};
// 法代信息-zml
export const getNormalBand = (params) => {
  return axios.post("/approve/enterprise/showgMethodGenerDetails", params);
};

/*********************************************已创建 end *************************************/


/*********************************************未创建 start *************************************/
// 基本信息
export const getBaseInfoUnCreated = (params) => {
  return axios.post("/approve/dataPlatform/basicInfo", params);
};
// 经营信息
export const getBusinessInfoUnCreated = (params) => {
  return axios.post("/approve/dataPlatform/managementInfo", params);
};
// 经营不良
export const getBusinessBadUnCreated = (params) => {
  return axios.post("/approve/dataPlatform/managementBad", params);
};
// 司法信息
export const getJudicialInfoUnCreated = (params) => {
  return axios.post("/approve/dataPlatform/judicialInfo", params);
};
/*********************************************未创建 end *************************************/

// 关联公司
export const getAssociated = (params) => {
  return axios.post("/approve/enterprise/showExecutiveAffiliatedDetails", params);
};
// 关联公司
export const getRelationEnterprise = (params) => {
  return axios.post("/approve/dataPlatform/getRelationEnterprise", params);
};

// 未创建-保存高管信息（已废弃）
// export const saveExecutivesInfo = (params) => {
//   return axios.post("/approve/dataPlatform/saveExecutivesInfo", params);
// };
// 未创建-获取高管信息
export const getExecutivesInfo = (params) => {
  return axios.post("/approve/dataPlatform/getExecutivesInfo", params);
};
// 已创建-保存高管信息
export const updateEmployeesInfo = (params) => {
  return axios.post("/approve/enterprise/updateEmployeesInfo", params);
};
