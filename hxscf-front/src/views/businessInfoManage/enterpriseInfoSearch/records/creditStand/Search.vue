<template>
    <SearchWrapper>
        <template slot="default">
            <el-form :inline="true" :model="queryForm" ref="searchForm" size="small">
                <el-form-item class="br-form-item-label" label-width="45px" label="状态" prop="apprState">
                    <el-select v-model="queryForm.apprState" placeholder="请选择状态" filterable class="br-select" clearable>
                        <el-option v-for="item in $select('templateStatus')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label-width="85px" label="创建时间" prop="createTime">
                    <el-date-picker class="br-datepicker" v-model="queryForm.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="br-form-item-label" label-width="85px" label="资信到期日" prop="limitTime">
                    <el-date-picker class="br-datepicker" v-model="queryForm.limitTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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

const creditStand = namespace("creditStand");
@Component({
    components: {
        SearchWrapper,
    },
})
export default class Search extends Vue {
    @creditStand.Action queryList;
    @creditStand.State searchData;

    public queryForm: any = {
        createTime: [],
        limitTime: [],
        apprState: "",
    };

    created() {
        let { custId } = this.$route.query;
        this.queryList({ custId: custId, ...this.searchData });
    }

    search(): void {
        let val1 = this.queryForm.createTime;
        this.queryForm.beginDate = val1[0] != null ? val1[0] : "";
        this.queryForm.endDate = val1[1] != null ? val1[1] : "";

        let val2 = this.queryForm.limitTime;
        this.queryForm.beginDay = val2[0] != null ? val2[0] : "";
        this.queryForm.endDay = val2[1] != null ? val2[1] : "";

        let { custId } = this.$route.query;

        let params = {
            ...this.searchData,
            ...this.queryForm,
            custId: custId,
        };

        delete params.createTime;
        delete params.limitTime;
        this.queryList(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>