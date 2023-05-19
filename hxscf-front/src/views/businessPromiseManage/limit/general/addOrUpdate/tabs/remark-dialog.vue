<template>
    <el-dialog title="备注" :visible.sync="visible" width="460px" class="br-dialog">
        <el-input type="textarea" v-model.trim="remark" class="br-textarea__full" placeholder="请输入备注" :autosize="{ minRows: 8, maxRows: 14 }" maxlength="200" show-word-limit>
        </el-input>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit">保存</el-button>
            <el-button class="br-btn-large" @click="visible = false">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Dialog extends Vue {
    remark: string = "";
    visible: boolean = false;

    row: any = {};

    init(row) {
        this.row = row;
        this.remark = row.remark || "";
        this.visible = true;
    }

    handleSubmit() {
        /* 利用对象的引用关系进行原值修改 */
        this.row.remark = this.remark;
        this.visible = false;
    }
}
</script>

<style lang="scss" scoped>
</style>