<template>
    <el-dialog title="维护头部企业" :visible.sync="visible" width="1300px" class="br-dialog">
        <div class="extra-container">
            <el-button type="primary" class="br-btn" @click="onAdd" :disabled="loading">新增</el-button>
        </div>
        <el-form :inline="true" :model="addForm" :rules="rules" label-width="85px" ref="addForm" size="small" v-loading="loading">
            <el-table stripe :data="addForm.list" class="br-table" border>
                <el-table-column label="头部企业名称" prop="custId" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'list.' + scope.$index + '.custId' " class="br-form-item-label" :rules="rules.custId">
                            <el-select v-model="scope.row.custId" placeholder="请选择所属行业" class="br-select" @change="(val)=>onChange(scope.row,val)">
                                <el-option v-for="item in creditedBizList" :key="item.custId" :label="item.bizName" :value="item.custId"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="信用等级" prop="riskLevel"></el-table-column>
                <el-table-column label="信用评分" prop="riskScore"></el-table-column>
                <el-table-column label="建议信用额度上限" prop="surveyMaxAmt"></el-table-column>
                <el-table-column label="信用风险限额" prop="riskMaxAmt"></el-table-column>
                <el-table-column label="创建人" prop="createUser"></el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                    <template slot-scope="{row}">
                        {{row.createTime | time}}
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
            <el-button type="primary" class="br-btn-large" :disabled="loading" :loading="btnLoading" @click="onSave">保存</el-button>
            <el-button class="br-btn-large" @click="onCancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");
@Component({})
export default class headerTrade extends Vue {
    @tradeInfoManage.Action showLeadingbizList;
    @tradeInfoManage.Action showCreditedBizList; // *头部企业名称下拉框
    @tradeInfoManage.Action showCreditInfo;
    @tradeInfoManage.Action addLeadingbiz;
    @tradeInfoManage.State creditedBizList; // *头部企业名称下拉框
    public visible: boolean = false;
    public loading: boolean = false;
    public btnLoading: boolean = false;

    public addForm: any = {
        list: [],
    };
    public rules = {
        custId: [{ required: true, message: "请选择", trigger: "change" }],
    };
    public keyNo: string = "";
    init(row) {
        this.keyNo = row.keyNo;
        this.showCreditedBizList({ keyNo: this.keyNo });
        this.loading = true;
        this.showLeadingbizList({ keyNo: this.keyNo })
            .then((res) => {
                this.$set(this.addForm, "list", res);
            })
            .finally(() => (this.loading = false));

        this.visible = true;
    }
    onChange(row, val) {
        this.showCreditInfo({ custId: val }).then((res) => {
            this.$set(row, "riskLevel", res.riskLevel);
            this.$set(row, "riskMaxAmt", res.riskMaxAmt);
            this.$set(row, "riskScore", res.riskScore);
            this.$set(row, "surveyId", res.surveyId);
            this.$set(row, "surveyMaxAmt", res.surveyMaxAmt);
        });
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
                let params = {
                    keyNo: this.keyNo,
                    leadingbizs: this.addForm.list,
                };
                this.btnLoading = true;
                this.addLeadingbiz(params)
                    .then((res) => {
                        this.$message({ type: "success", message: res });
                        this.visible = false;
                    })
                    .finally(() => (this.btnLoading = false));
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