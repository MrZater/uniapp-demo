<template>
  <div class="tips-container">
    <el-popover
      v-if="isShow"
      :content="content"
      placement="top-start"
      :width="width"
      trigger="hover"
    >
      <div slot="reference">
        {{ title }}
        <i
          class="iconfont icon-wenhao"
          style="cursor: pointer; margin-left: 5px"
        />
      </div>
    </el-popover>
    <el-popover
      v-else
      :content="content"
      placement="top-start"
      :width="width"
    >
      <div slot="reference">
        {{ title }}
        <i
          v-show="isShow"
          class="iconfont icon-wenhao"
          style="cursor: pointer; margin-left: 5px"
        />
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'HelpHint',
  props: {
    content: { default: '' },
    title: { default: '' },
    isShow: { default: true },
    width: { default: 200 }
  },

  data() {
    return {}
  }
}
</script>
<style scoped>
.tips-container {
  display: inline-block;
}
.iconfont {
  color: #ddd9d9;
  /* font-size: 23px; */
}
</style>

