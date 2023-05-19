const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  opened: state => state.app.sidebar.opened,
  device: state => state.app.device,
  token: state => state.user.token,
  mediaAccess: state => state.user.mediaAccess,
  name: state => state.user.name,
  username: state => state.user.username,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  skip: state => state.user.skip,
  creative: state => state.user.creative,
  permission_routes: state => state.permission.routes,
  title: state => state.autoweb.title,
  unReadMessage: state => state.user.unReadMessage,
  
  isMedPro: state => state.autoweb.isMedPro,
  origin: state => state.autoweb.origin,
  allowRegister: state => state.autoweb.allowRegister,
  resourceUrl: state => state.autoweb.resourceUrl,

  learnWay: state => state.user.learnWay,
  mainApp: state => state.user.mainApp,
  allowOperate: state => state.user.allowOperate,
  allowDownload: state => state.user.allowDownload,
  audit: state => state.user.audit,
  aggregate: state => state.user.aggregate
}
export default getters
