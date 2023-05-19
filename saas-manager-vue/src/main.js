// 直接引入icon.css,防止sass打包转译，出现线上乱码
import 'element-ui/lib/theme-chalk/icon.css'
import './styles/element-variables.scss'
import '@/styles/index.scss'
// 阿里矢量图标
import './assets/fonts/iconfont.css'
import 'normalize.css/normalize.css'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'

import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import * as filters from './filters'
import './eventBus' // 事件总线
import vLazy from './directive/lazy'

import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

if (!window.ELEMENT) {
  Vue.use(Element, {
    locale: locale,
    size: 'medium' // set element-ui default size
  })
} else {
  Vue.use(window.ELEMENT, {
    locale: locale,
    size: 'medium' // set element-ui default size
  })
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.directive('lazy', vLazy)
new Vue({
  el: '#app',
  store,
  router,

  render: h => h(App)
})
