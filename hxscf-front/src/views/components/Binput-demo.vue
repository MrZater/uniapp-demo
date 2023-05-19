<!--
 * @Author: jing.li
 * @Date: 2020-06-04 17:42:26
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:32:59
 * @Description: 文本框案例
--> 
<template>
  <div class="template-container">
    <ContentWrapper>
      <el-row>
        <el-col :span="4">
          <span class="labelInput">默认状态下的input:</span>
        </el-col>
        <el-col :span="8">
          <Binput size="medium" />
        </el-col>
        <el-col :span="4">
          <span class="labelInput">修改placeholder的input:</span>
        </el-col>
        <el-col :span="8">
          <Binput placeholder="请输入内容" />
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <span class="labelInput">无最大长度限制的input:</span>
        </el-col>
        <el-col :span="8">
          <Binput :maxlength="false" />
        </el-col>
        <el-col :span="4">
          <span class="labelInput">修改最大长度限制为100:</span>
        </el-col>
        <el-col :span="8">
          <Binput :maxlength="100" />
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <span class="labelInput">禁用的input:</span>
        </el-col>
        <el-col :span="8">
          <Binput disabled />
        </el-col>
        <el-col :span="4">
          <span class="labelInput">默认情况下的textarea</span>
        </el-col>
        <el-col :span="8">
          <Binput type="textarea" />
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <span class="labelInput">rows为4的textarea:</span>
        </el-col>
        <el-col :span="8">
          <Binput type="textarea"
                  :rows="4" />
        </el-col>
        <el-col :span="4">
          <span class="labelInput">禁用的textarea:</span>
        </el-col>
        <el-col :span="8">
          <Binput type="textarea"
                  :disabled="true"
                  :rows="4" />
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <span class="labelInput">自身则正则规则校验的Input:</span>
        </el-col>
        <el-col :span="8">
          <Binput :rules="rules" />
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <span class="labelInput">加入表单验证的input:</span>
        </el-col>
        <el-col :span="20">
          <el-form :model="numberValidateForm"
                   :inline="true"
                   ref="numberValidateForm">
            <el-form-item prop="info"
                          :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
              <Binput @input="val=>handleVal(val,'numberValidateForm','info')"
                      v-model="numberValidateForm.info" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         class="br-btn"
                         @click="submitForm('numberValidateForm')">提交</el-button>
              <el-button class="br-btn"
                         @click="resetForm('numberValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="4">
          <span class="labelInput">表单验证和内部校验都存在时input:</span>
        </el-col>
        <el-col :span="20">
          <el-form :model="validateForm"
                   :inline="true"
                   ref="validateForm">
            <el-form-item prop="info"
                          :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
              <Binput v-model="validateForm.info"
                      :rules="rules"
                      @input="val=>handleVal(val,'validateForm','info')"
                      @valid="getInputValid" />
            </el-form-item>
            <el-form-item prop="name"
                          :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
              <Binput v-model="validateForm.name"
                      :rules="rules1"
                      @input="val=>handleVal(val,'validateForm','name')"
                      @valid="getInputValid" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         class="br-btn"
                         @click="submitForm('validateForm')">提交</el-button>
              <el-button class="br-btn"
                         @click="resetForm('validateForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </ContentWrapper>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Binput from "@/components/Binput/index.vue";
import ContentWrapper from "@/components/ContentWrapper.vue";
@Component({
  components: { Binput, ContentWrapper }
})
export default class BinputDemo extends Vue {
  private numberValidateForm: any = {
    info: ""
  };
  private validateForm: any = {
    info: "",
    name: ""
  };
  private rules: Array<any> = [
    {
      type: "RegExp",
      reg: "^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$",
      message: "请输入正确的邮箱"
    }
  ];
  private rules1: Array<any> = [
    {
      type: "RegExp",
      reg: "^[\u4e00-\u9fa5]+$",
      message: "请输入汉字"
    }
  ];
  //Binput组件内部校验的结果
  private valid: Boolean = true;
  //提交
  private submitForm(formName: string): void {
    console.log(this[formName], "form");
    (this.$refs[formName] as any).validate(valid => {
      if (valid && this.valid) {
        alert("提交!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  //重置表单
  private resetForm(formName: string): void {
    (this.$refs[formName] as any).resetFields();
  }
  //input接受Binput组件的改变数据
  private handleVal(val: any, formName: string, propName: string): void {
    this[formName][propName] = val;
  }
  //接收Binput内部规则校验的结果
  private getInputValid(isPass: boolean): void {
    this.valid = isPass;
  }
}
</script>


<style lang="scss" scope>
.labelInput {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #637280;
}
</style>
