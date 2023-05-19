<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-07-12 11:11:19
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-08-14 11:34:45
 * @Description: 图标选择器
 -->
<template>
  <div class="icon-selector_container">
    <div class="icon-selector">
      <el-popover trigger="click"
                  ref="popover"
                  width="300">
        <div class="icon-tab">
          <el-tabs v-model="activeName"
                   stretch
                   class="tabs-content">
            <el-tab-pane v-for="(item,index) in icons"
                         :label="item.title"
                         :name="index+''"
                         :key="index">
              <div class="icon-groups"
                   v-if="item.type == 'built-facet' || item.type == 'built-linear'">
                <div v-for="icon in item.icons"
                     :key="item.type+index+icon"
                     :class="`${icon==selectIcon?'active icon':'icon'}`">
                  <i :id="icon"
                     :class="`el-icon-${icon}`"
                     @click="onSelect($event, item.type, icon)" />
                </div>
              </div>
              <div class="icon-groups"
                   v-if="item.type == 'user-defined'">
                <div v-for="icon in item.icons"
                     :key="item.type+index+icon"
                     :class="`${icon==selectIcon?'active icon':'icon'}`">
                  <i :id="icon"
                     :class="`${family} ${icon}`"
                     @click="onSelect($event, item.type, icon)" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="icon-selector_input br-input-large"
             slot="reference"
             ref="container">
          <i :class="`select-icon ${getSelectedClass()}`"
             v-if="value"></i>
          <i class="el-icon-arrow-down"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import icons from "./icon";
@Component
export default class BIconSelector extends Vue {
  /**
   * @prop {boolean} multiple 是否可以多选
   */
  @Prop() multiple;
  @Prop() value;
  @Prop() family;

  @Watch("value")
  onchanged(newVal) {
    if (newVal) {
      let [type, icon] = newVal.split("/");
      this.selectIcon = icon || "";
      this.selectType = type || "";

      let activeIndex = icons.map(i => i.type).findIndex(t => t == type);

      this.activeName = activeIndex > -1 ? activeIndex + "" : "0";
    } else {
      this.selectIcon = "";
      this.selectType = "";
      this.activeName = "0";
    }
  }
  icons = icons;
  activeName: string = "0";
  selectIcon: string = "";
  selectType: string = "";

  mounted() {
    let [type, icon] = this.value ? this.value.split("/") : ["", ""];
    this.selectIcon = icon || "";
    this.selectType = type || "";
    let activeIndex = icons.map(i => i.type).findIndex(t => t == type);
    this.activeName = activeIndex > -1 ? activeIndex + "" : "0";
  }

  onSelect(e, type, icon) {
    this.selectType = type;
    this.selectIcon = icon;
    this.$refs.popover["doClose"]();
    this.$emit("input", `${type}/${icon}`);
  }
  getSelectedClass() {
    if (this.selectType) {
      switch (this.selectType) {
        case "built-facet":
        case "built-linear":
          return `el-icon-${this.selectIcon}`;
          break;
        case "user-defined":
          return `${this.selectIcon} ${this.family}`;
          break;
        default:
          return;
          break;
      }
    } else {
      return "";
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
$borderColor: #dcdfe6;
$fontColor: #c0c4cc;
.icon-selector_container {
  line-height: $height;
  .icon-selector {
    height: $height;
    line-height: $height;

    .icon-selector_input {
      height: $height;
      display: inline-block;
      border: 1px solid $borderColor;
      border-radius: 4px;
      vertical-align: middle;
      position: relative;
      box-sizing: border-box;
      .select-icon {
        position: absolute;
        top: 5px;
        left: 12px;
        width: 18px;
        height: 18px;
        color: #555;
        font-size: 14px;
        line-height: 18px;
      }
      i {
        transition: all 0.4s;
        position: absolute;
        top: 8px;
        right: 9px;
        color: $fontColor;
        font-size: 14px;
      }
    }
  }
}
.icon-tab {
  .icon-groups {
    max-height: 260px;
    overflow-y: auto;
    .icon {
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 30px;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      i {
        font-size: 18px;
      }
    }
    .active {
      background: #409eff;
    }
  }
}
</style>