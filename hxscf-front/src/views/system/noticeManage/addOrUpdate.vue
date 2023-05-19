<template>
    <el-dialog class="br-dialog" :title="title" :visible.sync="dialogVisible" width="650px" @close="reset" :close-on-click-modal="false">
        <el-form ref="forms" :model="dialogForm" label-width="80px" :rules="rules" size="small" :disabled="title === '详情'" v-loading="loading">
            <div class="sub-title">公告信息</div>
            <div class="sub-gap"></div>
            <el-form-item class="br-form-item-label" label="公告主题" prop="noticeTitle">
                <el-input class="br-input__full" v-model.trim="dialogForm.noticeTitle" placeholder="请输入公告主题" show-word-limit maxlength="50"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="公告类型" prop="noticeType">
                <el-select v-model="dialogForm.noticeType" placeholder="请选择公告类型" filterable clearable class="br-select__full">
                    <el-option v-for="(item,index) in noticeTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="公告内容" prop="noticeContent">
                <el-input type="textarea" show-word-limit maxlength="500" :autosize="{ minRows: 6, maxRows: 8 }" class="br-textarea__full" v-model.trim="dialogForm.noticeContent"
                    placeholder="请输入公告内容">
                </el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="附件" prop="files">
                <el-upload class="upload-demo" ref="upload" action="" :on-remove="handleRemove" :on-change="handleChange" :file-list="dialogForm.files" :auto-upload="false" multiple>
                    <el-button slot="trigger" size="small" type="primary br-btn">选取文件</el-button>
                </el-upload>
            </el-form-item>
            <div class="sub-gap"></div>
            <div class="sub-title">通知配置</div>
            <div class="sub-gap"></div>
            <el-form-item class="br-form-item-label" label="通知方式" prop="noticeMode">
                <el-select v-model="dialogForm.noticeMode" placeholder="请选择通知方式" filterable multiple clearable class="br-select__full">
                    <el-option v-for="(item,index) in $select('noticeModeType')" :key="index" :value="item.value" :label="item.text"></el-option>
                </el-select>
            </el-form-item>
            <div class="sub-gap"></div>
            <div class="sub-title">通知人员
                <el-button type="primary" class="br-btn right-btn" @click="onEdit" v-if="title === '新建'">编辑</el-button>
            </div>
            <el-table stripe :data="dialogForm.noticeUsers" class="br-table">
                <el-table-column label="姓名" prop="realName" show-overflow-tooltip></el-table-column>
                <el-table-column label="岗位" prop="postName" show-overflow-tooltip></el-table-column>
                <el-table-column label="部门" prop="orgName" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading" v-if="title==='新建'">保存</el-button>
            <el-button class="br-btn-large" @click="dialogVisible = false">{{title === "新建"?"取消":"关闭"}}</el-button>
        </div>
        <user-tree ref="userTree" :noticeUsers.sync="dialogForm.noticeUsers"></user-tree>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const noticeManage = namespace("noticeManage");
import cloneDeep from "lodash.clonedeep";
import UserTree from "./userTree.vue";

@Component({
    components: {
        UserTree,
    },
})
export default class Dialog extends Vue {
    @noticeManage.State noticeTypeOption; //通知类型
    @noticeManage.Action addNoticeFN;
    @noticeManage.Action detailNoticeFN;
    @noticeManage.Action queryNoticeList;

    dialogForm: any = {
        noticeTitle: "", //公告主题
        noticeType: "", //公告类型
        noticeContent: "", // 公告内容
        files: [], // 附件
        noticeMode: [], //通知方式
        noticeUsers: [], //通知人员
    };
    loading: boolean = false;
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    rules = {
        noticeTitle: [
            { required: true, message: "请输入公告主题", trigger: "blur" },
        ],
        noticeType: [
            { required: true, message: "请输入公告类型", trigger: "change" },
        ],
        noticeMode: [
            {
                type: "array",
                required: true,
                message: "请至少选择一个通知方式",
                trigger: "change",
            },
        ],
    };
    title: string = "新建";
    init(row) {
        this.title = row && row.noticeId ? "详情" : "新建";
        if (row && row.noticeId) {
            this.loading = true;
            this.detailNoticeFN({ noticeId: row.noticeId })
                .then((res) => {
                    res &&
                        (res.files as any).forEach(
                            (item) => (item.name = item.fileName)
                        );
                    this.dialogForm = {
                        noticeTitle: res.noticeTitle, //公告主题
                        noticeType: res.noticeType, //公告类型
                        noticeContent: res.noticeContent, // 公告内容
                        files: res.files || [], // 附件
                        noticeMode: res.noticeMode || [], //通知方式
                        noticeUsers: res.noticeUsers || [], //通知人员
                    };
                })
                .finally(() => (this.loading = false));
        }
        this.dialogVisible = true;
    }
    reset() {
        this.$set(this.dialogForm, "noticeUsers", []);
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
    }
    // 文件上传
    handleChange(file, fileList) {
        this.dialogForm.files = fileList;
    }
    // 文件删除
    handleRemove(file, fileList) {
        this.dialogForm.files = fileList;
    }
    // 编辑通知人员
    onEdit() {
        let $tree: any = this.$refs["userTree"];
        $tree.init(this.dialogForm.noticeUsers);
    }
    // 提交
    handleSubmit() {
        let $ele: any = this.$refs["forms"];
        $ele.validate((valid) => {
            if (valid) {
                let params = cloneDeep(this.dialogForm);
                delete params.files;
                let formData = new FormData();
                if (this.dialogForm.files.length > 0) {
                    this.dialogForm.files.forEach((file) => {
                        formData.append("file", file.raw, file.name);
                    });
                }
                formData.append("params", JSON.stringify({ params }));
                this.btnloading = true;
                this.addNoticeFN(formData)
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            message: msg,
                        });
                        this.dialogVisible = false;
                        this.queryNoticeList({
                            pageNum: 1,
                            pageSize: 10,
                        });
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }
}
</script>

<style lang="scss">
.right-btn {
    position: absolute;
    right: 0px;
    top: -5px;
}
</style>
