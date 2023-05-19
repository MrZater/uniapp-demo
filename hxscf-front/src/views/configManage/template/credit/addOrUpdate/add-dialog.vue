<template>
    <el-dialog title="添加页签" :visible.sync="dialogVisible" width="450px" class="br-dialog">
        <el-form :inline="true" :model="addForm" label-width="100px" ref="addForm" :rules="addRules" size="small">
            <el-form-item label="页签名称" prop="tableCname" class="br-form-item-label">
                <el-input class="br-input-large" placeholder="请输入页签名称" v-model.trim="addForm.tableCname"></el-input>
            </el-form-item>
            <el-form-item label="英文名称" prop="tableCode" class="br-form-item-label">
                <el-input class="br-input-large" placeholder="请输入英文名称" v-model.trim="addForm.tableCode"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="onDialogSave">保存</el-button>
            <el-button class="br-btn-large" @click="onDialogClose">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Grid extends Vue {
    public dialogVisible: boolean = false;

    addForm: any = {
        tableCname: "",
        tableCode: "",
    };

    addRules = {
        tableCname: [{ required: true, message: "请输入页签名称" }],
        tableCode: [{ required: true, message: "请输入英文名称" }],
    };
    onDialogSave() {
        let oDom: any = this.$refs["addForm"];
        oDom.validate((valid) => {
            if (valid) {
                this.$emit("addTabs", { ...this.addForm });
                this.onDialogClose();
            } else {
                return false;
            }
        });
    }
    onDialogClose() {
        this.dialogVisible = false;
        let oDom: any = this.$refs["addForm"];
        oDom.resetFields();
    }
}
</script>