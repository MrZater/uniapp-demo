<template>
    <SearchWrapper>
        <template slot="default">
            <el-form :inline="true" :model="queryForm" ref="searchForm" label-width="72px" size="small">
                <el-form-item class="br-form-item-label" label="业务类型" prop="businessType">
                    <el-select v-model="queryForm.businessType" placeholder="请选择业务类型" filterable class="br-select">
                        <el-option v-for="(item,index) in businessOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="授信方式" prop="creditType">
                    <el-select v-model="queryForm.creditType" placeholder="请选择授信方式" filterable class="br-select">
                        <el-option v-for="(item,index) in creditTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="额度种类" prop="quotaType">
                    <el-select v-model="queryForm.quotaType" placeholder="请选择额度种类" filterable class="br-select">
                        <el-option v-for="(item,index) in $select('quotaType')" :key="index" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="状态" prop="apprState">
                    <el-select v-model="queryForm.apprState" placeholder="请选择状态" filterable class="br-select" clearable>
                        <el-option v-for="item in $select('templateStatus')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="创建时间" prop="createTime">
                    <el-date-picker class="br-datepicker" v-model="queryForm.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="通过时间" prop="passTime">
                    <el-date-picker v-model="queryForm.passTime" class="br-datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="授信到期日" prop="endTime">
                    <el-date-picker class="br-datepicker" v-model="queryForm.endTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </template>
        <template slot="btn">
            <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
        </template>
    </SearchWrapper>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";

const creditExten = namespace("creditExten");
@Component({
    components: {
        SearchWrapper,
    },
})
export default class Search extends Vue {
    @Prop({ type: String }) flag;
    @creditExten.Action queryList;
    @creditExten.State searchData;
    @creditExten.Action queryDataByDicCode;
    @creditExten.State businessOption; // 业务类型
    @creditExten.State creditTypeOption; // 授信方式

    public queryForm: any = {
        businessType: "",
        creditType: "",
        quotaType: "",
        apprState: "",
        createTime: [],
        passTime: [],
        endTime: [],
    };

    created() {
        // 业务类型
        this.queryDataByDicCode({ dicCode: "businessType" });
        // 授信方式
        this.queryDataByDicCode({ dicCode: "creditType" });

        if (this.flag === "0") {
            // 一般授信
            let { custId } = this.$route.query;
            this.queryList({ custId: custId, ...this.searchData });
        } else {
            // 临时授信
        }
    }

    search(): void {
        /* 创建时间 */
        let val1 = this.queryForm.createTime;
        this.queryForm.beginDate = val1[0] != null ? val1[0] : "";
        this.queryForm.endDate = val1[1] != null ? val1[1] : "";

        /* 通过时间 */
        let val2 = this.queryForm.passTime;
        this.queryForm.passBeginDate = val2[0] != null ? val2[0] : "";
        this.queryForm.passBeginDate = val2[1] != null ? val2[1] : "";

        /* 资信到期日 */
        let val3 = this.queryForm.endTime;
        this.queryForm.beginDay = val3[0] != null ? val3[0] : "";
        this.queryForm.endDay = val3[1] != null ? val3[1] : "";

        let { custId } = this.$route.query;

        let params = {
            ...this.searchData,
            ...this.queryForm,
            custId: custId,
        };

        delete params.createTime;
        delete params.passTime;
        delete params.endTime;
        this.queryList(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>