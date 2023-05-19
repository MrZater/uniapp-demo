<template>
    <renderBtn code="ybsx_credit_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="90px" ref="searchForm" size="small">
                    <hidden-form>
                        <template slot="text">折叠筛选条件</template>
                        <el-form-item class="br-form-item-label" label="企业名称" prop="bizName">
                            <el-input class="br-input" placeholder="请输入企业名称" v-model.trim="formParams.bizName"></el-input>
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="业务部门" prop="busOrgName">
                            <el-input class="br-input" placeholder="请输入业务部门" v-model.trim="formParams.busOrgName"></el-input>
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="业务类型" prop="businessType">
                            <el-select v-model="formParams.businessType" placeholder="请选择业务类型" filterable class="br-select">
                                <el-option v-for="(item,index) in businessOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="br-form-item-label" label="授信方式" prop="creditType">
                            <el-select v-model="formParams.creditType" placeholder="请选择授信方式" filterable class="br-select">
                                <el-option v-for="(item,index) in creditTypeOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                            </el-select>
                        </el-form-item>
                        <template slot="hidden">
                            <el-form-item class="br-form-item-label" label="额度种类" prop="quotaType">
                                <el-select v-model="formParams.quotaType" placeholder="请选择额度种类" filterable class="br-select">
                                    <el-option v-for="(item,index) in $select('quotaType')" :key="index" :label="item.text" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="状态" prop="apprState">
                                <el-select v-model.trim="formParams.apprState" placeholder="请选择状态" class="br-select">
                                    <el-option v-for="(item,index) of $select('templateStatus')" :key="index" :label="item.text" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="创建时间" prop="createTime">
                                <el-date-picker v-model="formParams.createTime" class="br-datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="通过时间" prop="passTime">
                                <el-date-picker v-model="formParams.passTime" class="br-datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="授信到期日" prop="endTime">
                                <el-date-picker v-model="formParams.endTime" class="br-datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="br-form-item-label" label="组织名称" prop="orgPname">
                                <el-select v-model="formParams.orgPname" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect" placeholder="请选择组织名称">
                                    <el-option value="null">
                                        <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps">
                                        </el-tree>
                                    </el-option>
                                </el-select>
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
const general = namespace("general");
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
    @general.Action queryList;
    @general.Action saveSearchDataFN;
    @general.State searchData;
    @general.Action queryDataByDicCode;
    @general.State businessOption;
    @general.State creditTypeOption;

    public formParams: any = {
        bizName: "",
        busOrgName: "",
        businessType: "",
        creditType: "",
        quotaType: "",
        orgPname: "",
        orgPcode: "",
        apprState: "",
        createTime: [],
        passTime: [],
        endTime: [],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    created() {
        // 组织机构
        this.queryOrgNameList({ flag: "4" });
        // 业务类型
        this.queryDataByDicCode({ dicCode: "businessType" });
        // 授信方式
        this.queryDataByDicCode({ dicCode: "creditType" });
        this.search();
    }

    onLeavesClick(data, node, el) {
        this.formParams.orgPname = data.label;
        this.formParams.orgPcode = data.id;
        this.$refs.treeSelect["handleClose"]();
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
            passBeginDate: this.formParams.passTime[0]
                ? this.formParams.passTime[0]
                : "",
            passEndDate: this.formParams.passTime[1]
                ? this.formParams.passTime[1]
                : "",
            expireBeginDate: this.formParams.endTime[0]
                ? this.formParams.endTime[0]
                : "",
            expireEndDate: this.formParams.endTime[1]
                ? this.formParams.endTime[1]
                : "",
        };
        delete params.createTime;
        delete params.passTime;
        delete params.endTime;
        delete params.orgPname;
        this.queryList(params);
        this.saveSearchDataFN(params);
    }

    resetForm(): void {
        this.formParams.orgPname = "";
        this.formParams.orgPcode = "";
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>