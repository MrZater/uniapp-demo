<template>
    <B-dialog :title="dialogType=='add'?'新增':(dialogType=='see'? '详情':'编辑')" :visible="dialogVisible" width="550px" @close="handleCancel" v-if="dialogVisible">
        <el-form ref="forms" :model="dialogForm" label-width="100px" :rules="rules" size="small" v-loading="loading" :disabled="dialogType =='see'">
            <div class="sub-title">基础设置</div>
            <div class="sub-gap"></div>
            <el-form-item class="br-form-item-label" label="授信通知主题" prop="messageTitle">
                <el-input class="br-input__full" v-model.trim="dialogForm.messageTitle" placeholder="请输入授信通知主题" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="通知方式" prop="messageType">
                <el-select v-model="dialogForm.messageType" placeholder="请选择通知方式" filterable multiple clearable class="br-select__full">
                    <el-option v-for="(item,index) in $select('noticeModeType')" :key="index" :value="item.value" :label="item.text"></el-option>
                </el-select>
            </el-form-item>
            <div class="sub-gap"></div>
            <div class="sub-title">推送数据所属业务部门</div>
            <div class="sub-gap"></div>
            <div class="detail_content">
                <el-row :gutter="20" style="width:104%">
                    <el-col :span="24">
                        <el-card shadow="never">
                            <el-form-item class="br-form-item-label" label="" label-width="0">
                                <org-tree v-loading="treeLoading" ref="orgTree" class="common-dialog" :allResouse="orgList" :checkDataArry="checkOrgDataArry" :disabledFlag="dialogType" />
                            </el-form-item>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="sub-gap"></div>
            <div class="sub-title">通知人员
                <el-button type="primary" class="br-btn right-btn" @click="onEdit" v-if="dialogType !== 'see'">编辑</el-button>
            </div>
            <!-- <div class="sub-gap"></div> -->
            <el-table stripe :data="dialogForm.noticeUsers" class="br-table">
                <el-table-column label="姓名" prop="realName" show-overflow-tooltip></el-table-column>
                <el-table-column label="组织名称" prop="orgPname" show-overflow-tooltip></el-table-column>
                <el-table-column label="部门" prop="orgName" show-overflow-tooltip></el-table-column>
                <el-table-column label="岗位" prop="postName" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
        </el-form>
        <template slot="footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading" v-if="dialogType != 'see'">保存</el-button>
            <el-button class="br-btn-large" @click="handleCancel">{{ dialogType == 'see'? "关闭" : "取消" }}</el-button>
        </template>
        <user-tree ref="userTree" :noticeUsers.sync="dialogForm.noticeUsers"></user-tree>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const creditNotice = namespace("creditNotice");
import { BDialog } from "@/components";
import orgTree from "./orgTree.vue";
import UserTree from "./userTree.vue";
@Component({
    components: {
        BDialog,
        orgTree,
        UserTree,
    },
})
export default class Dialog extends Vue {
    @creditNotice.State searchData;
    @creditNotice.Action queryNoticeList;
    @creditNotice.Action queryAddOrUpdate;
    @creditNotice.Action queryDetail;
    @creditNotice.Action queryOrgList;
    @creditNotice.State orgList;
    @creditNotice.State treeLoading;
    dialogForm: any = {
        messageTitle: "",
        messageType: [],
        orgCodeList: [],
        noticeUsers: [],
    };
    loading: boolean = false;
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    rules = {
        messageTitle: [
            { required: true, message: "请输入授信通知主题", trigger: "blur" },
        ],
        messageType: [
            {
                type: "array",
                required: true,
                message: "请选择通知方式",
                trigger: "change",
            },
        ],
    };
    checkOrgDataArry: any = [];

    public dialogType: string = "";

    init(handleType, row) {
        this.dialogType = handleType;
        this.dialogVisible = true;
        if (this.orgList && this.orgList.length === 0) {
            this.queryOrgList({ flag: "2" });
        }
        if (this.dialogType !== "add") {
            this.loading = true;
            let params = {
                keyNo: row.keyNo,
            };
            this.queryDetail(params)
                .then((res) => {
                    this.$set(this, "checkOrgDataArry", res.orgCodeList);
                    this.dialogForm = res;
                })
                .finally(() => (this.loading = false));
        }
    }
    handleSubmit() {
        let $ele: any = this.$refs["forms"];
        let $elsD = this.$refs["orgTree"];
        $ele.validate((valid) => {
            if (valid) {
                this.dialogForm.orgCodeList = $elsD["isChecked"]
                    ? [...$elsD["submitID"]]
                    : this.checkOrgDataArry;
                if (this.dialogForm.orgCodeList.length === 0) {
                    this.$message({
                        type: "error",
                        message: "推送数据所属业务部门不能为空！",
                    });
                    return;
                }
                if (this.dialogForm.noticeUsers.length === 0) {
                    this.$message({
                        type: "error",
                        message: "通知人员不能为空！",
                    });
                    return;
                }
                this.btnloading = true;
                this.queryAddOrUpdate(this.dialogForm)
                    .then((msg) => {
                        this.$message({ type: "success", message: msg });
                        this.handleCancel();
                        this.queryNoticeList(this.searchData);
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
        this.$set(this.dialogForm, "keyNo", "");
        this.$set(this.dialogForm, "noticeUsers", []);
        this.$set(this, "checkOrgDataArry", []);
        this.close();
    }
    close() {
        this.dialogVisible = false;
        /* 清空树结构中的值 */
        let $elsD: any = this.$refs["orgTree"];
        $elsD.reset();
    }
    onEdit() {
        let $tree: any = this.$refs["userTree"];
        $tree.init(this.dialogForm.noticeUsers);
    }
}
</script>

<style lang="scss" scoped>
.right-btn {
    position: absolute;
    right: 0px;
    top: -5px;
}
</style>
