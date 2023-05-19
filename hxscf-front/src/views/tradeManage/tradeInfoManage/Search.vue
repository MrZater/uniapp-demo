<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:19:08
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 17:30:37
 * @Description: 
-->
<template>
    <renderBtn code="tradeInfo_manage_sel">
        <SearchWrapper>
            <template slot="default">
                <el-form :inline="true" :model="queryForm" label-width="65px" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="行业名称" prop="keyNo">
                        <el-select v-model="queryForm.keyNo" placeholder="请选择行业名称" filterable class="br-select">
                            <el-option v-for="item in tradeList" :key="item.keyNo" :label="item.tradeName" :value="item.keyNo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="创建时间" prop="timeSelect">
                        <el-date-picker class="br-select" v-model="queryForm.timeSelect" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="组织名称" prop="orgName">
                        <el-select v-model="queryForm.orgName" placeholder="请选择组织名称" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect">
                            <el-option value="null">
                                <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #btn>
                <!-- <renderBtn code="dic_manage_sel"> -->
                <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                <el-button class="br-btn template-reset-btn" @click="resetForm()">重置</el-button>
                <!-- </renderBtn> -->
            </template>
        </SearchWrapper>
    </renderBtn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";
const configManage = namespace("configManage");
const tradeInfoManage = namespace("tradeInfoManage");
@Component({
    components: {
        SearchWrapper,
    },
})
export default class Search extends Vue {
    @tradeInfoManage.Action queryList;
    @tradeInfoManage.State searchData;
    @tradeInfoManage.Action queryTradeList; // 所属行业
    @tradeInfoManage.State tradeList; // 所属行业
    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList;
    public queryForm: any = {
        timeSelect: [],
        keyNo: "",
        orgName: "",
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    created() {
        this.queryList(this.searchData);
        this.queryTradeList();
        this.queryOrgNameList({ flag: "4" }); // 组织机构
    }

    search(): void {
        let val = this.queryForm.timeSelect;
        this.queryForm.beginDate = val[0] != null ? val[0] : "";
        this.queryForm.endDate = val[1] != null ? val[1] : "";
        let params = {
            ...this.searchData,
            ...this.queryForm,
        };

        delete params.timeSelect;
        delete params.orgName;
        this.queryList(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
        this.queryForm["orgName"] = "";
        this.queryForm["orgCode"] = "";
    }
    //点击组织名称
    onLeavesClick(data, node, el) {
        this.queryForm["orgName"] = data.label;
        this.queryForm["orgCode"] = data.id;
        this.$refs.treeSelect["handleClose"]();
    }
}
</script>

<style lang="scss">
</style>