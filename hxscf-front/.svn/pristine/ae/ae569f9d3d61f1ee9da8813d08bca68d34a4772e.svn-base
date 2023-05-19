import axios from "@/utils/axios";

// 查询列表数据
export const getList = (params) => {
  return axios.post("/approve/enterprise/showEnterpriseList", params);
};
// 根据组织机构查询业务部门
export const getOrgListByFlag = (params) => {
  return axios.post("/approve/organization/showOrgListByFlag", params);
};
// 查询所属行业
export const getTradeList = (params) => {
  return axios.post("/approve/trade/showTradeInfoList", params);
};
// 查询业务人员
export const getpersonnel = (params) => {
  return axios.post("/approve/user/showRoleByOrgUserList", params);
};

// 校验-企业信息-数据持久化
export const checkEnterpriseLocal = (params) => {
  return axios.post("/approve/enterprise/checkEnterpriseLocal", params);
};

// 新增或者编辑
export const addAndUp = (params) => {
  return axios.post("/approve/enterprise/addAndUpEnterprise", params);
};
// 删除
export const del = (params) => {
  return axios.post("/approve/enterprise/deleteEnterprise", params);
};

// 查询相应的资信模板
export const showCreditTemplateDetail = (params) => {
  return axios.post("/approve/creditStad/showCreditTemplateDetail", params);
};
// 企业资信信息新增/编辑
export const addOrUpdateCreditStand = (params) => {
  return axios.file("/approve/creditStad/addOrUpdateCreditStand", params);
};
// 资信调查-校验
export const chectCreditStand = (params) => {
  return axios.post("/approve/creditException/chectCreditStand", params);
};

// 资信调查-决策结果
export const decisionResultDatav = (params) => {
  return axios.post("/approve/creditStad/decisionResultData", params);
};

// 资信调查-提交审核
export const processAudit = (params) => {
  return axios.post("/approve/creditStad/processAudit", params);
};

// 资信调查—关联人详情
export const getAffiPersonDetails = (params) => {
  return axios.post("/approve/creditStad/showAffiPersonDetails", params);
};
