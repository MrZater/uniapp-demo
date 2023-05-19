<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-10 15:52:52
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-12 16:38:48
 * @Description: 
-->
<template>
    <renderBtn code="role_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small" @submit.native.prevent>
                    <el-form-item class="br-form-item-label" label="角色名称" prop="roleName">
                        <el-input class="br-input" placeholder="请输入角色名称" v-model.trim="formParams.roleName"></el-input>
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
const roleManage = namespace("roleManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @roleManage.Action queryRoleList;
    @roleManage.Action saveSearchDataFN;
    @roleManage.State searchData;
    public formParams = {
        roleName: "",
    };
    created() {
        let params = {
            pageNum: 1,
            pageSize: 10,
        };
        this.queryRoleList(params);
    }
    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
        };
        this.queryRoleList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>