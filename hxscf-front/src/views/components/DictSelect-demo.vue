<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-05-26 10:06:58
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-27 13:47:39
 * @Description: DictSelect使用示例
--> 
<template>
  <div class="template-container" v-dictType="['cust_source','loan_usages']">
    <content-wrapper>
      <template slot="grid">
        <el-form :model="dialogForm" inline ref="forms" label-width="140px" size="small">
          <el-form-item class="br-form-item-label" label="常规显示" prop="value1">
            <dictSelect dictType="cust_source" @change="(val)=>changeSelect(val,'value1')" v-model="dialogForm.value1" class="br-select" />
          </el-form-item>
          <el-form-item class="br-form-item-label" label="禁止编辑" prop="value2">
            <dictSelect dictType="loan_usages" @change="(val)=>changeSelect(val,'value2')" v-model="dialogForm.value2" disabled class="br-select" />
          </el-form-item>
          <el-form-item class="br-form-item-label" label="展示全部" prop="value3">
            <dictSelect dictType="loan_usages" @change="(val)=>changeSelect(val,'value3')" v-model="dialogForm.value3" showAll class="br-select" />
          </el-form-item>
          <el-form-item class="br-form-item-label" label="自定义placeholder" prop="value4">
            <dictSelect dictType="loan_usages" @change="(val)=>changeSelect(val,'value4')" v-model="dialogForm.value4" placeholder="请进行选择" class="br-select" />
          </el-form-item>
          <el-form-item class="br-form-item-label" label="多选" prop="value5">
            <dictSelect dictType="loan_usages" @change="(val)=>changeSelect(val,'value5')" v-model="dialogForm.value5" multiple class="br-select" />
          </el-form-item>
        </el-form>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper
  }
})
export default class DictSelectDemo extends Vue {
  dialogForm = {
    value1: "1",
    value2: "3",
    value3: "",
    value4: "",
    value5: ["1", "5"]
  };

  changeSelect(val, type) {
    this.dialogForm[type] = val;
  }
}
</script>