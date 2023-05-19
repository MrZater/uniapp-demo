<template>
    <div class="" v-loading="loading">
        <div class="tags">
            <div class="tops">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="mb20">行业等级：{{tradeRating.riskLevel || "---"}}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="mb20">行业评分：<countTo :startVal='0' :endVal='tradeRating.score' :duration='1000'></countTo>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="mb20">行业评价说明：{{tradeRating.riskRemark}}</div>
                    </el-col>
                </el-row>
            </div>
            <div class="sub-gap"></div>
            <el-form :inline="true" :rules="rules" :model="queryForm" label-width="70px" ref="form" size="small">
                <el-table stripe :data="queryForm.customerRiskList" class="br-table" border style="width: 100%">
                    <el-table-column label="客户信用等级" prop="comRiskLevel"></el-table-column>
                    <el-table-column label="通用客户风险系数" prop="comRiskRatio"></el-table-column>
                    <el-table-column :label="'客户风险系数（行业等级 '+ lastRiskLevel + '）'" prop="lastRiskRatio"></el-table-column>
                    <el-table-column label="申请客户风险系数" prop="riskRatio">
                        <template slot-scope="scope">
                            <el-form-item :prop="'customerRiskList.' + scope.$index + '.riskRatio' " class="br-form-item-label" :rules="rules.riskRatio">
                                <el-input-number v-model.trim="scope.row.riskRatio" :precision="2" :step="0.1" :min="0" :max="1"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>

        </div>
    </div>
</template>

<script lang="ts">
import countTo from "vue-count-to";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");

@Component({
    components: {
        countTo,
    },
})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action showTradeRating;
    @tradeInfoManage.Action showCustomerRiskDetail;
    @tradeInfoManage.Action addAndUpdateCustomerRisk;
    @tradeInfoManage.State riskId;
    @tradeInfoManage.Mutation saveRiskId;
    public queryForm: any = {
        customerRiskList: [],
    };

    public loading: boolean = false;

    tradeRating: any = {};

    errorMsg: string = "";

    lastRiskLevel: string = ""; //行业等级

    rules = {
        riskRatio: [{ required: true, message: "请输入", trigger: "blur" }],
    };

    mounted() {
        this.loading = true;
        let baseParams = { riskId: this.riskId };
        this.showTradeRating(baseParams)
            .then((res) => {
                res.score = Number(res.score);
                this.tradeRating = {
                    riskLevel: res.riskLevel,
                    score: res.score,
                    riskRemark: res.riskRemark,
                };
            })
            .catch((err) => (this.errorMsg = err))
            .finally(() => (this.loading = false));
        this.showCustomerRiskDetail({
            ...baseParams,
            orgPcode: this.$route.query.orgPcode,
            keyNo: this.$route.query.keyNo,
        })
            .then((res) => {
                res.customerRiskList.forEach((item) => (item.riskRatio = "0"));
                this.lastRiskLevel = res.lastRiskLevel || "";
                this.$set(
                    this.queryForm,
                    "customerRiskList",
                    res.customerRiskList
                );
            })
            .catch((err) => (this.errorMsg = err));
    }
    submit() {
        let $el: any = this.$refs["form"];
        $el.validate((valid) => {
            if (valid) {
                if (this.errorMsg) {
                    this.$message({
                        type: "error",
                        message:
                            "获取行业模型数据处理有误或获取通用客户风险系数有误",
                    });
                    return;
                }
                let params = {
                    riskId: this.riskId,
                    tradeRating: this.tradeRating,
                    customerRiskList: this.queryForm.customerRiskList,
                    keyNo: this.$route.query.keyNo || "",
                };
                this.addAndUpdateCustomerRisk(params).then((res) => {
                    this.$message({ type: "success", message: res });
                    this.saveRiskId("");
                    this.$bus.$emit("jumpToTag", {
                        path: this.$route.path,
                        tag: "/customRiskCoefficient",
                    });
                });
            } else {
                return false;
            }
        });
    }
}
</script>

<style scoped lang="scss">
.tags {
    background: #fff;
    padding: 20px;
}
.mb20 {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    font-weight: bold;
}
</style>
