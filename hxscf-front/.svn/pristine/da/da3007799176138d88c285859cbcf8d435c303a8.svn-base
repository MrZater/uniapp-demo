<!--
 * @Author: mingliang.zhu
 * @Date: 2021-02-23 14:18:13
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-02-23 14:18:13
 * @Description: 授信通知模糊查询
-->
<template>
    <renderBtn code="credit_notice_set_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="90px" ref="searchForm" size="small" @submit.native.prevent>
                    <el-form-item class="br-form-item-label" label="授信通知主题" prop="messageTitle">
                        <el-input class="br-input" placeholder="请输入授信通知主题" v-model.trim="formParams.messageTitle"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="状态" prop="isDel">
                        <el-select v-model="formParams.isDel" placeholder="请选择状态" filterable class="br-select">
                            <el-option v-for="(item,index) in $select('costStatus')" :key="index" :value="item.value" :label="item.text"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="创建时间" prop="time">
                        <el-date-picker v-model="formParams.time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
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
const creditNotice = namespace("creditNotice");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @creditNotice.Action queryNoticeList;
    @creditNotice.Action saveSearchDataFN;
    @creditNotice.State searchData;
    public formParams = {
        messageTitle: "",
        isDel: "",
        time: [],
    };
    created() {
        let params = {
            pageNum: 1,
            pageSize: 10,
        };
        this.queryNoticeList(params);
    }
    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
            beginDate: this.formParams.time[0] ? this.formParams.time[0] : "",
            endDate: this.formParams.time[1] ? this.formParams.time[1] : "",
        };
        delete params.time;
        this.queryNoticeList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>