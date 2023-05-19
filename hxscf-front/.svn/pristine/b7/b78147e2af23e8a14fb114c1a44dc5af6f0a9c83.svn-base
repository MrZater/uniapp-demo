<!--
 * @Author: mingliang.zhu
 * @Date: 2020-05-18 11:14:54
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-16 16:55:53
 * @Description: 
--> 
<template>
  <el-row>
    <el-col :span="item.long?24:spanColumn" v-for="(item,index) in labels && labels" :key="index">
      <!-- 下拉框返显码值 -->
      <template>
        <div class="detail__item" v-if="item.type == 'option'">
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content">{{changeOptions(item.options,data[item.column])}}</span>
        </div>
      </template>
      <!-- 时间||日期 -->
      <template v-if="item.type == 'date' || item.type == 'time'">
        <div class="detail__item">
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content" v-if="item.type == 'date'">{{data[item.column] | date}}</span>
          <span class="detail__item_content" v-else>{{data[item.column] | time}}</span>
        </div>
      </template>
      <!-- 自定义展示 custom-->
      <template v-if="item.type == 'custom'">
        <div class="detail__item">
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content">{{item.transform(data)}}</span>
        </div>
      </template>
      <!-- 金额 -->
      <template v-if="item.type == 'money'">
        <div class="detail__item">
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content">{{data[item.column] | money}}</span>
        </div>
      </template>
      <!-- alreadyData 已经存在的数据 -->
      <template v-if="item.type == 'alreadyData'">
        <div class="detail__item">
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content"> {{$code(item.alreadyType,data[item.column]) }}</span>
        </div>
      </template>
      <!-- 正常 -->
      <template v-if="!item.type">
        <!-- render 自定义组件 -->
        <div class="detail__item" v-if="item.render">
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content" v-html="item.render(data)">{{ item.render(data)}}</span>
        </div>
        <!-- 值存在 ? (数组 ? 逗号分割展示 : 正常展示) : (展示-)  -->
        <div class="detail__item" v-else>
          <span :class="['detail__item_label',item.longLabel ? 'width150':'width100']">{{item.label}}</span>
          <span class="detail__item_content">{{data[item.column] ? (judgeType(data[item.column])?changevalueArray(data[item.column]):data[item.column]): '-'}}</span>
        </div>
      </template>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component
export default class ViewContent extends Vue {
  @Prop() data //数据
  @Prop(Array) labels // 标签文本
  @Prop() showColumn // 展示几列

  // 控制label宽度

  // 展示列数处理
  get spanColumn() {
    let col = 24
    if (this.showColumn == 3) {
      col = 8
    } else if (this.showColumn == 2) {
      col = 12
    } else {
      col = 24
    }
    return col
  }

  changevalueArray(arr) {
    let str = arr.map(i => i).join(',')
    return arr.length > 0 ? str : '-'
  }
  judgeType(data) {
    return typeof data == 'object' && data.constructor == Array
  }
  //  选项处理数据
  changeOptions(data, code) {
    let name: string = ''
    if (this.judgeType(code)) {
      let array: Array<string> = []
      for (let i = 0, len = code.length; i < len; i++) {
        array.push(data[code[i]])
      }
      name = array.map(i => i).join(',')
    } else {
      name = data[code]
    }
    return name
  }
}
</script>
<style lang="scss" scoped>
.detail__item {
  line-height: 30px;
}
.detail__item_label {
  &.width100 {
    width: 80px;
  }
  &.width150 {
    width: 120px;
  }
  text-align: right;
  color: #666;
  padding-right: 20px;
  vertical-align: middle;
  display: inline-block;
  color: #606266;
  position: relative;
  &::before {
    content: ':';
    position: absolute;
    display: block;
    top: 0px;
    right: 11px;
  }
}
.detail__item_label_large {
  width: 150px;
}
.detail__item_content {
  color: #333;
  display: inline-block;
}
</style>