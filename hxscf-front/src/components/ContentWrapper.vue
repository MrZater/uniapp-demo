<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-06-18 17:28:44
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-25 10:44:48
 * @Description: 内容
 -->
<template>
  <div class="template-content">
    <slot name="default"></slot>
    <div class="template-content-title">
      <slot name="title">
      </slot>

      <div class="template-content-title-extra">
        <slot name="extra-btn">

        </slot>
      </div>
    </div>
    <div class="template-content-main">
      <slot name="grid">

      </slot>
    </div>
    <div class="template-bottom-button">
      <slot name="bottom-btn">

      </slot>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class ContentWrapper extends Vue {
  //   @Prop(String) title!: string;
  //   @Prop({ default: false }) needBottomButton?: boolean;
}
</script>

<style scoped lang="scss">
</style>