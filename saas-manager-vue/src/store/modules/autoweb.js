const isMedPro = process.env.NODE_ENV === 'development'
  ? true : window.location.host != 'manager.ads.cctv.com'

const isMChild = process.env.NODE_ENV === 'development'
  ? false : window.location.host == 'medpro.ydmob.com'
    // ? false : window.location.host == 'medpro.ydmob.com:7001'
    ? false : window.location.host == 'app.medproad.com:7001/'
      ? false : window.location.host == 'app.medproad.com'
        ? false : window.location.host != 'manager.ads.cctv.com'
// window.location.host == 'medpro.ydmob.com:7001' ?
// true : window.location.host == 'medpro.ydmob.com' ?
// true : window.location.host.includes('medpro') ?
// true : window.location.host.includes('ydmob') ? true : false

const state = {
  isMedPro: isMedPro,
  title: isMedPro ? 'Mediatom' : 'CMedia',
  allowRegister: isMChild ? false : !!isMedPro,
  resourceUrl: isMedPro ? 'http://creative.medproad.com/material/' : 'https://res.ads.cctv.com/material/',
  origin: process.env.NODE_ENV === 'development' ? 'http://app.medproad.com:7001/' : window.location.origin
}

const mutations = {
  CHANGE_TITLE: (state, value) => {
    state.title = value
  }
}

const actions = {
  changeTitle({
    commit
  }, data) {
    commit('CHANGE_TITLE', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
