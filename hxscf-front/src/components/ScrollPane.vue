<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-04-24 18:00:53
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-26 11:32:39
 * @Description: tag滚动组件
 -->
<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
const tagAndTagSpacing = 4; // tagAndTagSpacing
@Component
export default class ScrollPane extends Vue {
  get scrollWrapper() {
    return this.$refs.scrollContainer["$refs"].wrap;
  }

  handleScroll(e) {
    const eventDelta = e.wheelDelta || -e.deltaY * 40;
    const $scrollWrapper = this.scrollWrapper;
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
  }
  moveToTarget(currentTag) {
    const $container = this.$refs.scrollContainer["$el"];
    const $containerWidth = $container.offsetWidth;
    const $scrollWrapper = this.scrollWrapper;
    const tagList: any = this.$parent.$refs.tag;
    let firstTag = null;
    let lastTag = null;

    // find first tag and last tag
    if (tagList.length > 0) {
      firstTag = tagList[0];
      lastTag = tagList[tagList.length - 1];
    }

    if (firstTag === currentTag) {
      $scrollWrapper.scrollLeft = 0;
      // console.log("当前是第一个", $scrollWrapper.scrollLeft)
    } else if (lastTag === currentTag) {
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
      // console.log("当前是最后一个", $scrollWrapper.scrollLeft)
    } else {
      // find preTag and nextTag
      const currentIndex = tagList.findIndex(item => item === currentTag);
      const prevTag = tagList[currentIndex - 1];
      const nextTag = tagList[currentIndex + 1];

      // the tag's offsetLeft after of nextTag
      const afterNextTagOffsetLeft =
        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

      // the tag's offsetLeft before of prevTag
      const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

      if (
        afterNextTagOffsetLeft >
        $scrollWrapper.scrollLeft + $containerWidth
      ) {
        $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
      } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
        $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
      }

      // console.log("其他", $scrollWrapper.scrollLeft)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
