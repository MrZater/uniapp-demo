<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-09 11:28:52
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-03-24 14:52:45
 * @Description: 输入框区间
 -->
<template>
  <div class="range-container">
    <el-input class="br-input" :placeholder="startPlaceholder" v-model.number.trim="start" @blur="handleInput('start')"></el-input>
    <span class="range-span">-</span>
    <el-input class="br-input" :placeholder="endPlaceholder" v-model.number.trim="end" @blur="handleInput('end')"></el-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class InputRange extends Vue {
  @Prop(Array) value;
  @Prop({ default: 0 }) min;
  @Prop([String, Number]) max;
  @Prop(String) startPlaceholder!: string;
  @Prop(String) endPlaceholder!: string;

  start: string = "";
  end: string = "";

  @Watch("value")
  onChange() {
    this.setDefaultValue();
  }

  created() {
    this.setDefaultValue();
  }
  setDefaultValue() {
    const val = this.value;
    if (val.length === 2) {
      this.start = val[0] !== null ? val[0] : "";
      this.end = val[1] !== null ? val[1] : "";
    } else {
      this.start = "";
      this.end = "";
    }
  }
  handleInput(which) {
    if (which === "start") {
      if (typeof this.start === "string")
        this.start = this.start.replace(/[^0-9.]/gi, "");
      if (this.end !== "" && this.start > this.end) {
        this.start = this.min;
      }
    } else {
      if (typeof this.end === "string")
        this.end = this.end.replace(/[^0-9.]/gi, "");
      if (this.start !== "" && this.start > this.end) {
        this.end = this.max;
      } else if (this.start === "") {
        this.start = this.min;
      }
    }
    let s, e;
    s = this.start !== "" ? this.start : null;
    e = this.end !== "" ? this.end : null;
    this.$emit("input", [s, e]);
  }
}
</script>

<style scoped lang="scss">
.range-container {
  display: inline-block;
  .br-input {
    width: 94px !important;
    .el-input__inner {
      width: 100%;
    }
  }
  .range-span {
    margin: 0 2px;
    display: inline-block;
  }
}
</style>