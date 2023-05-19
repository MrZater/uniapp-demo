/*
 * @Author: min.liu
 * @Date: 2020-04-28 13:35:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-10-18 15:10:10
 * @Description:
 */
import axios from "axios";
import router from "../router";
import { Message, MessageBox } from "element-ui";
import { getStore, clearLoginInfo } from "./useStore";
import baseConfig from "../../baseConfig";
import baseURL from "../api/api";
/* 请求拦截 */
axios.interceptors.request.use(
  function(conf: any) {
    // 0. 生成取消请求的 token/cancel
    // conf.cancelToken = new axios.CancelToken((cancel) => {
    //   let win = window as any;
    //   win.requestCancels = win.requestCancels || [];
    //   win.requestCancels.push(cancel);
    // });
    // 1. get 请求加上随机数
    if (conf.method == "get") {
      conf.params = {
        t: new Date().getTime(),
        ...conf.params,
      };
    }
    // 2. 请求头带上token
    conf.headers["token"] = getStore("token") || "";

    // 3. 处理默认URL
    if (!conf.baseURL) {
      conf.baseURL = baseURL.baseURL;
    }

    // 3. 返回处理的conf
    return conf;
  },
  function(error) {
    return Promise.reject(error);
  }
);
/* 响应拦截 */
axios.interceptors.response.use(
  function(response) {
    if (response.status === baseConfig.successCode) {
      let res = response.data;
      // 10003:账号已在异地登录 10004:登录失效
      if (baseConfig.loginFailureCode.indexOf(res.code) !== -1) {
        clearLoginInfo();
        router.replace({ path: "/login" });
      }
      if (res.code != "00000") {
        (Message as any).closeAll();
        let errorMessage = res.msg || "未知错误，请联系管理员！";
        /* 如果当前账号正在被使用，则将当前信息返回 */
        if (res.code === "10002" || res.code === "10013") {
          return res;
        }
        /* 如果是被踢出，则展示踢出方的信息 */
        if (res.code === "10003") {
          MessageBox.confirm(`${errorMessage}`, "下线通知", {
            confirmButtonText: "我知道了",
            showCancelButton: false,
            type: "warning",
          });
          return Promise.reject(errorMessage);
        }

        Message.error(errorMessage);
        return Promise.reject(errorMessage);
      }
      if (res.data) return res.data;
      return res.msg;
    } else {
      (Message as any).closeAll();
      Message.error("系统错误");
      return {};
    }
  },
  (err) => {
    (Message as any).closeAll();
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误(400)";
          break;
        case 401:
          err.message = "未授权，请重新登录(401)";
          break;
        case 403:
          err.message = "拒绝访问(403)";
          break;
        case 404:
          err.message = "请求出错(404)";
          break;
        case 408:
          err.message = "请求超时(408)";
          break;
        case 500:
          err.message = "服务器错误(500)";
          break;
        case 501:
          err.message = "服务未实现(501)";
          break;
        case 502:
          err.message = "网络错误(502)";
          break;
        case 503:
          err.message = "服务不可用(503)";
          break;
        case 504:
          err.message = "网络超时(504)";
          break;
        case 505:
          err.message = "HTTP版本不受支持(505)";
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    }
    if (err.message) {
      Message.error(err.message);
    }
    return Promise.resolve(err);
  }
);

class Axios {
  get(url: string, params?: object, headers?: object) {
    return axios({
      url,
      method: "get",
      params,
      // baseURL: baseURL.baseURL,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json;charset=UTF-8;",
      },
    });
  }
  post(url: string, params: object, headers?: object) {
    return axios({
      url,
      method: "post",
      data: {
        params: params,
      },
      // baseURL: baseURL.baseURL,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json;charset=UTF-8;",
      },
    });
  }
  file(url: string, params: object, headers?: object) {
    return axios({
      url,
      method: "post",
      data: params,
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default new Axios();
