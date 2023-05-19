<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-09 11:28:52
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-29 10:17:01
 * @Description: 折叠筛选条件
 -->
<template>
  <div>
    <div class="template-search-sort-icons" @click="currentActiveIndex=!currentActiveIndex">
      <slot name="text"></slot>
      <span>
        <i :class="['el-icon-caret-top',!currentActiveIndex?'active':'']"></i>
        <i :class="['el-icon-caret-bottom',currentActiveIndex?'active':'']"></i>
      </span>
    </div>

    <slot></slot>

    <span v-show="currentActiveIndex">
      <slot name="hidden"></slot>
    </span>
    <span v-show="!currentActiveIndex">
      <slot name="toggle"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class HiddenForm extends Vue {
  currentActiveIndex: boolean = false;
}
</script>

<style scoped lang="scss">
</style>