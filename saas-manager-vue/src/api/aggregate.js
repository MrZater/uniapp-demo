import request from '@/utils/request'
// 广告元分组
export function getPlaceGroup(data) {
  return request({
    url: '/aggregate/group',
    method: 'post',
    data
  })
}
// 代码位列表
export function getPlaceSource(data) {
  return request({
    url: '/aggregate/source',
    method: 'post',
    data
  })
}
// 代码位列表
export function getPriority(data) {
  return request({
    url: '/aggregate/changePriority',
    method: 'post',
    data
  })
}

export function updateGroupSourceSts(data) {
  return request({
    url: '/aggregate/updateSource',
    method: 'post',
    data
  })
}
export function updateGroupSourcePrice(data) {
  return request({
    url: '/aggregate/updateSource',
    method: 'post',
    data
  })
}

export function addSource(data) {
  return request({
    url: '/aggregate/addSource',
    method: 'post',
    data
  })
}

export function updateSource(data) {
  return request({
    url: '/aggregate/updateSource',
    method: 'post',
    data
  })
}
// 流量分组新增
export function addFlowGrow(data) {
  return request({
    url: '/aggregate/addGroup',
    method: 'post',
    data
  })
}
export function editFlowGrow(data) {
  return request({
    url: '/aggregate/updateGroup',
    method: 'post',
    data
  })
}
// 删除广告原
export function deladverte(params) {
  return request({
    url: '/aggregate',
    method: 'Delete',
    params
  })
}
export function delFlowGroups(params) {
  return request({
    url: '/aggregate/deleteGroupById',
    method: 'Delete',
    params
  })
}
// 广告原 快速添加 列表
export function adverteList(data) {
  return request({
    url: '/aggregate/templateList',
    method: 'post',
    data
  })
}
// 编辑单个输入框
export function editInput(data) {
  return request({
    url: '/aggregate/updateImpress',
    method: 'post',
    data
  })
}
// 广告位时间
export function adverteTime(data) {
  return request({
    url: '/place/timeInfo',
    method: 'post',
    data
  })
}
// 广告位时间 编辑
export function adverteTimeEdit(data) {
  return request({
    url: '/place/updateTimeInfo',
    method: 'post',
    data
  })
}
// 模板类型
export function getTemplateTypeList() {
  return request({
    url: '/aggregate/templateTypeList',
    method: 'get'
  })
}

// 地区信息
export function getArea() {
  return request({
    url: '/common/area_list',
    method: 'get'
  })
}
// 获取设备品牌列表
export function brandList() {
  return request({
    url: '/common/brandList',
    method: 'get'
  })
}

// 添加ab测试
export function addABTest(data) {
  return request({
    url: '/abtest/add',
    method: 'post',
    data
  })
}

// 获取设备品牌列表
export function getABTestList(data) {
  return request({
    url: '/abtest/abtest_list',
    method: 'post',
    data
  })
}
// 配置ab测试
export function updateABTest(data) {
  return request({
    url: '/abtest/update',
    method: 'post',
    data
  })
}

// 结束ab测试
export function shutdownTest(data) {
  return request({
    url: '/abtest/shutdownTest',
    method: 'post',
    data
  })
}
// 瀑布流设置
export function settingArgs(data) {
  return request({
    url: '/abtest/update_args',
    method: 'post',
    data
  })
}

// 获取模板列表
export function getTempleteList() {
  return request({
    url: '/creative/template_list',
    method: 'get'
  })
}
// 校验添加/编辑代码位
export function checkPlatPlaceId(data) {
  return request({
    url: '/aggregate/checkPlatPlaceId',
    method: 'post',
    data
  })
}

// 批量添加通过广告位和应用查询应用名、广告位名、icon
export function getAppInfoById(data) {
  return request({
    url: '/app/getAppById',
    method: 'post',
    data
  })
}

// 批量添加代码位
export function batchAddSource(data) {
  return request({
    url: '/aggregate/batchAddSource',
    method: 'post',
    data
  })
}

// 批量修改聚合管理状态

export function batchUpdateSourceSts(data) {
  return request({
    url: '/aggregate/batchUpdateSourceSts',
    method: 'post',
    data
  })
}

// 批量复制代码位配置
export function batchReplicationConfig(data) {
  return request({
    url: '/aggregate/batchReplicationConfig',
    method: 'post',
    data
  })
}

export function getAbTestReport(data) {
  return request({
    url: '/abtest/getAbTestReport',
    method: 'post',
    data
  })
}

export function getAbTestEchartsReport(data) {
  return request({
    url: '/abtest/getAbTestEchartsReport',
    method: 'post',
    data
  })
}

export function downloadAdsourceTemplate(data) {
  return request({
    url: '/aggregate/downloadAdsourceTemplate',
    method: 'post',
    data
  })
}

export function adsourceAdvancedSetup(data) {
  return request({
    url: '/aggregate/adsourceAdvancedSetup',
    method: 'post',
    data
  })
}
