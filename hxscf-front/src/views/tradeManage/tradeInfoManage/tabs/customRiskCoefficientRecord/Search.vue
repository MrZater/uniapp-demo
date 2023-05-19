<!--
 * @Author: mingliang.zhu
 * @Date: 2021-01-08 14:39:46
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-01-08 14:39:46
 * @Description: 
-->
<template>
    <SearchWrapper>
        <template slot="default">
            <el-form :inline="true" :model="queryForm" ref="searchForm" size="small">
                <el-form-item class="br-form-item-label" label="行业等级" prop="riskLevel">
                    <el-input class="br-input" placeholder="请输入行业等级" v-model.trim="queryForm.riskLevel"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="状态" prop="apprState">
                    <el-select v-model.trim="queryForm.apprState" placeholder="请选择状态" class="br-select">
                        <el-option v-for="(item,index) of $select('templateStatus')" :key="index" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="创建时间" prop="timeSelect">
                    <el-date-picker class="br-select" v-model="queryForm.timeSelect" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </template>
        <template slot="btn">
            <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="br-btn template-reset-btn" @click="resetForm()">重置</el-button>
        </template>
    </SearchWrapper>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";

const customRiskCoefficientRecord = namespace("customRiskCoefficientRecord");
@Component({
    components: {
        SearchWrapper,
    },
})
export default class Search extends Vue {
    @customRiskCoefficientRecord.Action queryList;
    @customRiskCoefficientRecord.State searchData;
    @customRiskCoefficientRecord.Action saveSearchData;
    public queryForm: any = {
        riskLevel: "",
        apprState: "",
        timeSelect: [],
    };

    created() {
        this.search();
    }

    search(): void {
        let val = this.queryForm.timeSelect;
        this.queryForm.beginDate = val[0] != null ? val[0] : "";
        this.queryForm.endDate = val[1] != null ? val[1] : "";
        let params = {
            ...this.searchData,
            ...this.queryForm,
            keyNo: this.$route.query.keyNo,
        };

        delete params.timeSelect;
        this.queryList(params);
        this.saveSearchData(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>