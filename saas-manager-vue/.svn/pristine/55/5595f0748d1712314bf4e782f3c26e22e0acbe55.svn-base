/**
 * 移除localstorage不需要的缓存
 * @param {*} oldpartkey 该类缓存的名称公告部分
 * @param {*} newkey
 */
export function clearStorage(oldpartkey, newkey) {
  let storage = window.localStorage
  for (let i = 0; i < storage.length - 1; i++) {
    let key = storage.key(i)
    if (key && key.includes(oldpartkey) && key != newkey) {
      localStorage.removeItem(key)
    }
  }
}
