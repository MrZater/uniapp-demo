<template>
    <SearchWrapper>
        <template slot="default">
            <el-form :inline="true" :model="queryForm" ref="searchForm" size="small">
                <el-form-item class="br-form-item-label" label-width="65px" label="报告来源" prop="reportSource">
                    <el-select v-model="queryForm.reportSource" placeholder="请选择报告来源" filterable class="br-select" clearable>
                        <el-option v-for="item in reportSourceOption" :key="item.value" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label-width="85px" label="创建时间" prop="timeRange">
                    <el-date-picker class="br-datepicker-large" v-model="queryForm.timeRange" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                    <el-button class="br-btn template-reset-btn" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </template>
    </SearchWrapper>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";

const creditReport = namespace("creditReport");
@Component({
    components: {
        SearchWrapper,
    },
})
export default class Search extends Vue {
    @creditReport.Action queryList;
    @creditReport.State searchData;
    @creditReport.Action queryDataByDicCode; // 报告来源
    @creditReport.State reportSourceOption; // 报告来源

    public queryForm: any = {
        reportSource: "",
        timeRange: [],
    };

    created() {
        this.queryDataByDicCode({ dicCode: "reportSource" });
        let { custId } = this.$route.query;
        this.queryList({ custId: custId, ...this.searchData });
    }

    search(): void {
        let val = this.queryForm.timeRange;
        this.queryForm.beginDate = val[0] != null ? val[0] : "";
        this.queryForm.endDate = val[1] != null ? val[1] : "";
        let { custId } = this.$route.query;
        let params = {
            ...this.searchData,
            ...this.queryForm,
            custId: custId,
        };
        delete params.timeRange;
        this.queryList(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>