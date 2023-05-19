<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-06-24 10:26:57
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:30:50
--> 
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <el-form label-position="right"
                 label-width="150px"
                 v-model='formData'>
          <el-row>
            <el-col :span='12'>
              <!-- selectData：下拉框数据 OptionKey: option下key值 label: option下label值  value: 绑定的返回值-->
              <el-form-item label='普通select'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         placeholder='请选择客群类型'></Bselect>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='不展示全部'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :isShowAll='false'></Bselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label='获取value&label'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :getLabel='true'
                         @change='change'></Bselect>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='有icon的select'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :isShowAll='false'
                         :multiple='multiple'
                         :multipleLimit='2'>
                  <template slot="prefix"><i class='el-icon-edit'></i></template>
                </Bselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label='有禁选select'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroupDisable'
                         OptionKey='dictName'
                         label='desc'></Bselect>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='禁用状态'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :disabled='true'></Bselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label='分组'
                            class="br-form-item-label">
                <Bselect :selectData='options'
                         OptionKey='dictName'
                         label='desc'
                         :isGroup='true'></Bselect>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='多选(限制长度)'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :isShowAll='false'
                         :multiple='multiple'
                         :multipleLimit='2'></Bselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label='多选(数组)'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :isShowAll='false'
                         :multiple='multiple'
                         @change='change'
                         returnType='array'></Bselect>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='多选(字符串)'
                            class="br-form-item-label">
                <Bselect :selectData='guestGroup'
                         OptionKey='dictName'
                         label='desc'
                         :isShowAll='false'
                         :multiple='multiple'
                         @change='change'
                         returnType=','></Bselect>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bselect from "@/components/BSelect/index.vue";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper,
    Bselect
  }
})
export default class BProvinceDemo extends Vue {
  public formData: any = {};
  public multiple: Boolean = true;
  public guestGroup: Array<any> = [
    {
      dictName: "0",
      desc: "线上现金分期"
    },
    {
      dictName: "1",
      desc: "线下现金分期"
    },
    {
      dictName: "2",
      desc: "线上消费分期"
    }
  ];
  public guestGroupDisable: Array<any> = [
    {
      dictName: "0",
      desc: "线上现金分期",
      disabled: true
    },
    {
      dictName: "1",
      desc: "线下现金分期"
    },
    {
      dictName: "2",
      desc: "线上消费分期"
    }
  ];
  public options: Array<any> = [
    {
      desc: "热门城市",
      options: [
        {
          dictName: "Shanghai",
          desc: "上海"
        },
        {
          dictName: "Beijing",
          desc: "北京"
        }
      ]
    },
    {
      desc: "城市名",
      options: [
        {
          dictName: "Chengdu",
          desc: "成都"
        },
        {
          dictName: "Shenzhen",
          desc: "深圳"
        },
        {
          dictName: "Guangzhou",
          desc: "广州"
        },
        {
          dictName: "Dalian",
          desc: "大连"
        }
      ]
    }
  ];

  change(value: any) {
    console.log(value);
  }
}
</script>