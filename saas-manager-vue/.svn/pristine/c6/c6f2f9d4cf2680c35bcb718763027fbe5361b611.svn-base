export default function(refValue) {
  return {
    mounted() {
      // 监听主区域的滚轮滚动事件
      this.$refs[refValue].addEventListener('scroll', this.handleMainScroll)
      this.$bus.$on('totop', this.scrollTotop)

      // 监听setMainScroll 设置主区域滚动条事件
      this.$bus.$on('setMainScroll', this.handleSetMainScroll)
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll')
      // 组件销毁时，移除滚动条滚动事件
      this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll)
      this.$bus.$on('totop')
      // 移除设置主区域滚动事件
      this.$bus.$off('setMainScroll', this.handleSetMainScroll)
    },
    methods: {
      // 自定义图片懒加载事件触发
      handleMainScroll() {
        this.$bus.$emit('mainScroll', this.$refs[refValue])
      },
      scrollTotop(ref = this.$refs[refValue]) {
        ref.scrollTo(0, 0)
      },
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop
      }
    }
  }
}
