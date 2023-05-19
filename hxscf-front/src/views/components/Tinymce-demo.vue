<!--
@description:
@author: guoliang.li
@creationTime: 2020-05-30 16:43
-->
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <Tinymce :editorData="editorData" ref="editor" :disabled="disabled" />

        <div class="sub-gap"></div>
        <el-button size="mini" @click="cli">清除数据</el-button>
        <el-button size="mini" @click="datas">获取数据</el-button>
        <el-button size="mini" @click="dis">{{this.disabled ? '解除禁用' : '禁用'}}</el-button>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Tinymce } from "@/components";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  name: "tinymce-demo",
  components: {
    "content-wrapper": ContentWrapper,
    Tinymce
  }
})
export default class TinymceDemo extends Vue {
  disabled = false; // 是否禁用
  editorData = {
    // 给富文本传递宽或者高
    height: 500,
    width: 700
  };

  /*===================测试，案例=================================*/

  cli() {
    (this.$refs.editor as Tinymce).clear();
  }
  datas() {
    console.log("====================================");
    console.log((this.$refs.editor as Tinymce).VALUE);
    console.log("====================================");
  }
  dis() {
    this.disabled = !this.disabled;
  }
  /*===================测试，案例=================================*/
}
</script>

<style scoped>
</style>