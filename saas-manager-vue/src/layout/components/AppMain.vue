<template>
  <section
    ref="appMain"
    class="app-main"
  >
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <backTop />
  </section>
</template>

<script>
import mainScroll from '@/mixins/mainScroll.js'
import backTop from '@/components/backTop'
export default {
  mixins: [mainScroll('appMain')],
  name: 'AppMain',
  components: {
    backTop
  },
  computed: {
    cachedViews() {
      return []
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  scroll-behavior: smooth;
  /* 50= navbar  50  */
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1) !important;
}

.fixed-header + .app-main {
  padding-top: 75px;
  height: 100%;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>
