<!--
 * @Author: mingliang.zhu
 * @Date: 2021-03-03 15:50:50 
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-03-03 15:50:50 
 * @Description: 异常事件管理
-->

<template>
    <!-- <renderBtn code="post_manage_sel"> -->
    <search-wrapper>
        <template slot="default">
            <el-form :inline="true" :model="queryForm" label-width="85px" ref="searchForm" size="small" @submit.native.prevent>
                <hidden-form>
                    <template slot="text">折叠筛选条件</template>
                </hidden-form>
                <template slot="hidden"></template>
                <el-form-item class="br-form-item-label" label="组织名称" prop="orgName">
                    <el-select v-model="queryForm.orgName" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect" placeholder="请选择组织名称">
                        <el-option value="null">
                            <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="异常事件主题" prop="abnormalTheme">
                    <el-input class="br-input" placeholder="请输入异常事件主题" v-model.trim="queryForm.abnormalTheme"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="企业名称" prop="companyName">
                    <el-input class="br-input" placeholder="请输入企业名称" v-model.trim="queryForm.companyName"></el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="异常类型" prop="abnormalType">
                    <el-select v-model="queryForm.abnormalType" placeholder="请选择异常类型" filterable class="br-select">
                        <el-option v-for="(item,index) in eventTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="状态" prop="abnormalStatus">
                    <el-select v-model="queryForm.abnormalStatus" placeholder="请选择状态" filterable collapse-tags class="br-select">
                        <el-option v-for="(item,index) in $select('abnormalStatus')" :key="index" :value="item.value" :label="item.text"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="创建时间" prop="timeRange">
                    <el-date-picker class="br-datepicker" v-model="queryForm.timeRange" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </template>
        <template #btn>
            <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
        </template>
    </search-wrapper>
    <!-- </renderBtn> -->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SearchWrapper, HiddenForm } from "@/components/";
import { namespace } from "vuex-class";
const configManage = namespace("configManage");
const abnormalEvent = namespace("abnormalEvent");

@Component({
    components: {
        "search-wrapper": SearchWrapper,
        "hidden-form": HiddenForm,
    },
})
export default class Search extends Vue {
    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList; //组织机构
    @abnormalEvent.Action queryEventList;
    @abnormalEvent.Action saveSearchDataFN;
    @abnormalEvent.State saveSearch;
    @abnormalEvent.State searchData;
    @abnormalEvent.Action queryDataByDicCode;
    @abnormalEvent.State eventTypeOption; //异常类型

    public queryForm: any = {
        orgName: "",
        orgCode: "",
        abnormalTheme: "",
        companyName: "",
        abnormalType: "",
        abnormalStatus: "",
        timeRange: [],
    };

    defaultProps = {
        children: "children",
        label: "label",
    };

    created() {
        this.queryOrgNameList({ flag: "4" });
        // 通知类型
        this.queryDataByDicCode({ dicCode: "abnormalEventType" });
        this.search();
    }

    search(): void {
        let val = this.queryForm.timeRange;
        this.queryForm.beginDate = val[0] != null ? val[0] : "";
        this.queryForm.endDate = val[1] != null ? val[1] : "";
        let params = {
            ...this.saveSearch,
            ...this.queryForm,
        };
        delete params.timeRange;
        this.queryEventList(params);
        this.saveSearchDataFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
    onLeavesClick(data, node, el) {
        this.queryForm.orgName = data.label;
        this.queryForm.orgCode = data.id;
        this.$refs.treeSelect["handleClose"]();
    }
}
</script>

<style scoped lang="scss">
</style>