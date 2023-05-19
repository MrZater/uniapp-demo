<template>
    <el-dialog title="选项" :visible.sync="visible" width="40%" class="br-dialog">
        <div class="extra-container">
            <el-button type="primary" class="br-btn" @click="onAdd">新增</el-button>
        </div>
        <el-form :inline="true" :model="addForm" :rules="rules" label-width="85px" ref="addForm" size="small">
            <el-table stripe :data="addForm.list" class="br-table" border>
                <el-table-column label="选项名称" prop="dictName">
                    <template slot-scope="scope">
                        <el-form-item :prop="'list.' + scope.$index + '.dictName' " class="br-form-item-label" :rules="rules.dictName">
                            <el-input v-model.trim="scope.row.dictName" class="br-input"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="英文名称" prop="dictCode">
                    <template slot-scope="scope">
                        <el-form-item :prop="'list.' + scope.$index + '.dictCode' " class="br-form-item-label" :rules="rules.dictCode">
                            <el-input v-model.trim="scope.row.dictCode" class="br-input"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-popconfirm title="确认删除该数据吗？" @onConfirm="onRemove(scope.$index,addForm.list)">
                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="onSave">保存</el-button>
            <el-button class="br-btn-large" @click="onCancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import cloneDeep from "lodash.clonedeep";

@Component({})
export default class Dialog extends Vue {
    public visible: boolean = false;
    public oldRowData: any = "";
    addForm: any = {
        list: [],
    };
    rules = {
        dictName: [
            { required: true, message: "请输入选项名称", trigger: "blur" },
        ],
        dictCode: [
            { required: true, message: "请输入英文名称", trigger: "blur" },
        ],
    };
    init(row) {
        this.oldRowData = row;
        this.addForm.list = row.columDicConfigList
            ? cloneDeep(row.columDicConfigList)
            : [];
        this.visible = true;
    }
    onRemove(index, rows) {
        rows.splice(index, 1);
    }
    onAdd() {
        this.addForm.list.push({});
    }
    onSave() {
        let $els: any = this.$refs["addForm"];
        $els.validate((valid) => {
            if (valid) {
                // 利用对象的引用关系进行原值修改
                this.oldRowData.columDicConfigList = this.addForm.list;
                this.visible = false;
            } else {
                return false;
            }
        });
    }
    onCancel() {
        this.visible = false;
    }
}
</script>
<style scope lang="scss">
.extra-container {
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    margin-bottom: 15px;
    position: relative;
    .br-btn {
        position: absolute;
        right: 18px;
        top: -5px;
    }
}
</style>