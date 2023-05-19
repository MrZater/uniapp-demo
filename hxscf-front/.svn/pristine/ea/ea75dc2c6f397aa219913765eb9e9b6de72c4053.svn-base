<template>
    <div class="template-container" v-loading="loading">
        <el-form :inline="true" :model="queryForm" label-width="60px" ref="form" size="small">
            <el-form-item class="br-form-item-label" label="数据年份" prop="indexDate">
                <span style="font-size:12px">{{queryForm.indexDate}}</span>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="盈利能力状况" name="first">
                <Grid :list="data.profitAbility"></Grid>
            </el-tab-pane>
            <el-tab-pane label="资产质量状况" name="second">
                <Grid :list="data.assetQuality"></Grid>
            </el-tab-pane>
            <el-tab-pane label="债务风险状况" name="third">
                <Grid :list="data.debtRisk"></Grid>
            </el-tab-pane>
            <el-tab-pane label="经营增长状况" name="fourth">
                <Grid :list="data.businessIncrease"></Grid>
            </el-tab-pane>
            <el-tab-pane label="其他绩效状况" name="five">
                <Grid :list="data.otherItem"></Grid>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");
import Grid from "./Grid.vue";

@Component({
    components: {
        Grid,
    },
})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action queryRiskTradeBase; //查看行业基础数据
    public queryForm: any = {
        indexDate: "",
    };

    public loading: boolean = false;

    public activeName: string = "first"; // 页签

    data: any = {
        profitAbility: [],
        assetQuality: [],
        debtRisk: [],
        businessIncrease: [],
        otherItem: [],
    };

    mounted() {
        this.init();
    }
    init() {
        this.loading = true;
        this.queryRiskTradeBase({ riskId: this.$route.query.riskId })
            .then((res) => {
                this.$set(this.queryForm, "indexDate", res.indexDate);
                this.data = res;
            })
            .finally(() => (this.loading = false));
    }
}
</script>

<style scoped lang="scss">
</style>
