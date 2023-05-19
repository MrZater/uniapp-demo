<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-18 12:02:40
 * @Description: 
-->
<template>
    <renderBtn code="finance_process_set_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="70px" ref="searchForm" size="small">
                    <el-form-item label="流程类型" prop="activiteType" class="br-form-item-label">
                        <el-select v-model.trim="formParams.activiteType" placeholder="请选择流程类型" filterable class="br-select">
                            <el-option v-for="(item,index) in m_selectList" :value="item.dictCode" :label="item.dictName" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="组织名称" prop="orgName">
                        <el-select v-model="formParams.orgName" placeholder="请选择组织名称" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect">
                            <el-option value="null">
                                <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="流程名称" prop="activiteName" class="br-form-item-label">
                        <el-input class="br-input" placeholder="请输入流程名称" v-model.trim="formParams.activiteName"></el-input>
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

const processControl = namespace("processControl");
const configManage = namespace("configManage");
import renderBtn from "@/components/renderBtn.vue";

@Component({
    components: {
        SearchWrapper,
        renderBtn,
    },
})
export default class Search extends Vue {
    @processControl.Action showDataByDicCodeFN;
    @processControl.Action processControlListFN;
    @processControl.State s_searchData;
    @processControl.State m_selectList;
    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList;
    /*-----------------start[变量]-----------------*/
    formParams = {
        activiteType: "",
        activiteName: "",
        orgName: "",
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    /*-----------------end[变量]-----------------*/

    created() {
        // 请求流程类型下拉框
        this.showDataByDicCodeFN({ dicCode: "processType" });
        // 请求列表数据
        this.processControlListFN(this.s_searchData);
        this.queryOrgNameList({ flag: "4" }); // 组织机构
    }

    search(): void {
        this.processControlListFN({ ...this.s_searchData, ...this.formParams });
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
        this.formParams["orgName"] = "";
        this.formParams["orgCode"] = "";
    }
    //点击组织名称
    onLeavesClick(data, node, el) {
        this.formParams["orgName"] = data.label;
        this.formParams["orgCode"] = data.id;
        this.$refs.treeSelect["handleClose"]();
    }
}
</script>

<style lang="scss">
</style>