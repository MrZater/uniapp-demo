<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-17 10:10:14
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 16:18:50
 * @Description: 
-->
<template>
    <renderBtn code="industry_template_sel">
        <SearchWrapper>
            <template slot="default">
                <el-form :inline="true" :model="queryForm" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="模板名称" prop="modelName">
                        <el-input class="br-input" placeholder="请输入模板名称" v-model.trim="queryForm.modelName"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="状态" prop="apprState">
                        <el-select v-model="queryForm.apprState" placeholder="请选择状态" class="br-select">
                            <el-option v-for="(item,index) of $select('templateStatus')" :key="index" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="行业名称" prop="tradeKeyNo" v-if="flag == '1'">
                        <el-select v-model="queryForm.tradeKeyNo" placeholder="请选择行业名称" class="br-select">
                            <el-option v-for="item in tradeList" :key="item.keyNo" :label="item.tradeName" :value="item.keyNo"></el-option>
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
    </renderBtn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";

const credit = namespace("credit");
@Component({
    components: {
        SearchWrapper,
    },
})
export default class Search extends Vue {
    @Prop({ type: String }) flag;
    @credit.Action queryList;
    @credit.State searchData;
    @credit.Action queryTradeList; // 所属行业
    @credit.State tradeList; // 所属行业
    public queryForm: any = {
        modelName: "",
        apprState: "",
        tradeKeyNo: "",
        timeSelect: [],
    };

    created() {
        if (this.flag === "0") {
            // 资信调查模板-通用模板
            this.queryList({
                ...this.searchData,
                modelFlag: "0",
                modelType: "02",
            });
        } else if (this.flag === "1") {
            // 资信调查模板-行业特殊信息模板
            /* 只有行业特殊信息模板，才需要调行业接口 */
            this.queryList({
                ...this.searchData,
                modelFlag: "1",
                modelType: "02",
            });
            this.queryTradeList();
        } else if (this.flag === "2") {
            // 行业调查模板
            this.queryList({
                ...this.searchData,
                modelFlag: "0",
                modelType: "01",
            });
        }
    }

    search(): void {
        let val = this.queryForm.timeSelect;
        this.queryForm.beginDate = val[0] != null ? val[0] : "";
        this.queryForm.endDate = val[1] != null ? val[1] : "";
        let params = {
            ...this.searchData,
            ...this.queryForm,
            modelFlag: this.flag == "1" ? "1" : "0",
            modelType: this.flag === "2" ? "01" : "02",
        };

        delete params.timeSelect;
        this.queryList(params);
        // this.saveSearchDataFN(params)
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>