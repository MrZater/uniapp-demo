<template>
    <el-dialog :title="handleType === 'add' ? '新增' :handleType === 'reSubmit'? '重新提交' : '提交审核' " class="br-dialog" :visible="dialogVisible" width="700px" @close="reset">
        <el-form :model="dialogForm" :rules="rules" :inline="true" ref="forms" size="small" v-loading="loading">
            <el-form-item label="组织名称" prop="orgName" class="br-form-item-label" :rules="rules.orgName">
                <el-select v-model="dialogForm.orgName" placeholder="请选择组织名称" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="sub-gap"></div>
            <el-table stripe :data="dialogForm.limitRatioList" class="br-table" border style="width: 100%">
                <el-table-column label="信用等级" prop="riskLevel" width="150"></el-table-column>
                <el-table-column label="限额乘数" prop="riskRatio">
                    <template slot-scope="scope">
                        <el-form-item :prop="'limitRatioList.' + scope.$index + '.riskRatio' " class="br-form-item-label" :rules="rules.riskRatio">
                            <el-input-number v-model.trim="scope.row.riskRatio" class="" :precision="2" :step="0.1" :min="0" :max="1"></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <!-- 操作记录 -->
        <LogTable v-if="handleType ==='reSubmit'" :list="recordList"></LogTable>
        <div slot="footer" class="br-dialog-footer">
            <el-button class="br-btn-large" @click="dialogVisible = false" :disabled="loading">取 消</el-button>
            <el-button type="primary" class="br-btn-large" @click="handleSave('2')" :disabled="loading">保 存</el-button>
            <el-button class="br-btn-large" @click="handleSave('1')" :disabled="loading">提交审核</el-button>
        </div>

    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const limitMultiplier = namespace("limitMultiplier");
import LogTable from "@/views/components/LogTable.vue";
const configManage = namespace("configManage");
@Component({
    components: {
        LogTable,
    },
})
export default class addOrUpdate extends Vue {
    @limitMultiplier.State searchData;
    @limitMultiplier.Action queryList;
    @limitMultiplier.Action queryAddOrUpdate;
    @limitMultiplier.Action queryRecordList;
    @limitMultiplier.Action queryDetail;
    @configManage.State orgNameList;
    public loading: boolean = false;
    public recordList: any = [];
    public orgCode: any = "";
    public orgName: any = "";
    dialogForm: any = {
        orgName: "",
        orgCode: "",
    };
    dialogVisible: boolean = false;
    rules: any = {
        orgName: [
            { required: true, trigger: "change", message: "请选择组织名称" },
        ],
        riskRatio: [
            { required: true, trigger: "blur", message: "请输入限额乘数" },
        ],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    public handleType: string = "";

    initData(row, type) {
        this.handleType = type;

        if (type === "add") {
            this.$set(this.dialogForm, "limitRatioList", row);
        } else {
            this.dialogForm.limitId = row.limitId;
            if (type === "reSubmit") {
                // 获取日志
                this.queryRecordList({
                    business: row.limitId,
                }).then((res) => {
                    this.recordList = res instanceof Array ? res : [];
                });
            }
            // 获取详情
            this.loading = true;
            this.queryDetail({ limitId: row.limitId })
                .then((res) => {
                    this.$set(
                        this.dialogForm,
                        "limitRatioList",
                        res instanceof Array ? res : []
                    );
                    this.$set(this.dialogForm, "orgName", row.orgName);
                    this.$set(this.dialogForm, "orgCode", row.orgCode);
                })
                .finally(() => (this.loading = false));
        }

        this.open();
    }

    open() {
        this.dialogVisible = true;
    }

    handleSave(flag) {
        let $ele: any = this.$refs["forms"];
        $ele.validate((valid) => {
            if (valid) {
                this.dialogForm.toSubmit = flag;
                this.loading = true;
                this.queryAddOrUpdate(this.dialogForm)
                    .then((msg) => {
                        this.$message({ type: "success", message: msg });
                        this.dialogVisible = false;
                        this.queryList(this.searchData);
                    })
                    .finally(() => (this.loading = false));
            } else {
                return false;
            }
        });
    }

    reset() {
        this.dialogVisible = false;
        this.dialogForm = {};
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
    }
    //点击组织名称
    onLeavesClick(data, row, index) {
        this.$set(this.dialogForm, "orgName", data.label);
        this.$set(this.dialogForm, "orgCode", data.id);
        this.$refs.treeSelect["handleClose"]();
    }
}
</script>

<style lang="scss" scoped>
</style>