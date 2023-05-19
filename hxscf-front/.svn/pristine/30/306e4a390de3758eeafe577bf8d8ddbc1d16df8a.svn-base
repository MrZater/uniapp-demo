<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-10 09:39:31
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-16 17:15:45
 * @Description: 
-->
<template>
    <el-dialog :title="dialogType == '2'? '编辑': '新增'" :visible="dialogVisible" width="470px" :close-on-click-modal="false" @close="resetForm" class="br-dialog">
        <el-form :model="orgDialogForm" label-width="100px" :rules="rules" ref="forms" size="small">
            <el-form-item class="br-form-item-label" label="上级机构" prop="orgPcode" v-if="orgDialogForm.orgCode != 'system'">
                <el-select v-if="dialogType == '1'" v-model="orgDialogForm.orgPcode" placeholder="请选择上级机构" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="orgList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
                <el-select v-if="dialogType != '1'" :disabled="dialogType == '3' || dialogType== '2' " v-model="orgDialogForm.orgPcode" placeholder="请选择上级机构" class="br-select-large">
                    <el-option v-for="(item,index) in orgPCodeList" :key="index" :value="item.orgCode" :label="item.orgName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="机构名称" prop="orgName">
                <el-input class="br-input-large" placeholder="请输入机构名称" v-model.trim="orgDialogForm.orgName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="机构类型" prop="orgFlag" v-if="dialogType == '1' || dialogType == '3'">
                <el-select v-model="orgDialogForm.orgFlag" placeholder="请选择机构类型" class="br-select-large" @change="orgFlagChange">
                    <el-option v-for="(item,index) in $select('orgTypes')" :key="index" :value="item.value" :label="item.text"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组织代码" prop="orgNo" class="br-form-item-label" v-if="orgDialogForm.flag != '1' ">
                <el-input v-model.trim="orgDialogForm.orgNo" placeholder="请输入组织代码" auto-complete="off" class="br-input-large"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" prop="orgOrder" class="br-form-item-label">
                <el-input v-model.trim="orgDialogForm.orgOrder" placeholder="请输入显示顺序" auto-complete="off" class="br-input-large"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" size="small" @click="submitDataFN('forms')" class="br-btn-large" :loading="btnloading">保存</el-button>
            <el-button @click="resetForm" size="small" class="br-btn-large">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
const organizationManage = namespace("orgManage");
@Component({})
export default class Dialog extends Vue {
    @organizationManage.Action queryOrgList;
    @organizationManage.State orgList;
    @organizationManage.Action queryAddOrg;
    @organizationManage.State orgPCodeList; //  组织机构新建-编辑 使用--上级机构

    @Prop(Object) orgDialogData;
    @Prop(String) dialogType;

    dialogVisible: boolean = false;
    btnloading: boolean = false;
    orgDialogForm: any = {
        orgFlag: "", //机构类型
        orgName: "", //机构名称
        orgOrder: "", //显示顺序
        orgPcode: "", //上级机构
        orgNo: "", // 组织代码
        orgPname: "", // 用來处理
        flag: "",
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    //   orgPcode: any = '' // dialogType=3用该值
    rules = {
        orgPcode: [
            { message: "请选择上级机构", trigger: "change", required: true },
        ],
        orgName: [
            { required: true, message: "请输入机构名称", trigger: "blur" },
            //   { max: 20, message: '最多输入20个字符!', trigger: 'blur' }
        ],
        orgFlag: [
            { message: "请选择机构类型", trigger: "change", required: true },
        ],
        orgNo: [{ message: "请输入显示顺序", trigger: "blur", required: true }],
    };
    @Watch("orgDialogData")
    onChange(val) {
        if (val) {
            this.orgDialogForm = Object.assign({}, val);
        }
    }
    @Watch("dialogVisible")
    onchange(val) {
        if (val) {
            //   this.queryOrgList({})
        }
    }
    //点击机构的节点
    onLeavesClick(data, node, el) {
        this.orgDialogForm["orgPname"] = data.id;
        this.orgDialogForm["orgPcode"] = data.label;
        this.$refs.treeSelect["handleClose"]();
    }
    orgFlagChange(val) {
        this.orgDialogForm.orgFlag = val;
        this.orgDialogForm.flag = val;
        if (val == "1") {
            this.orgDialogForm.orgNo = "";
        }
    }
    created() {}
    //关闭弹框
    close() {
        this.dialogVisible = false;
    }
    // 打开弹框
    open() {
        this.dialogVisible = true;
    }
    // 确定新增
    submitDataFN(formName) {
        this.$refs[formName]["validate"]((valid) => {
            if (valid) {
                //机构管理--新增/编辑--企业类型为部门时组织代码框隐藏
                if (this.orgDialogForm.orgFlag == "1") {
                    this.orgDialogForm.orgNo = "";
                }
                if (this.dialogType == "2") {
                    this.orgDialogForm.orgFlag = "";
                }
                let param = {
                    orgFlag: this.orgDialogForm.orgFlag, //机构类型
                    orgName: this.orgDialogForm.orgName, //机构名称
                    orgOrder: this.orgDialogForm.orgOrder, //显示顺序
                    orgPcode:
                        this.dialogType == "1"
                            ? this.orgDialogForm.orgPname
                            : this.orgDialogForm.orgPcode,
                    orgNo: this.orgDialogForm.orgNo, // 组织代码
                };
                let param1 = { ...param, orgCode: this.orgDialogData.orgCode };
                let lastPra = this.dialogType == "2" ? param1 : param;
                this.submit(lastPra);
            }
        });
    }
    // 提交表单
    submit(params) {
        this.btnloading = true;
        this.queryAddOrg(params).then((msg) => {
            this.btnloading = false;
            this.$message({
                type: "success",
                message: msg,
            });
            this.resetForm(); // 关闭表单并清空
            this.queryOrgList({ flag: "1" }); // 获取全部机构
        });
    }
    // 机构与机构名称转换（一级机构没有orgPcode,传值过来orgName，进行转换）
    orgNameChangeOrgCode(data, value) {
        let val = "";
        data.map((i) => {
            if (i["orgName"] == value) {
                val = i["orgCode"];
            }
        });
        return val;
    }
    // 清空表单
    resetForm() {
        // this.$refs['formName'].resetFields()
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
        this.close();
    }
}
</script>

<style lang="scss" >
</style>
