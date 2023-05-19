/*
 * @Author: mingliang.zhu 
 * @Date: 2020-12-29 09:17:36 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 16:14:18
 */

<template>
    <renderBtn code="staff_matrix_set_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="组织名称" prop="orgName">
                        <el-select v-model="formParams.orgName" placeholder="请选择组织名称" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect">
                            <el-option value="null">
                                <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="创建时间" prop="time">
                        <el-date-picker v-model="formParams.time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
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
const staffMatrix = namespace("staffMatrix");
const configManage = namespace("configManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList;
    @staffMatrix.Action queryList;
    @staffMatrix.State searchData;
    @staffMatrix.Action saveSearchDataFN;

    public formParams: any = {
        orgName: "",
        orgCode: "",
        time: [],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    created() {
        this.saveSearchDataFN({
            pageNum: 1,
            pageSize: 10,
        });
        this.queryList(this.searchData);
        this.queryOrgNameList({ flag: "4" }); // 组织机构
    }
    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
            beginDate: this.formParams.time[0] ? this.formParams.time[0] : "",
            endDate: this.formParams.time[1] ? this.formParams.time[1] : "",
        };
        delete params.time;
        this.queryList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
    //点击组织名称
    onLeavesClick(data, node, el) {
        console.log(data, 111);

        this.formParams["orgName"] = data.label;
        this.formParams["orgCode"] = data.id;
        this.$refs.treeSelect["handleClose"]();
    }
}
</script>

<style scoped lang="scss">
</style>