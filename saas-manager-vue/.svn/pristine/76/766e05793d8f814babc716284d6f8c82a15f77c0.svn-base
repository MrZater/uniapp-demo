export function getAccessKeyLabel(platId) {
  if (platId == 1) {
    // 穿山甲
    return 'RoleId'
  } else if (platId == 3) {
    // 快手
    return 'Access-Key'
  } else if (platId == 7) {
    // sigmob
    return 'Public-Key'
  } else if (platId == 6) {
    // 百度
    return 'Access-Key'
  } else if (platId == 11) {
    // Mintegral
    return 'skey'
  } else if (platId == 17) {
    // 聚力阅盟
    return 'Access-Key'
  }
}
export function getSecretLabel(platId) {
  if (platId == 13) {
    // 华为
    return 'client_secret'
  } else if (platId == 14) {
    // oppo
    return 'api_Key'
  } else if (platId == 12) {
    // 小米
    return 'appSecret'
  } else if (platId == 11) {
    // Mintegral
    return 'secret'
  } else {
    // 其他
    return 'Security-Key'
  }
}
export function getUserIdLabel(platId) {
  if (platId == 1 || platId == 2) {
    // 穿山甲 优量汇
    return 'ID'
  } else if (platId == 13) {
    // 华为
    return 'client_id'
  } else if (platId == 14) {
    // oppo
    return 'user_id'
  } else if (platId == 12) {
    // 小米
    return 'devid'
  }
}
export function getshowUserId(platId) {
  // 穿山甲，优量汇，华为，oppo，小米
  let arr = [1, 2, 12, 13, 14]
  if (arr.includes(platId)) {
    return true
  } else {
    return false
  }
}
export function getShowAccessKey(platId) {
  // 穿山甲，快手，sigmob，百度，Mintegral，聚力阅盟
  let arr = [1, 3, 7, 6, 11, 17]
  if (arr.includes(platId)) {
    return true
  } else {
    return false
  }
}
