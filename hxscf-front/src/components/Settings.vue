<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 15:39:09
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:43:00
 * @Description: setting组件
 -->
<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <div class="switch-group">
        <span class="switch-label">多页签模式</span>
        <el-switch v-model="needTags"></el-switch>
      </div>

      <div class="switch-group">
        <span class="switch-label">固定头部</span>
        <el-switch v-model="fixedHeader"></el-switch>
      </div>
    </div>
    <!-- <div class="drawer-item">
      <div class="drawer-item-title">语言设置</div>
      <el-radio-group v-model="language"
                      @change="changeLanguage">
        <el-radio label="zh">中文</el-radio>
        <el-radio label="en">English</el-radio>
      </el-radio-group>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
const common = namespace("common");
import { getStore, setStore } from "@/utils/useStore";
@Component
export default class Settings extends Vue {
  @common.Action changeNeedTags;

  // language: string = "";
  // computed
  get needTags() {
    return this.$store.state.common.needTags;
  }
  set needTags(val) {
    this.changeNeedTags(val);
  }

  get fixedHeader() {
    return this.$store.state.common.fixedHeader;
  }
  set fixedHeader(val) {
    this.$store.dispatch("common/changeFixedHeader", val);
  }

  created() {
    // this.language = getStore("locale") ? getStore("locale") : "zh";
  }

  // changeLanguage(lan) {
  //   this.language = lan;
  //   this.$i18n.locale = lan;
  //   setStore("locale", lan);
  //   this.$message({
  //     message: "切换成功",
  //     type: "success"
  //   });
  // }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 0 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    border-bottom: 1px solid #e8e8e8;
    padding: 24px 0;
    .drawer-item-title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
      margin-bottom: 12px;
    }
    .img-check-box {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;
      .check-item {
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 10px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .switch-group {
      color: rgba(0, 0, 0, 0.65);
      margin: 20px 0;
      span {
        padding-right: 20px;
      }
      .switch-label {
        width: 65px;
        display: inline-block;
        vertical-align: middlel;
        text-align: right;
      }
    }
  }
}
</style>
