<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-28 13:44:01
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 11:35:07
 * @Description: 数据字典下拉框组件
 -->
<template>
  <el-select v-model="dictValue" :placeholder="placeholder" @change="handleChange" :disabled="disabled" filterable :multiple="multiple">
    <el-option value="" label="全部" v-if="showAll" key="all"></el-option>
    <el-option v-for="(item, index) in $store.state.common[dictType]
                ? $store.state.common[dictType]
                : []" :value="item.id" :label="item.value" :key="index"></el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class index extends Vue {
  @Prop() value;
  @Prop(String) dictType;
  @Prop({ default: false, type: Boolean }) showAll;
  @Prop({ default: false, type: Boolean }) disabled;
  @Prop({ default: false, type: Boolean }) multiple;
  @Prop({ default: "请选择", type: String }) placeholder;

  dictValue: any = "";
  @Watch("value", { deep: true, immediate: true })
  onChanged(val, oldVal) {
    this.dictValue = val;
  }

  handleChange(val) {
    this.$emit("change", val);
  }
}
</script>
<style lang="scss" scoped></style>