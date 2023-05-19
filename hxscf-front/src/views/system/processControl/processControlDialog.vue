<template>
    <el-dialog :title="dialogStaus=='1'?'新增':'编辑'" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="beforeClose" class="br-dialog">
        <el-form :model="dialogForm" :rules="rules" ref="Forms" label-width="110px">
            <el-form-item class="br-form-item-label" label="流程编号：" prop="activitecode">
                <el-input type="input" class="br-input-large" v-model.trim="dialogForm.activitecode" disabled>
                </el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="流程类别：" prop="activitetype">
                <el-select v-model="dialogForm.activitetype" placeholder="请选择流程类别" filterable class="br-select-large" :disabled="dialogStaus === '2'">
                    <el-option v-for="(item,index) in m_selectList" :value="item.dictCode" :label="item.dictName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="组织名称:" prop="orgName">
                <el-select v-model="dialogForm.orgName" placeholder="请选择组织名称" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="流程名称：" prop="activitename">
                <el-input type="input" class="br-input-large" v-model.trim="dialogForm.activitename">
                </el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="流程说明：" prop="activitedesc">
                <el-input type="textarea" maxlength="100" show-word-limit class="br-input-large br-textarea-large" :autosize="{ minRows: 2, maxRows: 6}" v-model.trim="dialogForm.activitedesc">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large br-submit-btn" @click="handleSubmit" :loading="btnloading">保存
            </el-button>
            <el-button class="br-btn-large br-cancel-btn" @click="handleCancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

const processControl = namespace("processControl");
const configManage = namespace("configManage");
@Component({})
export default class processControlDialog extends Vue {
    @processControl.Action processControlOptFN;
    @processControl.Action processControlListFN;
    @processControl.State s_searchData;
    @processControl.State m_selectList;
    @configManage.State orgNameList;

    /*-----------------start[变量]-----------------*/
    btnloading: boolean = false;

    /*-----------------end[变量]-----------------*/

    dialogForm: any = {};
    dialogVisible: boolean = false;
    rules: object = {
        activitetype: [
            {
                required: true,
                trigger: "change",
                message: "请选择流程类别",
            },
        ],
        activitename: [
            {
                required: true,
                trigger: "blur",
                message: "请流程名称",
            },
        ],
        activitedesc: [
            {
                required: true,
                trigger: "blur",
                message: "请输入流程说明",
            },
        ],
        orgName: [
            {
                required: true,
                trigger: "change",
                message: "请选择组织名称",
            },
        ],
    };

    @Prop() dialogStaus;
    @Prop(Object) dialogDataByProps;
    defaultProps = {
        children: "children",
        label: "label",
    };

    @Watch("dialogVisible")
    private onChanged(val, oldVal) {
        this.dialogForm = JSON.parse(JSON.stringify(this.dialogDataByProps));
    }

    created() {
        this.dialogForm = Object.assign({}, this.dialogDataByProps);
    }

    open() {
        this.dialogVisible = true;
        this.$nextTick(() => {
            let $ele: any = this.$refs["Forms"];
            $ele.clearValidate();
        });
    }

    close() {
        this.dialogVisible = false;
    }

    handleSubmit() {
        console.log(this.dialogForm);
        let $ele: any = this.$refs["Forms"];
        $ele.validate((valid) => {
            if (valid) {
                this.btnloading = true;
                // 新增
                this.processControlOptFN(this.dialogForm)
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            message: msg,
                        });
                        this.handleCancel();
                        this.processControlListFN(this.s_searchData);
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }

    handleCancel() {
        let $ele: any = this.$refs["Forms"];
        this.btnloading = false;
        $ele.resetFields();
        $ele.clearValidate();
        this.close();
    }

    beforeClose(done) {
        let $ele: any = this.$refs["Forms"];
        this.btnloading = false;
        $ele.resetFields();
        $ele.clearValidate();
        done();
    }
    //点击组织名称
    onLeavesClick(data, node, el) {
        this.dialogForm["orgName"] = data.label;
        this.dialogForm["orgCode"] = data.id;
        this.$refs.treeSelect["handleClose"]();
    }
}
</script>


<style lang="scss">
</style>