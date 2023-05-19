// 获取video第一帧图片作为占位图
export default function(url) {
  return new Promise(async function(resolve, reject) {
    let dataURL = ''
    let video = await document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous') // 处理跨域
    video.setAttribute('src', url)
    video.setAttribute('preload', 'auto')
    video.addEventListener('loadeddata', function(e) {
      // 获取视频原长宽
      let vheight = e.target.videoHeight
      let vwidth = e.target.videoWidth
      let ratio = vheight / vwidth
      let canvas = document.createElement('canvas')
      let width = 395 // canvas的尺寸和图片一样
      let height = 395 * ratio
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(video, 0, 0, width, height) // 绘制canvas
      dataURL = canvas.toDataURL('image/jpeg') // 转换为base64
      resolve(dataURL)
    })
  })
}
