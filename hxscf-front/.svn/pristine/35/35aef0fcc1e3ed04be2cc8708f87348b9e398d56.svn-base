<template>
    <el-dialog title="变更关联企业" :visible.sync="visible" width="1100px" class="br-dialog">
        <div v-loading="loading">
            <div class="sub-title">新增关联企业</div>
            <el-table stripe border :data="data.addData" class="br-table">
                <el-table-column label="企业名称" prop="bizName" show-overflow-tooltip></el-table-column>
                <el-table-column label="企业性质" prop="bizNature" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{handleBizNature(row.bizNature)}}
                    </template>
                </el-table-column>
                <el-table-column label="实缴资本（万元）" prop="realAmt" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="净资产" prop="netAmt" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用等级" prop="riskLevel" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用评分" prop="riskScore" width="80px" show-overflow-tooltip></el-table-column>
                <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用风险限额" prop="riskMaxAmt" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="是否担保" prop="guaranteeFlag" width="80px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("guaranteeType",row.guaranteeFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="是否设置申请额度" prop="quotaSetFlag" width="120px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("quotaSetType",row.quotaSetFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="申请额度" prop="applyQuota" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="授信到期日" prop="endDate" width="100px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.endDate | date}}
                    </template>
                </el-table-column>
                <el-table-column label="其他信息" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onOpenInner(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onReport(scope.row)">资信报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-title">删除关联企业</div>
            <el-table stripe border :data="data.deleteData" class="br-table">
                <el-table-column label="企业名称" prop="bizName" show-overflow-tooltip></el-table-column>
                <el-table-column label="企业性质" prop="bizNature" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{handleBizNature(row.bizNature)}}
                    </template>
                </el-table-column>
                <el-table-column label="实缴资本（万元）" prop="realAmt" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="净资产" prop="netAmt" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用等级" prop="riskLevel" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用评分" prop="riskScore" width="80px" show-overflow-tooltip></el-table-column>
                <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用风险限额" prop="riskMaxAmt" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="是否担保" prop="guaranteeFlag" min-width="120px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("guaranteeType",row.guaranteeFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="是否设置申请额度" prop="quotaSetFlag" width="120px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("quotaSetType",row.quotaSetFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="申请额度" prop="applyQuota" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="审批额度" prop="approveQuota" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="授信到期日" prop="endDate" width="100px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.endDate | date}}
                    </template>
                </el-table-column>
                <el-table-column label="通过日期" prop="passDate" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.passDate | date}}
                    </template>
                </el-table-column>
                <el-table-column label="其他信息" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onOpenInner(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onReport(scope.row)">资信报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-title">编辑关联企业</div>
            <el-table stripe border :data="data.updateData" class="br-table" row-key="keyNo" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
                <el-table-column label="企业名称" prop="bizName" width="200px" show-overflow-tooltip></el-table-column>
                <el-table-column label="企业性质" prop="bizNature" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{handleBizNature(row.bizNature)}}
                    </template>
                </el-table-column>
                <el-table-column label="实缴资本（万元）" prop="realAmt" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="净资产" prop="netAmt" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用等级" prop="riskLevel" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用评分" prop="riskScore" show-overflow-tooltip></el-table-column>
                <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用风险限额" prop="riskMaxAmt" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="是否担保" prop="guaranteeFlag" min-width="120px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("guaranteeType",row.guaranteeFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="是否设置申请额度" prop="quotaSetFlag" width="120px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("quotaSetType",row.quotaSetFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="申请额度" prop="applyQuota" min-width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="授信到期日" prop="endDate" width="100px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.endDate | date}}
                    </template>
                </el-table-column>
                <el-table-column label="其他信息" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onOpenInner(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onReport(scope.row)">资信报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <template slot="footer">
        </template>
        <div slot="footer" class="br-dialog-footer">
            <el-button class="br-btn-large" @click="visible = false">关闭</el-button>
        </div>
        <el-dialog title="逾期处理情况" :visible.sync="visibleInner" width="460px" class="br-dialog" :append-to-body="true">
            <el-input type="textarea" v-model.trim="remark" class="br-textarea__full" placeholder="请输入逾期处理情况" :autosize="{ minRows: 8, maxRows: 14 }" maxlength="200" show-word-limit>
            </el-input>
            <div slot="footer" class="br-dialog-footer">
                <el-button type="primary" class="br-btn-large" @click="onSaveRemark">保存</el-button>
                <el-button class="br-btn-large" @click="visibleInner = false">取消</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
@Component({})
export default class Dialog extends Vue {
    @general.Action querychangeInfo;
    @general.Action queryUpdateChangeInfo;
    @general.State enterpriseNatureOption;
    visible: boolean = false;
    visibleInner: boolean = false;
    loading: boolean = false;
    data: any = {
        addData: [],
        deleteData: [],
        updateData: [],
    };
    remark: string = "";
    cacheRow: any = {};

    // 翻译企业性质
    handleBizNature(code) {
        let target = this.enterpriseNatureOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "";
    }

    init() {
        this.visible = true;
        this.getData();
    }

    getData() {
        this.loading = true;
        this.querychangeInfo({
            creditId: this.$route.query.creditId,
        })
            .then((res) => {
                this.$set(this.data, "addData", res.addData);
                this.$set(this.data, "deleteData", res.deleteData);
                res.updateData.forEach((item) => {
                    item.children = [item.children];
                });
                this.$set(this.data, "updateData", res.updateData);
            })
            .finally(() => (this.loading = false));
    }

    // 备注
    onOpenInner(row) {
        this.cacheRow = row;
        this.remark = row.remark;
        this.visibleInner = true;
    }

    // 保存备注
    onSaveRemark() {
        this.queryUpdateChangeInfo({
            keyNo: this.cacheRow.keyNo,
            remark: this.remark,
        }).then(() => {
            this.visibleInner = false;
            this.cacheRow.remark = this.remark;
        });
    }

    // 资信报告
    onReport(row) {}
}
</script>

<style lang="scss" scoped>
</style>