<template>
  <div
    v-show="show"
    class="to-top-container"
    @click="handleClick"
  >
    Top
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll)
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll)
  },
  methods: {
    //   时间总线中mainScroll的处理函数
    handleScroll(dom) {
      if (!dom) {
        this.show = false
        return
      }
      this.show = dom.scrollTop >= 100
    },
    // click处理函数
    handleClick() {
      this.$bus.$emit('setMainScroll', 0)
    }
  }
}
</script>

<style scoped lang="scss">
.to-top-container {
  background-color: #499be8;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99999999;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
}
</style>
