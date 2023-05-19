import App from './App'
// 引入http模块
import module from '@/ajax/api/index.js'
import uersRuleMixin from '@/common/rulesMixin.js'
import uersCommonMixin from '@/common/commonMixin.js'
Vue.use(uersRuleMixin)
Vue.use(uersCommonMixin)
// #ifndef VUE3
import Vue from 'vue'
import store from '@/store/index.js'
// 将http模块挂载到Vue原型上进行使用
Vue.prototype.$http = module
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
