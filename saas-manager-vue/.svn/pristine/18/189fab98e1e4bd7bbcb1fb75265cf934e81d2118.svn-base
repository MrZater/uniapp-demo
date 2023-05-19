// 函数防抖
export default function(fn, duration = 1000) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, duration)
  }
}
