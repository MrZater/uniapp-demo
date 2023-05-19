<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:19:07
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-30 16:07:09
 * @Description: 
-->

<template>
    <renderBtn code="post_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small" @submit.native.prevent>
                    <el-form-item class="br-form-item-label" label="岗位名称" prop="postName">
                        <el-input class="br-input" placeholder="请输入岗位名称" v-model.trim="formParams.postName"></el-input>
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
const postManage = namespace("postManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @postManage.Action queryPostList;
    @postManage.Action saveSearchDataFN;

    @postManage.State saveSearch;

    public formParams = {
        postName: "",
    };
    created() {
        this.saveSearchDataFN({
            pageNum: 1,
            pageSize: 10,
        });
        this.queryPostList(this.saveSearch);
    }
    search(): void {
        let params = {
            ...this.saveSearch,
            ...this.formParams,
        };
        this.queryPostList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>