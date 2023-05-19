<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-05-26 10:06:58
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 10:58:45
 * @Description: Bmessage使用示例
--> 
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <el-button type="primary" class="br-btn-large" @click="handleMore">点我弹出多次</el-button>

        <el-button type="primary" class="br-btn-large" @click="handleOnce">点我弹出一次</el-button>

      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper
  }
})
export default class BmessageDemo extends Vue {
  handleMore() {
    this.$Bmessage({
      type: "success",
      message: "允许弹出多条信息哦",
      more: true
    });
  }

  handleOnce() {
    this.$Bmessage({
      type: "error",
      message: "不允许弹出多条信息哦"
    });
  }
}
</script>