<template>
    <B-dialog :title="dialogType=='add'?'新增':(dialogType=='see'? '查看':'编辑')" :visible="dialogVisible" width="500px" @close="handleCancel" v-if="dialogVisible">
        <el-form ref="forms" :model="dialogForm.roleInfo" label-width="80px" :rules="rules" size="small">
            <div class="sub-title">基本信息</div>
            <div class="sub-gap"></div>
            <el-row>
                <el-col :span="24">
                    <el-form-item class="br-form-item-label" label="角色名称" prop="roleName">
                        <el-input class="br-input-large" v-model.trim="dialogForm.roleInfo.roleName" placeholder="请输入" :disabled="dialogType =='see'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="br-form-item-label" label="角色备注" prop="remark">
                        <el-input class="br-textarea-large" :disabled="dialogType =='see'" type="textarea" placeholder="请输入" v-model.trim="dialogForm.roleInfo.remark"
                            :autosize="{ minRows: 3, maxRows: 5}" maxlength="200" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="sub-gap"></div>
            <div class="sub-title">部门权限</div>
            <div class="sub-gap"></div>
            <div class="detail_content">
                <el-row :gutter="20" style="width:100%">
                    <el-col :span="24">
                        <el-card shadow="never">
                            <el-form-item class="br-form-item-label" label="" label-width="0" prop="orgInfo">
                                <org-tree v-loading="loading" ref="orgTree" class="common-dialog" :allResouse="orgList" :checkDataArry="checkOrgDataArry" :disabledFlag="dialogType" />
                            </el-form-item>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-title">菜单权限</div>
            <div class="sub-gap"></div>
            <div class="detail_content">
                <el-row :gutter="20" style="width:100%">
                    <el-col :span="24">
                        <el-card shadow="never">
                            <el-form-item class="br-form-item-label" label="" label-width="0" prop="authInfo">
                                <auth-tree v-loading="treeLoading" ref="authTree" class="common-dialog" :allResouse="allResourceList" :checkDataArry="checkAuthDataArry" :disabledFlag="dialogType" />
                            </el-form-item>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <template slot="footer" v-if="dialogType != 'see'">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
const roleManage = namespace("roleManage");
const organizationManage = namespace("organizationManage");
const configManage = namespace("configManage");
import { BDialog } from "@/components";
import authTree from "./authTree.vue";
import orgTree from "./orgTree.vue";
@Component({
    components: {
        BDialog,
        authTree,
        orgTree,
    },
})
export default class Dialog extends Vue {
    @configManage.Mutation saveOrgName;
    @configManage.Action queryOrgNameList;
    @roleManage.Action queryRoleList;
    @roleManage.State allResourceList;
    @roleManage.State treeLoading;
    @roleManage.Action queryAllResource;
    @roleManage.Action queryResourceTreeList;
    @roleManage.Action queryCheckedOrg;
    @roleManage.Action queryAddAndUpdate;
    @roleManage.State searchData;
    // 部门所有权限
    @organizationManage.Action queryOrgList;
    @organizationManage.State orgList;
    @organizationManage.State loading;
    dialogForm: any = {
        roleInfo: {}, // 菜单权限
        authInfo: {},
        orgInfo: {},
    };
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    rules = {
        roleName: [{ required: true, message: "请输入角色", trigger: "blur" }],
    };
    checkOrgDataArry: any = [];
    checkAuthDataArry: any = [];
    @Prop() dialogType;
    @Prop(Object) dialogData;
    @Watch("dialogVisible")
    onChanged(val, oldVal) {
        if (val) {
            let that = this;
            this.dialogForm.roleInfo = Object.assign(
                {},
                this.dialogData.roleInfo
            );
            //   菜单数组
            let isRoleCode =
                this.dialogType == "add"
                    ? ""
                    : this.dialogForm.roleInfo.roleCode;
            // 获取菜单权限（已选择）
            this.queryAllResource({ roleCode: isRoleCode }).then((res) => {
                this.$set(this, "checkAuthDataArry", res);
                // 获取菜单权限（全部）
                this.queryResourceTreeList({});
            });
            this.dialogForm.orgInfo.orgList = this.dialogData.orgInfo.orgList;
            let isRoleCode1 =
                this.dialogType == "add"
                    ? ""
                    : this.dialogForm.roleInfo.roleCode;

            // 获取菜单权限（已选择）
            this.queryCheckedOrg({ roleCode: isRoleCode1 }).then((res) => {
                this.$set(this, "checkOrgDataArry", res);
                // 获取菜单权限（全部）
                this.queryOrgList({ flag: "2" });
            });
        }
    }

    open() {
        this.dialogVisible = true;

        this.$nextTick(() => {
            let $ele: any = this.$refs["forms"];
            $ele.clearValidate();
        });
    }
    close() {
        this.dialogVisible = false;
        this.dialogForm.authInfo = {};
        this.dialogForm.orgInfo = {};
        /* 清空树结构中的值 */
        let $els: any = this.$refs["authTree"];
        let $elsD: any = this.$refs["orgTree"];
        $els.reset();
        $elsD.reset();
    }
    handleSubmit() {
        let $ele: any = this.$refs["forms"];
        let $els = this.$refs["authTree"];
        let $elsD = this.$refs["orgTree"];
        $ele.validate((valid) => {
            if (valid) {
                this.dialogForm.authInfo.resourceList = $els["isChecked"]
                    ? [...$els["submitID"]]
                    : this.checkAuthDataArry;
                this.dialogForm.orgInfo.orgList = $elsD["isChecked"]
                    ? [...$elsD["submitID"]]
                    : this.checkOrgDataArry;
                if (this.dialogForm.orgInfo.orgList.length === 0) {
                    this.$message({
                        type: "error",
                        message: "部门权限不能为空！",
                    });
                    return;
                }
                this.btnloading = true;
                this.queryAddAndUpdate(this.dialogForm)
                    .then((msg) => {
                        this.$message({ type: "success", message: msg });
                        this.handleCancel();
                        /* 重新获取组织机构 */
                        this.saveOrgName([]);
                        this.queryOrgNameList({ flag: "4" }); // 组织机构
                        this.queryRoleList(this.searchData);
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }
    handleCancel() {
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
        this.close();
    }
}
</script>

<style lang="scss" scoped>
</style>
