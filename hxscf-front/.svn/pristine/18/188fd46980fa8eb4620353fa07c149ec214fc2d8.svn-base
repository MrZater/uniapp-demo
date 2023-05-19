<template>
    <B-dialog :title="dialogType=='add'?'新增':'编辑'" :visible="dialogVisible" width="460px" @close="handleCancel">
        <el-form :model="dialogForm" :rules="rules" ref="forms" label-width="100px" size="small">
            <el-form-item class="br-form-item-label" label="字典名称" prop="value">
                <el-input class="br-input-large" placeholder="请输入字典名称" v-model.trim="dialogForm.value"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="字典英文名称" prop="code">
                <el-input class="br-input-large" placeholder="请输入字典英文名称" v-model.trim="dialogForm.code" :disabled="dialogType == 'edit'"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="字典状态" prop="disabled">
                <el-select class="br-select-large" v-model="dialogForm.disabled">
                    <el-option v-for="(item,index) of $select('costStatus')" :key="index" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="字典描述" prop="remark">
                <el-input type="textarea" maxlength="200" :autosize="{ minRows: 3}" show-word-limit class="br-input-large" placeholder="请输入字典描述" v-model.trim="dialogForm.remark"></el-input>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
        </template>

    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

const dictionaryManage = namespace("dictionaryManage");
import { BDialog } from "@/components";

@Component({
    components: {
        BDialog,
    },
})
export default class Dialog extends Vue {
    @dictionaryManage.Action queryAddUser;
    @dictionaryManage.Action queryList;
    @dictionaryManage.Action queryUpdateUser;
    @dictionaryManage.State searchData;

    dialogForm: any = {};
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    rules: object = {
        value: [{ required: true, trigger: "blur", message: "请输入字典名称" }],
        code: [
            { required: true, trigger: "blur", message: "请输入字典英文名称" },
        ],
        remark: [
            { required: true, trigger: "blur", message: "请输入字典描述" },
        ],
        disabled: [
            { required: true, trigger: "change", message: "请选择字典状态" },
        ],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    @Prop() dialogType;
    @Prop() dialogData;

    @Watch("dialogVisible")
    onChanged(val, oldVal) {
        if (val) {
            this.dialogForm = Object.assign({}, this.dialogData);
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
    }

    handleSubmit() {
        let $ele: any = this.$refs["forms"];
        $ele.validate((valid) => {
            if (valid) {
                const formAPI =
                    this.dialogType == "add"
                        ? this.queryAddUser
                        : this.queryUpdateUser;
                this.btnloading = true;
                formAPI(this.dialogForm)
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            message: msg,
                        });
                        this.handleCancel();
                        this.queryList(this.searchData);
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                console.log("error submit!!");
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
