<!--
 * @Author: mingliang.zhu
 * @Date: 2021-02-04 14:50:09
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-02-04 14:50:09
 * @Description: 消息管理
-->

<template>
    <!-- <renderBtn code="post_manage_sel"> -->
    <search-wrapper>
        <template slot="default">
            <el-form :inline="true" :model="queryForm" label-width="65px" ref="searchForm" size="small" @submit.native.prevent>
                <el-form-item class="br-form-item-label" label="公告主题" prop="noticeTitle">
                    <el-input class="br-input" placeholder="请输入公告主题" v-model.trim="queryForm.noticeTitle"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="公告类型" prop="noticeType">
                    <el-select v-model="queryForm.noticeType" placeholder="请选择公告类型" filterable class="br-select">
                        <el-option v-for="(item,index) in noticeTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="通知方式" prop="noticeMode">
                    <el-select v-model="queryForm.noticeMode" placeholder="请选择通知方式" filterable multiple collapse-tags class="br-select">
                        <el-option v-for="(item,index) in $select('noticeModeType')" :key="index" :value="item.value" :label="item.text"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="发布时间" prop="timeRange">
                    <el-date-picker class="br-datepicker" v-model="queryForm.timeRange" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </template>
        <template #btn>
            <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
        </template>
    </search-wrapper>
    <!-- </renderBtn> -->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";
const noticeManage = namespace("noticeManage");

@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @noticeManage.Action queryNoticeList;
    @noticeManage.Action saveSearchDataFN;
    @noticeManage.State saveSearch;
    @noticeManage.State searchData;
    @noticeManage.Action queryDataByDicCode;
    @noticeManage.State noticeTypeOption; //通知类型

    public queryForm: any = {
        noticeTitle: "",
        noticeType: "",
        timeRange: [],
        noticeMode: [],
    };

    created() {
        this.saveSearchDataFN({
            pageNum: 1,
            pageSize: 10,
        });
        // 通知类型
        this.queryDataByDicCode({ dicCode: "noticeType" });
        this.queryNoticeList(this.saveSearch);
    }

    search(): void {
        let val = this.queryForm.timeRange;
        this.queryForm.beginDate = val[0] != null ? val[0] : "";
        this.queryForm.endDate = val[1] != null ? val[1] : "";
        let params = {
            ...this.saveSearch,
            ...this.queryForm,
        };
        delete params.timeRange;
        this.queryNoticeList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>