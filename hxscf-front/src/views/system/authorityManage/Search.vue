<!--
 * @Author: mingliang.zhu 
 * @Date: 2020-09-23 14:29:09 
 * @Last Modified by:   mingliang.zhu 
 * @Last Modified time: 2020-09-23 14:29:09 
 -->
<template>
    <renderBtn code="plate_permission_manager_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small" @submit.native.prevent>
                    <el-form-item class="br-form-item-label" label="菜单名称" prop="resName">
                        <el-input class="br-input" placeholder="请输入菜单名称" v-model.trim="formParams.resName"></el-input>
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
const authorityManage = namespace("authorityManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @authorityManage.Action queryAllResource;
    public formParams = {
        resName: "",
    };
    created() {
        this.queryAllResource();
    }
    search(): void {
        this.queryAllResource(this.formParams);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>