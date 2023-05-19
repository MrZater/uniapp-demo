/*
 * @Author: mingliang.zhu 
 * @Date: 2021-01-07 10:35:58 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 16:18:32
 */
<template>
    <renderBtn code="log_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="操作人员" prop="userName">
                        <el-input class="br-input" placeholder="请输入操作人员" v-model.trim="formParams.userName"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="操作类型" prop="operType">
                        <el-select v-model="formParams.operType" placeholder="请选择操作类型" filterable class="br-select">
                            <el-option v-for="(item,index) in $select('operType')" :key="index" :value="item.value" :label="item.text"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="操作状态" prop="operState">
                        <el-select v-model="formParams.operState" placeholder="请选择操作状态" filterable class="br-select">
                            <el-option v-for="(item,index) in $select('successAndFailure')" :key="index" :value="item.value" :label="item.text"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="创建时间" prop="time">
                        <el-date-picker v-model="formParams.time" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </template>
            <template slot="btn">
                <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
            </template>
        </search-wrapper>
    </renderBtn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";

const logManage = namespace("logManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @logManage.Action queryList;
    @logManage.Action saveSearchDataFN;
    @logManage.State searchData;

    public formParams = {
        userName: "",
        operType: "",
        operState: "",
        time: [],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    created() {
        this.search();
    }

    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
            otherDate: this.formParams.time[0] ? this.formParams.time[0] : "",
            endDate: this.formParams.time[1] ? this.formParams.time[1] : "",
        };
        delete params.time;
        this.queryList(params);
        this.saveSearchDataFN(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>