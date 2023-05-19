<template>
    <renderBtn code="enterprise_info_manage_sel">
        <search-wrapper>
            <template #default>
                <el-form :inline="true" :model="formParams" label-width="120px" ref="searchForm" size="small" @submit.native.prevent>
                    <hidden-form>
                        <template slot="text">折叠筛选条件</template>
                        <el-form-item class="br-form-item-label" label="企业名称" prop="bizName">
                            <el-input class="br-input" placeholder="请输入企业名称" v-model.trim="formParams.bizName" />
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="统一社会信用代码" prop="creditCode">
                            <el-input class="br-input" placeholder="请输入统一社会信用代码" v-model.trim="formParams.creditCode" />
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="企业角色" prop="bizRoles">
                            <el-select v-model="formParams.bizRoles" placeholder="请选择企业角色" class="br-select" filterable>
                                <el-option v-for="(item,index) in $select('bizRoles')" :key="index" :label="item.text" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <template slot="hidden">
                            <el-form-item class="br-form-item-label" label="组织机构" prop="businessOrgPname">
                                <el-select v-model="formParams.businessOrgPname" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect1" placeholder="请选择组织机构">
                                    <el-option value="null">
                                        <el-tree :data="orgNameList" @node-click="onLeavesClick1" node-key="id" :props="defaultProps">
                                        </el-tree>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="所属行业" prop="tradeKeyNo">
                                <el-select v-model="formParams.tradeKeyNo" placeholder="请选择所属行业" class="br-select">
                                    <el-option v-for="item in tradeList" :key="item.keyNo" :label="item.tradeName" :value="item.keyNo">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="业务部门" prop="businessOrgName">
                                <el-select v-model="formParams.businessOrgName" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect2" placeholder="请选择业务部门">
                                    <el-option value="null">
                                        <el-tree :data="orgList" @node-click="onLeavesClick2" node-key="id" :props="defaultProps"></el-tree>
                                    </el-option>
                                </el-select>

                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="业务人员" prop="businessUserName">
                                <el-input class="br-input" placeholder="请输入业务人员" v-model.trim="formParams.businessUserName" />
                            </el-form-item>
                        </template>
                    </hidden-form>
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
import { SearchWrapper, HiddenForm } from "@/components/";
import { namespace } from "vuex-class";
const configManage = namespace("configManage");
const enterInfoManage = namespace("enterpriseInfoManage");

@Component({
    components: {
        "search-wrapper": SearchWrapper,
        "hidden-form": HiddenForm,
    },
})
export default class Search extends Vue {
    @configManage.Action queryOrgNameList; //组织机构
    @configManage.State orgNameList;
    @enterInfoManage.Action searchFN;
    @enterInfoManage.State saveSearch;
    @enterInfoManage.Action orgListFN; // 根据组织机构查询业务部门
    @enterInfoManage.State orgList; // 业务部门
    @enterInfoManage.Mutation saveOrgList; // 业务部门
    @enterInfoManage.State tradeList; // 所属行业

    public formParams: any = {
        bizName: "", // 企业名称
        creditCode: "", // 统一社会信用代码
        bizRoles: "", // 企业角色
        businessOrgPname: "", // 组织机构
        businessOrgPcode: "", // 组织机构
        tradeKeyNo: "", // 所属行业
        businessOrgName: "", // 业务部门
        businessOrgCode: "", // 业务部门
        businessUserName: "", // 业务人员
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
        this.$refs.treeSelect2["handleClose"]();
    }

    search(): void {
        let param = {
            ...this.saveSearch,
            ...this.formParams,
        };
        delete param.businessOrgPname;
        delete param.businessOrgName;
        this.searchFN(param);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
        this.formParams.businessOrgPcode = "";
        this.formParams.businessOrgCode = "";
        this.saveOrgList([]);
    }
}
</script>

<style scoped lang="scss">
</style>
