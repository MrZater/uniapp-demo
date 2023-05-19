<template>
    <div v-loading="loading">
        <div class="sub-gap"></div>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="mb20">行业等级：{{data.riskLevel || "---"}}</div>
            </el-col>
            <el-col :span="8">
                <div class="mb20">行业评分：<countTo :startVal='0' :endVal='data.riskScore' :duration='1000'></countTo>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="mb20">行业评价说明：{{data.riskRemark}}</div>
            </el-col>
        </el-row>
        <div class="sub-gap"></div>
        <el-table stripe :data="data.customerRiskList" class="br-table" border style="width: 100%">
            <el-table-column label="客户信用等级" prop="comRiskLevel"></el-table-column>
            <el-table-column label="通用客户风险系数" prop="comRiskRatio"></el-table-column>
            <el-table-column :label="'客户风险系数（行业等级 '+ data.lastRiskLevel + '）'" prop="lastRiskRatio"></el-table-column>
            <el-table-column label="申请客户风险系数" prop="riskRatio"></el-table-column>
        </el-table>
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
    @tradeInfoManage.Action showHisCustomerDetail; //查看历史客户风险系数
    public data: any = {
        riskLevel: "",
        riskScore: 0,
        riseRemark: "",
        lastRiskLevel: "",
        customerRiskList: [],
    };
    public loading: boolean = false;

    mounted() {
        /* 入口为 客户风险系数 时， keyNo 取值为 tradeKeyNo  */
        /* 入口为 行业信息管理 时， keyNo 取值为 keyNo  */
        let { riskId, orgPcode, keyNo, tradeKeyNo } = this.$route.query;
        let params = {
            riskId: riskId,
            orgPcode: orgPcode,
            keyNo: keyNo || tradeKeyNo,
        };
        this.loading = true;
        this.showHisCustomerDetail(params)
            .then((res) => {
                res.riskScore = Number(res.riskScore);
                this.data = res;
            })
            .finally(() => (this.loading = false));
    }
}
</script>

<style scoped lang="scss">
.mb20 {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    font-weight: bold;
}
</style>
