/*
 * @Author: mingliang.zhu 
 * @Date: 2020-12-31 10:30:22 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 16:22:27
 */

<template>
    <renderBtn code="user_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="用户名" prop="userId">
                        <el-input class="br-input" placeholder="请输入用户名" v-model.trim="formParams.userId"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="真实姓名" prop="realName">
                        <el-input class="br-input" placeholder="请输入真实姓名" v-model.trim="formParams.realName"></el-input>
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
const userManage = namespace("userManage");

@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @userManage.Action queryList;
    @userManage.State searchData;
    @userManage.Action saveSearchDataFN;

    public formParams = {
        userId: "",
        realName: "",
    };

    created() {
        this.saveSearchDataFN({
            pageNum: 1,
            pageSize: 10,
        });
        this.queryList(this.searchData);
    }
    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
        };
        this.queryList(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>