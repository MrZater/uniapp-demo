<template>
    <el-dialog class="br-dialog" title="新建" :visible.sync="dialogVisible" width="650px" @close="reset" :close-on-click-modal="false">
        <el-form ref="forms" :model="dialogForm" label-width="100px" :rules="rules" size="small" v-loading="loading">
            <el-form-item class="br-form-item-label" label="异常事件主题" prop="abnormalTheme">
                <el-input class="br-input__full" v-model.trim="dialogForm.abnormalTheme" placeholder="请输入异常事件主题" show-word-limit maxlength="50"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="异常类型" prop="abnormalType">
                <el-select v-model="dialogForm.abnormalType" placeholder="请选择异常类型" filterable clearable class="br-select__full">
                    <el-option v-for="(item,index) in eventTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="企业名称" prop="companyId">
                <el-select v-model="dialogForm.companyId" placeholder="请选择企业名称" @change="onChange" filterable clearable class="br-select__full">
                    <el-option v-for="(item,index) in companyList" :key="index" :value="item.companyId" :label="item.companyName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="组织名称">
                <el-input class="br-input__full" v-model.trim="orgInfo.orgName" disabled></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="异常事件描述" prop="abnormalDescription">
                <el-input type="textarea" show-word-limit maxlength="500" :autosize="{ minRows: 6, maxRows: 8 }" class="br-textarea__full" v-model.trim="dialogForm.abnormalDescription"
                    placeholder="请输入异常事件描述">
                </el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="附件" prop="files">
                <el-upload class="upload-demo" ref="upload" action="" :on-remove="handleRemove" :on-change="handleChange" :file-list="dialogForm.files" :auto-upload="false" multiple>
                    <el-button slot="trigger" size="small" type="primary br-btn">选取文件</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const abnormalEvent = namespace("abnormalEvent");
import cloneDeep from "lodash.clonedeep";

@Component({})
export default class Dialog extends Vue {
    @abnormalEvent.State eventTypeOption; //异常类型
    @abnormalEvent.Action queryAdd;
    @abnormalEvent.Action queryEventList;
    @abnormalEvent.Action queryCompanyList; //企业列表
    @abnormalEvent.State companyList;
    @abnormalEvent.Action queryCurrentOrg;
    @abnormalEvent.State orgInfo;

    dialogForm: any = {
        abnormalTheme: "", //异常事件主题
        abnormalType: "", //异常类型
        companyId: "", //企业名称id
        abnormalDescription: "", // 异常事件描述
        files: [], // 附件
    };
    loading: boolean = false;
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    rules = {
        abnormalTheme: [
            { required: true, message: "请输入异常事件主题", trigger: "blur" },
        ],
        abnormalType: [
            { required: true, message: "请输入异常类型", trigger: "change" },
        ],
        companyId: [
            {
                required: true,
                message: "请至少选择一个企业名称",
                trigger: "change",
            },
        ],
        abnormalDescription: [
            { required: true, message: "请输入异常事件描述", trigger: "blur" },
        ],
    };
    mounted() {
        this.queryCompanyList();
        this.queryCurrentOrg();
    }
    init(row) {
        this.dialogVisible = true;
    }
    reset() {
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
    }
    onChange(val) {
        let target = this.companyList.find((item) => item.companyId === val);
        this.dialogForm.companyName = target.companyName;
    }
    // 文件上传
    handleChange(file, fileList) {
        this.dialogForm.files = fileList;
    }
    // 文件删除
    handleRemove(file, fileList) {
        this.dialogForm.files = fileList;
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
                        formData.append("files", file.raw, file.name);
                    });
                }
                for (let key in params) {
                    formData.append(key, params[key]);
                }

                this.btnloading = true;
                this.queryAdd(formData)
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            message: msg,
                        });
                        this.dialogVisible = false;
                        this.queryEventList({
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
</style>
