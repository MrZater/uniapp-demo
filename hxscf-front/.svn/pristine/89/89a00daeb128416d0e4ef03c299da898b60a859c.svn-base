/*
 * @Author: mingliang.zhu
 * @Date: 2020-10-23 09:58:16
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-10-23 10:07:36
 */

import axios from "axios";
import baseURL from "@/api/api";
import { Message } from "element-ui";
/**
 * 清除登录信息
 **/
export const clearLoginInfo = () => {
    removeStore("token");
    removeStore("userInfo");
    removeStore("menu");
    removeStore("btn");
};
/**
 * 存储localStorage
 */
export function setStore(name: string, content: any): any {
    if (!name) return;
    if (typeof content !== "string") {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export function getStore(name: string): any {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export function removeStore(name: string): any {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 下载二进制流文件
 */
interface DOWNFILETYPE {
    url: string; //请求地址
    method: string; //请求方式
    params: object; //请求参数
    filename?: string; //文件名称
    type: string; //文件类型
}

export function downloadFile(options: DOWNFILETYPE): any {
    const { url, method, params, filename, type } = options;
    let config = {
        url: url,
        baseURL: baseURL.baseURL,
        method: method,
        responseType: "blob",
        headers: {
            "X-Access-Token": getStore("token") ? getStore("token") : "",
        },
    };
    if (method == "get") {
        config["params"] = params;
    } else {
        config["data"] = params;
    }

    axios(config).then((response) => {
        let data = response.data;

        // 请求失败，后台返回json
        if (data.type.includes("application/json")) {
            let reader = new FileReader();
            reader.onload = function (event) {
                let result: any = reader.result;
                let message = JSON.parse(result).message;
                // TODO 错误处理
                (Message as any).closeAll();
                Message.error(message || "");
            };
            reader.readAsText(data);
            return true;
        }

        //请求成功，下载文件
        const content: any = data;
        const blob = new Blob([content], { type: "application/octet-stream" });
        let file_name = response.headers["content-disposition"]
            ? decodeURIComponent(
                response.headers["content-disposition"].split("=")[1]
            )
            : filename
                ? filename + type
                : "导出文件" + type;
        if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = file_name;
            elink.style.display = "none";
            elink.href = window.URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        } else {
            // IE10+下载
            navigator.msSaveBlob(blob, file_name);
        }
    });
}
