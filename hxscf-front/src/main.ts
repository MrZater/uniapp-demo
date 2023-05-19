/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 18:43:29
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-05-27 18:05:36
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import store from "@/store";
import element, { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/commonLess/common.scss";
import "./assets/commonLess/components.scss";
import "./assets/iconFont/iconfont.css";
import "./assets/commonLess/wrapper.scss";
import "./assets/commonLess/steps.scss";
import "./assets/commonLess/report.scss";
import ZkTable from "vue-table-with-tree-grid";
import moment from "moment";
import filters from "./utils/filter";
import bus from "./utils/eventBus";
import i18n from "./i18n/i18n.js";
import baseURL from "@/api/api";
import baseurl from "../baseConfig";
import SlideVerify from "vue-monoplasty-slide-verify";
import echarts from "echarts";
import Print from "vue-print-nb";
import VueClipboard from "vue-clipboard2";

// 数据字典组件
import dictSelect from "@/components/DictSelect/index.vue";
// 按钮权限组件
import renderBtn from "@/components/renderBtn.vue";
// 右键菜单组件
import contextmenu from "@/components/ContextMenu/contextmenu";

//列表拖动组件
import draggable from "vuedraggable";

Vue.use(element);
Vue.use(ZkTable);
Vue.use(SlideVerify);
Vue.use(echarts);
Vue.use(Print);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
Vue.component("dictSelect", dictSelect);
Vue.component("renderBtn", renderBtn);
Vue.component("draggable", draggable);

const on = Vue.prototype.$on;
// 防抖处理-立即执行
Vue.prototype.$on = function(event, func) {
  let timer;
  let newFunc = func;
  let _this: any = this;
  if (event === "click") {
    newFunc = function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        func.apply(_this, arguments);
      }, 300);
    };
  }
  on.call(this, event, newFunc);
};

//引入自定义指令
import "./directives";
//引入路由守卫
import "@/nprogress";
//引入码值
import codeValue from "./utils/codeValue";
//新增全局的过滤器
for (var i in filters) {
  Vue.filter(i, filters[i]);
}
//国际化
Vue.use(element, {
  i18n: (key, value) => i18n.t(key, value),
});

//对$message进行二次封装
function EL_message(options) {
  /**
    @param {options.more} true：允许弹出多次
    */
  !options.more && (Message as any).closeAll();
  Message({
    message: options.message,
    type: options.type,
    duration: 2000,
    onClose: options.onClose,
  });
}

// 非生产环境, 适配mockjs模拟数据
if (process.env.NODE_ENV !== "production") {
  require("@/mock");
}

Vue.prototype.$message = EL_message;
Vue.prototype.$Bmessage = EL_message;
Vue.prototype.$moment = moment;
Vue.prototype.$bus = bus;
Vue.prototype.$code = codeValue.getTextByCode;
Vue.prototype.$baseUrl = baseURL.baseURL;
Vue.prototype.$baseurl = baseurl.targetUrl;
Vue.prototype.$contextmenu = contextmenu;
Vue.prototype.$select = codeValue.getSelectByCode;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
