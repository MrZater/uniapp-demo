<template>
    <el-dialog title="编辑页签" :visible.sync="dialogVisible" width="25%" class="br-dialog">
        <el-form :inline="true" :model="addForm" :rules="rules" label-width="85px" ref="addForm" size="small">
            <el-table stripe :data="addForm.modelColumnVoList" class="br-table" border>
                <el-table-column label="页签名称">
                    <template slot-scope="scope">
                        <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.modelTableConfig.tableCname' " class="br-form-item-label" :rules="rules.tableCname">
                            <el-input v-model.trim="scope.row.modelTableConfig.tableCname" class="br-input-large"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(scope.$index,addForm.modelColumnVoList)">
                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="onDialogSave">保存</el-button>
            <el-button class="br-btn-large" @click="onDialogClose">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import cloneDeep from "lodash.clonedeep";

@Component({})
export default class Grid extends Vue {
    @Prop({ default: () => [], type: Array }) list;
    public dialogVisible: boolean = false;

    addForm: any = {
        modelColumnVoList: [],
    };

    rules = {
        tableCname: [
            { required: true, message: "请输入页签名称", trigger: "blur" },
        ],
    };
    init() {
        this.addForm.modelColumnVoList = cloneDeep(this.list);
        this.dialogVisible = true;
    }
    handleRemove(index, rows) {
        rows.splice(index, 1);
    }

    onDialogSave() {
        let $els: any = this.$refs["addForm"];
        $els.validate((valid) => {
            if (valid) {
                this.$emit("updateTabs", this.addForm.modelColumnVoList);
                this.onDialogClose();
            } else {
                return false;
            }
        });
    }
    onDialogClose() {
        this.dialogVisible = false;
    }
}
</script>