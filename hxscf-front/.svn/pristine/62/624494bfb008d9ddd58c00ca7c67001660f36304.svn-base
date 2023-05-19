<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-05-26 10:06:58
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-05-26 10:58:56
 * @Description: BDialog使用示例
--> 
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <el-button type="primary" class="br-btn-large" @click="dialogVisible=true;">打开可拖拽dialog</el-button>
        <el-button type="primary" class="br-btn-large" @click="dialogWidthVisible=true;">打开可拖拽、可缩放dialog</el-button>

        <B-dialog title="可拖拽" :visible="dialogVisible" width="460px" @close="handleCancel" v-dialogDrag>
          <el-form :model="dialogFrom" :rules="rules" ref="forms" label-width="90px" size="small">
            <el-form-item class="br-form-item-label" label="姓名" prop="realName">
              <el-input class="br-input-large" placeholder="请输入姓名" v-model.trim="dialogFrom.realName"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="手机号" prop="phoneNo">
              <el-input class="br-input-large" placeholder="请输入手机号" v-model.trim="dialogFrom.phoneNo"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="性别" prop="sex">
              <el-select class="br-select-large" v-model="dialogFrom.sex" placeholder="请选择性别">
                <el-option key="1" label="男" value="1"></el-option>
                <el-option key="2" label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template slot="footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
          </template>
        </B-dialog>

        <B-dialog title="双击标题进入全屏、可拖拽、可缩放" :visible="dialogWidthVisible" width="580px" @close="dialogWidthVisible=false;" v-dialogDragWidth>

          <el-table :data="tableData" stripe class="br-table">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
          </el-table>
          <template slot="footer">
            <el-button class="br-btn-large" type="primary" @click="dialogWidthVisible=false;">关闭</el-button>
          </template>
        </B-dialog>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BDialog } from "@/components";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper,
    BDialog
  }
})
export default class BDialogDemo extends Vue {
  dialogFrom = {
    realName: "",
    phoneNo: "",
    sex: ""
  };
  btnloading: boolean = false;
  dialogVisible: boolean = false;
  dialogWidthVisible: boolean = false;

  rules: object = {
    realName: [{ required: true, trigger: "blur", message: "请输入姓名" }],
    phoneNo: [
      { trigger: "blur", message: "请输入手机号", required: true },
      { pattern: /^1\d{10}$/, trigger: "blur", message: "请输入正确格式的号码" }
    ]
  };

  tableData: Array<object> = [
    {
      name: "张勇",
      phone: "18867459089",
      sex: "男"
    },
    {
      name: "王晶晶",
      phone: "15817924509",
      sex: "女"
    },
    {
      name: "赵四儿",
      phone: "13356678009",
      sex: "男"
    }
  ];

  handleSubmit() {
    let $ele: any = this.$refs["forms"];
    $ele.validate(valid => {
      if (valid) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.handleCancel();
      }
    });
  }

  handleCancel() {
    let $ele: any = this.$refs["forms"];
    $ele.resetFields();
    this.dialogVisible = false;
  }
}
</script>