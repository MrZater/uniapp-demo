import router from "./router";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { getStore } from "@/utils/useStore";

router.beforeEach((to, from, next) => {
  // 取消现有 cancel token 下所有未完成的请求
  // let win = window as any;
  // if (win.requestCancels) {
  //   win.requestCancels.forEach((cancel) => {
  //     cancel();
  //   });
  //   win.requestCancels = [];
  // }
  // 开始动画
  NProgress.start();
  // 如果目标路由是首页，并且当前状态没有登录，则重定向到登录页
  if (to.meta.isNeedLogin && !getStore("userInfo")) {
    next("/login");
  }
  // 如果目标路由登录页面，并且当前已经登录，则重定向到首页
  if (to.meta.redirectAlreadyLogin && getStore("userInfo")) {
    next("/");
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
