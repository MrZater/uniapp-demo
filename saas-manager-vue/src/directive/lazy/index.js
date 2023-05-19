// 导入时间总线
import eventBus from '@/eventBus.js'
// 导入函数防抖工具
import debounce from '@/utils/debounce.js'
import getVideoBase64 from '@/utils/getVideoBase64.js'
import defaultGif from '@/assets/lazying.gif'

let imgs = []
/**
 * 对单个图片进行处理
 * @param {*} img
 */
function setImage(img) {
  // 无论如何，在图片未加载出来时，都用占位图片代替
  if (img.type == 'image') {
    img.dom.src = defaultGif
  } else {
    img.dom.poster = defaultGif
  }
  // 进行处理
  let rect = img.dom.getBoundingClientRect() // 得到图片的位置
  let clientHeight = document.documentElement.clientHeight // 得到视口高度
  let height = rect.height || 100 // 得到图片的大小
  // 判断图片是否在视口中显示
  if (rect.top >= -height && rect.top <= clientHeight) {
    let tempImg = null
    if (img.type == 'image') {
      // 创建一个代替img元素
      tempImg = new Image()
      // 当替代img元素中的图片加载完成时，替换掉占位图
      tempImg.onload = function() {
        img.dom.src = tempImg.src
      }
      // 用该替代img元素保存正确的src
      tempImg.src = img.src
    } else {
      tempImg = document.createElement('VIDEO')
      tempImg.onloadeddata = async function(e) {
        // 获取该视频的第一帧图片作为占位图
        let base64 = await getVideoBase64(img.src)
        img.dom.poster = base64
      }
      // 用该替代元素保存正确的src
      tempImg.src = img.src
    }
    // 将这个处理过的图片从imgs中过滤掉
    imgs = imgs.filter((i) => i !== img)
  }
}
/**
 * 对所有的图片进行处理
 */
function setImages() {
  for (let img of imgs) {
    setImage(img)
  }
}
/**
 * scrool事件触发执行的函数
 */
function handleScroll() {
  setImages()
}
// 监听mainScroll事件
eventBus.$on('mainScroll', debounce(handleScroll, 100))
export default {
  // inserted 被绑定元素插入父节点时调用  参数：指令绑定的元素  binding对象
  inserted(el, bindings) {
    // 得到图片DOM对象和src地址组成的对象
    let img = {
      type: el.tagName == 'IMG' ? 'image' : 'video',
      dom: el,
      src: bindings.value
    }
    // 将其保存到imgs数组中
    imgs.push(img)
    // 先对图片进行一次初始处理
    setImage(img)
  },
  // unbind 解绑时调用。
  unbind(el) {
    // 防止翻页时数据累加，将之前页的数据删掉
    imgs = imgs.filter(img => img.dom !== el)
  }
}
