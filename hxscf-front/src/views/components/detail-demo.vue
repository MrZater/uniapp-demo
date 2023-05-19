<!--
 * @Author: weiwei.xue
 * @Date: 2020-06-01 09:52:45
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:35:58
 * @Description: 
--> 
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <div class="sub-title">两列展示</div>
        <ViewContent :labels="labelsData1"
                     :data="dataAll1"
                     :showColumn="2" />

        <div class="sub-title">三列展示</div>
        <ViewContent :labels="labelsData2"
                     :data="dataAll2"
                     :showColumn="3" />
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { Pages, ViewContent } from "@/components";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper,
    ViewContent
  }
})
export default class Detail extends Vue {
  //   详情组件示例数据
  labelsData1: Array<object> = [
    { label: "姓名", column: "name" },
    {
      label: "性别",
      column: "sex",
      type: "option",
      options: { "0": "男", "1": "女" }
    },
    { label: "年龄", column: "age" },
    {
      label: "艺名",
      column: "otherName",
      type: "custom",
      transform: data => {
        return data.name + "-" + data.profess;
      }
    },
    { label: "职业", column: "profess", long: true },
    { label: "日期格式", column: "date", type: "date" },
    { label: "时间格式", column: "date", type: "time" },
    { label: "金额格式", column: "money", type: "money" },
    { label: "值为空", column: "optionsAll" },
    {
      label: "自定义",
      column: "contentCustom",
      render: data => {
        return `<h5>${data.contentCustom}</h5>`;
      }
    },
    {
      label: "爱好",
      column: "like"
    },
    {
      label: "去过的地方",
      type: "option",
      column: "area",
      options: { 0: "张家口", 1: "内蒙", 2: "陕西", 3: "山西", 4: "山东" }
    }
  ];
  dataAll1: any = {
    name: "薛维维",
    sex: "0",
    age: 18,
    otherName: "薛漂亮",
    profess: "老板娘",
    date: new Date(),
    money: "200000000",
    optionsAll: "",
    contentCustom: "自定义地址",
    like: ["喝", "吃", "玩"],
    area: [0, 3, 4]
  };

  labelsData2: Array<object> = [
    { label: "超长展示字段最长十字", column: "name", longLabel: true },
    {
      label: "性别码值返回",
      column: "sex",
      type: "alreadyData",
      alreadyType: "sexTypeId"
    },
    { label: "年龄1", column: "age" },
    {
      label: "自定义展示",
      column: "otherName",
      type: "custom",
      transform: data => {
        return data.name + "-" + data.profess;
      }
    },
    { label: "职业1", column: "profess" },
    { label: "日期格式1", column: "date", type: "date" },
    { label: "时间格式1", column: "date", type: "time" },
    { label: "金额格式1", column: "money", type: "money" },
    { label: "值为空1", column: "optionsAll" },
    {
      label: "自定义render",
      column: "contentCustom",
      render: data => {
        return `<a href="${data.contentCustom}" style="color:red" target="_blank">地址</a>`;
      }
    },
    {
      label: "数组文字返回",
      column: "like"
    },
    {
      label: "数组码值返回",
      type: "option",
      column: "area",
      options: { 0: "张家口", 1: "内蒙", 2: "陕西", 3: "山西", 4: "山东" }
    }
  ];
  dataAll2: any = {
    name: "黄轩",
    sex: "0",
    age: 18,
    otherName: "薛漂亮",
    profess: "演员",
    date: new Date(),
    money: "2000",
    optionsAll: "",
    contentCustom: "https://weibo.com/huangxuan8533",
    like: ["帅", "酷", "炸"],
    area: [0, 3, 4]
  };
}
</script>
