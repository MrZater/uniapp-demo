<template>
    <renderBtn code="enterprise_credits_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="90px" ref="searchForm" size="small">
                    <hidden-form>
                        <template slot="text">折叠筛选条件</template>
                        <el-form-item class="br-form-item-label" label="企业名称" prop="bizName">
                            <el-input class="br-input" placeholder="请输入企业名称" v-model.trim="formParams.bizName"></el-input>
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="业务部门" prop="businessOrgName">
                            <el-select v-model="formParams.businessOrgName" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect2" placeholder="请选择业务部门">
                                <el-option value="null">
                                    <el-tree :data="orgList" @node-click="onLeavesClick2" node-key="id" :props="defaultProps">
                                    </el-tree>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="状态" prop="apprState">
                            <el-select v-model.trim="formParams.apprState" placeholder="请选择状态" class="br-select">
                                <el-option v-for="(item,index) of $select('costStatus')" :key="index" :label="item.text" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <template slot="hidden">
                            <el-form-item class="br-form-item-label" label="组织名称" prop="businessOrgPname">
                                <el-select v-model="formParams.businessOrgPname" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect1" placeholder="请选择组织名称">
                                    <el-option value="null">
                                        <el-tree :data="orgNameList" @node-click="onLeavesClick1" node-key="id" :props="defaultProps">
                                        </el-tree>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="创建时间" prop="createTime">
                                <el-date-picker v-model="formParams.createTime" class="br-datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </hidden-form>
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
import { SearchWrapper, HiddenForm } from "@/components/";
import { namespace } from "vuex-class";

const warnEnterprise = namespace("warnEnterprise");
const enterInfoManage = namespace("enterpriseInfoManage");
const configManage = namespace("configManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
        "hidden-form": HiddenForm,
    },
})
export default class Search extends Vue {
    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList; //组织机构
    @warnEnterprise.Action orgListFN; // 根据组织机构查询业务部门
    @warnEnterprise.State orgList; // 业务部门
    @warnEnterprise.Mutation saveOrgList; // 业务部门
    @warnEnterprise.Action queryList;
    @warnEnterprise.Action saveSearchDataFN;
    @warnEnterprise.State searchData;

    public formParams: any = {
        bizName: "",
        businessOrgPname: "",
        businessOrgPcode: "",
        businessOrgName: "",
        businessOrgCode: "",
        apprState: "",
        createTime: [],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    created() {
        this.queryOrgNameList({ flag: "4" });
        this.search();
    }

    onLeavesClick1(data, node, el) {
        this.formParams.businessOrgPname = data.label;
        this.formParams.businessOrgPcode = data.id;
        this.formParams.businessOrgName = "";
        this.formParams.businessOrgCode = "";
        /* 获取业务部门列表 */
        this.orgListFN({ orgCode: data.id, flag: "6" });
        this.$refs.treeSelect1["handleClose"]();
    }

    onLeavesClick2(data, node, el) {
        this.formParams.businessOrgName = data.label;
        this.formParams.businessOrgCode = data.id;
        /* 获取业务部门列表 */
        this.$refs.treeSelect2["handleClose"]();
    }

    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
            beginDate: this.formParams.createTime[0]
                ? this.formParams.createTime[0]
                : "",
            endDate: this.formParams.createTime[1]
                ? this.formParams.createTime[1]
                : "",
        };
        delete params.createTime;
        delete params.businessOrgPname;
        delete params.businessOrgName;
        this.queryList(params);
        this.saveSearchDataFN(params);
    }

    resetForm(): void {
        this.formParams.businessOrgPcode = "";
        this.formParams.businessOrgCode = "";
        this.$refs.searchForm["resetFields"]();
        this.saveOrgList([]);
    }
}
</script>

<style scoped lang="scss">
</style>