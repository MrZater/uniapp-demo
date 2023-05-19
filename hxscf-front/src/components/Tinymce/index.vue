<!--
@description:
@author: guoliang.li
@creationTime: 2020-05-30 15:57
-->
<template>
  <div>
    <Editor v-model="value" :init="editorInit" :disabled="disabled"></Editor>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
//引用tinymce插件
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/preview";
import "tinymce/plugins/media";
import "tinymce/plugins/charmap";
import "tinymce/plugins/print";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/paste";
import "tinymce/icons/default";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/directionality";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/template";
import "tinymce/plugins/hr";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/advlist";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/emoticons";

@Component({
  name: "tinymce",
  components: {
    Editor
  }
})
export default class Tinymce extends Vue {
  @Prop(Object) editorData;
  @Prop({ default: false, type: Boolean }) disabled;

  VALUE = {
    value: "",
    text: ""
  };
  value: string = "";
  text = "";
  private editorObj = {
    width: "",
    height: ""
  };

  public editorInit = {
    language_url: "/tinymce/langs/zh_CN.js",
    language: "zh_CN",
    skin_url: "/tinymce/skins/ui/oxide",
    emoticons_database_url: "/tinymce/skins/emojis.js",
    height: this.editorObj.height ? this.editorObj.height : 300,
    width: this.editorObj.width ? this.editorObj.width : "100%",
    plugins:
      "link lists image code table colorpicker textcolor wordcount contextmenu print preview searchreplace autolink directionality visualchars fullscreen media template charmap hr pagebreak nonbreaking anchor insertdatetime advlist imagetools textpattern paste emoticons ",
    toolbar:
      "code undo redo | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify  | \
                    formatselect fontselect fontsizeselect | bullist numlist | outdent indent blockquote subscript superscript removeformat | \
                    table image media emoticons charmap hr pagebreak insertdatetime | fullscreen ",
    branding: false,
    fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    font_formats:
      "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
    template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
    template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
    toolbar_drawer: false,
    paste_data_images: true //粘贴图片
  };

  // 获取输入的值
  @Watch("value")
  onChanged(val) {
    let activeEditor = tinymce.activeEditor;
    // 获取输入的值，没有html标签
    this.VALUE.text = activeEditor.getContent({ format: "text" });
    this.VALUE.value = activeEditor.getContent();
  }

  // 初始化
  mounted() {
    tinymce.init({});
  }

  // 清除输入
  clear() {
    let activeEditor = tinymce.activeEditor;
    this.VALUE = {
      text: activeEditor.setContent(""),
      value: activeEditor.setContent("")
    };
  }
}
</script>

<style scoped>
.tox-statusbar__branding {
  display: none;
}
</style>