<!--
 * @Author: mingliang.zhu
 * @Date: 2021-02-04 11:52:04
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-02-05 14:55:12
 * @Description: 消息管理
-->
<template>
    <renderBtn code="message_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="queryForm" label-width="65px" ref="searchForm" size="small" @submit.native.prevent>
                    <el-form-item class="br-form-item-label" label="通知方式" prop="noticeMode">
                        <el-select v-model="queryForm.noticeMode" placeholder="请选择通知方式" filterable multiple collapse-tags class="br-select">
                            <el-option v-for="(item,index) in $select('noticeModeType')" :key="index" :value="item.value" :label="item.text"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="用户登录名/企业微信/企业邮箱" label-width="200px" prop="noticeUserId">
                        <el-input class="br-input" placeholder="用户登录名/企业微信/企业邮箱" v-model.trim="queryForm.noticeUserId"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="状态" prop="noticeState">
                        <el-select v-model="queryForm.noticeState" placeholder="请选择状态" filterable class="br-select">
                            <el-option v-for="(item,index) in statusOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="通知类型" prop="noticeType">
                        <el-select v-model="queryForm.noticeType" placeholder="请选择通知类型" filterable class="br-select">
                            <el-option v-for="(item,index) in noticeTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="内容" prop="noticeContent">
                        <el-input class="br-input" placeholder="请输入内容" v-model.trim="queryForm.noticeContent"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template #btn>
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
const messageManage = namespace("messageManage");

@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @messageManage.Action queryMsgList;
    @messageManage.Action saveSearchDataFN;
    @messageManage.State saveSearch;
    @messageManage.State searchData;
    @messageManage.Action queryDataByDicCode;
    @messageManage.State statusOption; //状态
    @messageManage.State noticeTypeOption; //通知类型

    public queryForm: any = {
        noticeMode: [],
        noticeUserId: "",
        noticeState: "",
        noticeType: "",
        noticeContent: "",
    };
    created() {
        this.saveSearchDataFN({
            pageNum: 1,
            pageSize: 10,
        });
        // 状态
        this.queryDataByDicCode({ dicCode: "sendStatus" });
        // 通知类型
        this.queryDataByDicCode({ dicCode: "messageNoticeType" });

        this.queryMsgList(this.saveSearch);
    }
    search(): void {
        let params = {
            ...this.saveSearch,
            ...this.queryForm,
        };
        this.queryMsgList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>