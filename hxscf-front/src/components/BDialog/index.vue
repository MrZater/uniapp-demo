<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-05-18 10:31:01
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-14 12:45:54
 * @Description: Dialog二次封装
--> 

<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="appendToBody" @close="close" :show-close="showClose" class="br-dialog">

    <slot name="default"></slot>

    <div slot="footer" class="br-dialog-footer">
      <slot name="footer">

      </slot>
    </div>

  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class index extends Vue {
  @Prop(String) title
  @Prop(String) width
  @Prop(Boolean) visible
  @Prop({ default: true, type: Boolean }) showClose
  @Prop({ default: false, type: Boolean }) appendToBody

  get dialogVisible() {
    return this.visible
  }
  set dialogVisible(val) {}

  close() {
    this.$emit('close')
  }
}
</script>

<style scoped lang="scss">
</style>