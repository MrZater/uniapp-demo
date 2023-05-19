<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-10 09:38:33
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-15 19:51:36
 * @Description: 
-->
<template>
    <search-wrapper>
        <template #default>
            <el-form :inline="true" :model="form" label-width="65px" ref="searchForm" size="small" @submit.native.prevent>
                <el-form-item class="br-form-item-label" label="机构名称" prop="orgName">
                    <el-input class="br-input" placeholder="请输入机构名称" v-model.trim="form.orgName"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #btn>
            <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
        </template>
    </search-wrapper>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SearchWrapper from "@/components/SearchWrapper.vue";
const organizationManage = namespace("orgManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @organizationManage.Action queryOrgList;
    public form = {
        flag: "1",
        orgName: "",
    };
    created() {
        this.search();
    }
    search() {
        this.queryOrgList(this.form);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
        this.form.orgName = "";
    }
}
</script>