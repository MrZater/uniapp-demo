/**
 * 邮箱
 * @param {*} s
 */
export function emailRegExp(s) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    s
  );
}

/**
 * 手机号码
 * @param {*} s
 */
export function phoneRegExp(s) {
  return /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(
    s
  );
}

/**
 * 电话号码
 * @param {*} s
 */
export function mobileRegExp(s) {
  return /\d{3}-\d{8}|\d{4}-\d{7}/.test(s);
}

/**
 * 密码6-12位字母和数字组合
 * @param {*} s
 */
export function pwdRegExp(s) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(s);
}

/**
 * 身份证号
 * @param {*} s
 */
export function idCardRegExp(s) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function urlRegExp(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

/**
 * IP地址
 * @param {*} s
 */
export function ipRegExp(s) {
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    s
  );
}

/**
 * 数字
 * @param {*} s
 */
export function numberRegExp(s) {
  return /^-?\d*\.?\d+$/.test(s);
}

/**
 * 整数
 * @param {*} s
 */
export function integerRegExp(s) {
  return /^-?\d+$/.test(s);
}
