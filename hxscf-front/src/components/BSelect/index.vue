<!--
 * @Descripttion: 普通select 二次封装
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-05-26 10:04:15
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-06-24 17:40:24
--> 
<template>
    <el-select v-model="selectValue"
      :name='name'
      :autocomplete='autocomplete'
      :placeholder="placeholder"
      :size='size' 
      :disabled='disabled'
      :value-key="OptionKey"
      clearable 
      filterable 
      :multiple='multiple'
      :collapse-tags='collapseTags'
      :multiple-limit='multipleLimit'
      :loading='loading'
      :loading-text='loadingText'
      :popper-append-to-body='popperAppendToBody'
      :automatic-dropdown='automaticDropdown'
      @change='change'
      @visible-change='visibleChange'
      @clear='clear'
      @blur='blur'>
      <template slot="prefix">
        <slot name='prefix'></slot>
      </template>
      <template v-if='isGroup'>
        <el-option-group v-for="group in selectData" :key="group[label]" :label="group[label]"> 
          <el-option v-for="(item, index) in group.options" :key="index" :label="item[label]" :value="getLabel ? item: item[OptionKey]" :disabled="item.disabled">
          </el-option>
        </el-option-group>
      </template>
      <template v-else>
        <!-- slot用来自定义 -->
        <el-option :value="getLabel ? '' : {value: '', label: '全部'}" label='全部' v-if='isShowAll'></el-option>
        <el-option v-for="(item,index) in selectData" :key="index" :value='getLabel ? item: item[OptionKey]' :label='item[label]' :disabled="item.disabled">
          <slot></slot>
          <slot></slot>
        </el-option>
      </template>
    </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Bselect extends Vue {
  public selectValue: any = ''
  @Prop(String) returnType;   // 绑定值
  @Prop(String) label;
  @Prop({default: false, type: Boolean}) multiple; // 是否多选
  @Prop({default: false, type: Boolean}) collapseTags;  // 多选时是否将选中值文字展示
  @Prop({default: 0, type: Number}) multipleLimit;  // 多选时用户最多可以选择的数目  为0则不限制
  @Prop({default: 'small',type: String}) size;
  @Prop({default: false, type: Boolean}) isGroup;  // 是否对备选选项进行分组
  @Prop({default: false, type: Boolean}) disabled;
  @Prop({default: 'off', type: String}) autocomplete;
  @Prop({default: true, type: Boolean}) isShowAll;
  @Prop(String) name;
  @Prop(String) OptionKey;
  @Prop(Array) selectData;
  @Prop(String) placeholder;
  @Prop({default: false, type: Boolean}) loading;
  @Prop(String) loadingText;
  @Prop({default: true, type: Boolean}) popperAppendToBody;  // 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false
  @Prop({default: false, type: Boolean}) automaticDropdown;   // 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单
  @Prop({default: false, type: Boolean}) getLabel;  //   是否获取label


  change(val: any){
    this.$emit('change', this.multiple ? (this.returnType === 'array' ? val : val.join(this.returnType)) : val)
  }

  visibleChange(){
    this.$emit('visibleChange')
  }
  
  clear() {
    this.$emit('clear')
  }

  blur(event) {
    this.$emit('blur', event)
  } 
}
</script>