<template>
    <el-dialog :title="dialogForm.id ? '编辑' : '新增'" :visible.sync="visible" @closed="reset" width="460px" class="br-dialog">
        <el-form :model="dialogForm" :rules="rules" ref="forms" label-width="100px" size="small">
            <el-form-item class="br-form-item-label" label="企业名称" prop="code1">
                <el-input class="br-input-large" placeholder="请输入企业名称" v-model.trim="dialogForm.code1"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="组织名称" prop="code2">
                <el-select v-model="dialogForm.code2" placeholder="请选择组织名称" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="业务部门" prop="code3">
                <el-select v-model="dialogForm.code3" placeholder="请选择业务部门" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect2">
                    <el-option value="null">
                        <el-tree :data="orgNameList" @node-click="onLeavesClick2" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="visible = false">取消</el-button>
        </div>

    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const configManage = namespace("configManage");
const warnEnterprise = namespace("warnEnterprise");

@Component({})
export default class Dialog extends Vue {
    @warnEnterprise.Action queryAddOrUpdate;
    @warnEnterprise.Action queryList;
    @warnEnterprise.State searchData;
    @configManage.State orgNameList;
    dialogForm: any = {
        id: "",
        code1: "",
        code2: "",
        code22: "",
        code3: "",
        code33: "",
    };
    btnloading: boolean = false;
    visible: boolean = false;
    rules: object = {
        code1: [{ required: true, trigger: "blur", message: "请输入企业名称" }],
        code2: [
            {
                required: true,
                trigger: "change",
                message: "请选选择组织名称",
            },
        ],
        code3: [
            {
                required: true,
                trigger: "change",
                message: "请选选择业务部门",
            },
        ],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    init(row) {
        this.visible = true;
        this.$nextTick(() => {
            if (row && row.id) {
                this.dialogForm = {
                    id: row.id,
                    code1: row.code1,
                    code2: row.code2,
                    code22: row.code22,
                    code3: row.code3,
                    code33: row.code33,
                };
            }
        });
    }

    reset() {
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
        this.dialogForm.id = "";
        this.dialogForm.code22 = "";
        this.dialogForm.code33 = "";
    }
    handleSubmit() {
        let $ele: any = this.$refs["forms"];
        $ele.validate((valid) => {
            if (valid) {
                this.btnloading = true;
                console.log({ ...this.dialogForm }, "params");
                this.queryAddOrUpdate({ ...this.dialogForm })
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            message: msg,
                        });
                        this.visible = false;
                        this.queryList(this.searchData);
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }

    //点击组织名称
    onLeavesClick(data, node, el) {
        console.log(data);

        this.dialogForm["code2"] = data.label;
        this.dialogForm["code22"] = data.id;
        this.$refs.treeSelect["handleClose"]();
    }
    //
    onLeavesClick2(data, node, el) {
        this.dialogForm["code3"] = data.label;
        this.dialogForm["code33"] = data.id;
        this.$refs.treeSelect2["handleClose"]();
    }
}
</script>

<style lang="scss" scoped>
</style>