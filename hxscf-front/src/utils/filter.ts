/*
 * @Author: zhiqiang.qiao
 * @Date: 2020-04-23 11:36:24
 * @lastEditors: zhiqiang.qiao
 * @lastEditTime: mingliang.zhu
 * @description:
 */
import moment from "moment";
let date = function(value: number | string): string {
  if (!value) return "-";
  value = typeof value === "string" ? Number(value) : value;
  return moment(value).format("YYYY-MM-DD");
};

let time = function(value: number | string): string {
    if (!value) return "-";
    value = typeof value === "string" ? Number(value) : value;
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 转换钱数 保留两位小数
 * 添加千分符
 */
let money = function(n) {
  let N = !isNaN(Number(n)) ? Number(n) : 0;
  return N.toLocaleString("zh", {
    style: "decimal",
    currency: "cny",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2, //最少保留小数的位数
    maximumFractionDigits: 2, //最多保留小数的位数
    useGrouping: true,
  });
};

/**
 * 数字千分符
 */
let num = function(n) {
  let N = !isNaN(Number(n)) ? Number(n) : 0;
  return N.toLocaleString("zh", {
    style: "decimal",
    currency: "cny",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0, //最少保留小数的位数
    maximumFractionDigits: 0, //最多保留小数的位数
    useGrouping: true,
  });
};

/**
 * 百分比
 */
let percent = function(n) {
  let N =
    n == null ? "null" : !isNaN(Number(n)) ? Number(n).toFixed(2) + "%" : "";
  return N;
};

/**
 * 解决js精度问题 且保留两位小数
 * toDecimal(0.1+0.2)
 * toDecimal(0.1*0.2)
 * toDecimal(0.8-0.5)
 * toDecimal(1/0.3)
 */
let toDecimal = function(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
};

export default {
  date,
  time,
  money,
  num,
  percent,
  toDecimal,
};
