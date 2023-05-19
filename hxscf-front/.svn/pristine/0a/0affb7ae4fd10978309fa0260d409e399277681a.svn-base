<template>
    <el-dialog title="详情" :visible="dialogVisible" width="460px" class="br-dialog" @close="handleCancel">
        <el-form :model="dialogForm" ref="forms" label-width="100px" size="small" disabled>
            <el-form-item class="br-form-item-label" label="操作模块" prop="operation">
                <el-input class="br-input-large" v-model.trim="dialogForm.operation" />
            </el-form-item>
            <el-form-item class="br-form-item-label" label="请求方式" prop="requestMethod">
                <el-select v-model="dialogForm.requestMethod" filterable class="br-select-large">
                    <el-option v-for="(item,index) in $select('requireMet')" :key="index" :value="item.value" :label="item.text" />
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="操作方法" prop="methodName">
                <el-input class="br-input-large" v-model.trim="dialogForm.methodName" />
            </el-form-item>
            <el-form-item class="br-form-item-label" label="请求地址" prop="requestUri">
                <el-input class="br-input-large" v-model.trim="dialogForm.requestUri" />
            </el-form-item>
            <el-form-item class="br-form-item-label" label="操作状态" prop="operState">
                <el-select v-model="dialogForm.operState" filterable class="br-select-large">
                    <el-option v-for="(item,index) in $select('successAndFailure')" :key="index" :value="item.value" :label="item.text" />
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="参数" prop="requestParams">
                <el-input type="textarea" :autosize="{ minRows: 8}" class="br-input-large" v-model.trim="dialogForm.requestParams" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Dialog extends Vue {
    public dialogForm: any = {
        operation: "",
        requestMethod: "",
        methodName: "",
        requestUri: "",
        operState: "",
        requestParams: "",
    };
    dialogVisible: boolean = false;

    init(data) {
        this.dialogForm = { ...data };
        this.dialogVisible = true;
    }

    close() {
        this.dialogVisible = false;
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
