<template>
    <div class="template-container" v-loading="loading">
        <div class="sub-gap"></div>
        <el-table stripe :data="list" class="br-table" border style="width: 100%">
            <el-table-column label="头部企业名称" prop="custId" width="250px"></el-table-column>
            <el-table-column label="信用等级" prop="riskLevel"></el-table-column>
            <el-table-column label="信用评分" prop="riskScore"></el-table-column>
            <el-table-column label="建议信用额度上限" prop="surveyMaxAmt"></el-table-column>
            <el-table-column label="信用风险限额" prop="riskMaxAmt"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");

@Component({})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action showLeadingbizList;

    public loading: boolean = false;

    list: any = [];

    mounted() {
        this.loading = true;
        this.showLeadingbizList({ keyNo: this.$route.query.keyNo })
            .then((res) => {
                this.list = res;
            })
            .finally(() => (this.loading = false));
    }
}
</script>

<style scoped lang="scss">
</style>
