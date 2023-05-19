<template>
    <div class="template-container" v-loading="loading" element-loading-custom-class="fixLoading" element-loading-text="玩命加载中">
        <div class="tops">
            <el-row :gutter="20">
                <div class="paddings">
                    <el-col :span="2">
                        <div>
                            <img style="width: 100px; height: 100px" src="@/assets/images/company.png" />
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div>
                            <div class="title">{{ baseInfo.bizapply.bizName  || '---'}}</div>
                            <el-row>
                                <el-col :span="12">
                                    <div class="mb20">所属行业：{{baseInfo.bizapply.tradeName || '---'}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="mb20">业务人员：{{baseInfo.bizapply.businessUserName || '---'}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div>业务部门：{{baseInfo.bizapply.businessOrgName || '---'}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div>企业角色：{{baseInfo.bizapply.bizRoles}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <el-button type="primary" class="br-btn-large">查看企业基础信息</el-button>
                        </div>
                    </el-col>
                </div>
            </el-row>
        </div>

        <div class="setps">
            <el-tabs v-model="activeName">
                <el-tab-pane label="企业基础信息" name="first">
                    <el-tabs v-model="activeInner" type="border-card">
                        <el-tab-pane name="first">
                            <span slot="label"><i class="el-icon-user"></i> 基本信息</span>
                            <BaseInfo :baseInfo="baseInfo" :isCreate="isCreate"></BaseInfo>
                            <div class="sub-gap"></div>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <span slot="label"><i class="el-icon-position"></i> 经营信息</span>
                            <BusinessInfo :businessData="businessData" @getBusinessInfo="getPageData"></BusinessInfo>
                            <div class="sub-gap"></div>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                            <span slot="label"><i class="el-icon-bell"></i> 经营不良</span>
                            <BusinessBad :data="businessBad"></BusinessBad>
                            <div class="sub-gap"></div>
                        </el-tab-pane>
                        <el-tab-pane name="fourth">
                            <span slot="label"><i class="el-icon-suitcase"></i> 司法信息</span>
                            <JudicialInfo :data="judicialData" @getJudicialInfo="getPageData"></JudicialInfo>
                            <div class="sub-gap"></div>
                        </el-tab-pane>
                        <el-tab-pane name="five">
                            <span slot="label"><i class="el-icon-suitcase-1"></i> 法代信息</span>
                            <NormalBand :data="normalData"></NormalBand>
                            <div class="sub-gap"></div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="资信调查信息" name="second">
                    <el-tabs v-model="creditActiveName" type="border-card">
                        <el-tab-pane :label="item.tableCname" :name="String(index)" v-for="(item,index) in creditSurveyInfo" :key="index">
                            <el-table stripe :data="item.surveyInfoList" class="br-table" border style="width: 100%">
                                <el-table-column label="指标名称" prop="columCname">
                                    <template slot-scope="{row}">
                                        {{row.columCname}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="录入信息" prop="columValue" show-overflow-tooltip>
                                    <template slot-scope="{row}">
                                        {{row.columValue}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="说明" prop="remark" show-overflow-tooltip>
                                    <template slot-scope="{row}">
                                        {{row.remark}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="企业资信报告" name="third">
                    <Report :data="reportData" :reportLoading="reportLoading"></Report>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="sub-gap"></div>
        <div class="template-content">
            <!-- 操作记录 -->
            <LogTable :list="recordList"></LogTable>
            <!-- 审批流程 -->
            <approve-form ref="approveForm" @onSubmit="onSubmit"></approve-form>
            <div class="template-bottom-button">
                <el-button size="small" @click="onClose">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const enterpriseCreditManage = namespace("enterpriseCreditManage");
import BaseInfo from "@/views/businessInfoManage/enterpriseInfoSearch/tabs/BaseInfo.vue";
import BusinessInfo from "@/views/businessInfoManage/enterpriseInfoSearch/tabs/BusinessInfo.vue";
import BusinessBad from "@/views/businessInfoManage/enterpriseInfoSearch/tabs/BusinessBad.vue";
import JudicialInfo from "@/views/businessInfoManage/enterpriseInfoSearch/tabs/JudicialInfo.vue";
import NormalBand from "@/views/businessInfoManage/enterpriseInfoSearch/tabs/NormalBand.vue";
import Report from "@/views/businessInfoManage/enterpriseInfoManage/survey/Report.vue";
import ApproveForm from "@/views/components/Approve-form.vue";
import LogTable from "@/views/components/LogTable.vue";

@Component({
    components: {
        BaseInfo,
        BusinessInfo,
        BusinessBad,
        JudicialInfo,
        NormalBand,
        Report,
        ApproveForm,
        LogTable,
    },
})
export default class creditInvestigation extends Vue {
    @enterpriseCreditManage.Action getDetailFN; // 获取详情
    @enterpriseCreditManage.Action queryRecordList; //操作记录
    @enterpriseCreditManage.State recordList; //操作记录
    @enterpriseCreditManage.Action queryConsign; //委托
    @enterpriseCreditManage.Action queryEndorsement; //加签
    @enterpriseCreditManage.Action queryPass; //通过
    @enterpriseCreditManage.Action queryRollback; //退回
    @enterpriseCreditManage.Action queryReject; //拒绝

    public activeName = "first"; // 步骤条

    public loading: boolean = false;
    /* 企业基础信息 start */
    public activeInner = "first";
    public isCreate: string = "1";
    public baseInfo: any = {
        bizBaseInfo: {
            bizName: "",
        },
        bizapply: {},
        empLoyees: [],
    };
    public businessData: any = {
        assetsData: [],
        providAassurance: [],
        partners: [],
        partnerInvest: { list: [] },
        pledge: [],
        bizInvest: { list: [] },
        chattelMortgage: [],
    };
    public businessBad: any = {};
    public judicialData: any = {
        judgmentdoc: { list: [] },
        executor: { list: [] },
        uncreditexecutor: { list: [] },
        openannounce: { list: [] },
    };
    public normalData: any = {};
    /* 企业基础信息 end */

    /* 资信调查信息 start */
    public creditActiveName = "0";
    public creditSurveyInfo: any = [];
    /* 资信调查信息 end */

    /* 企业资信报告 start */
    public reportData: any = {};
    public reportLoading: boolean = false;
    /* 企业资信报告 end */

    mounted() {
        this.getAllData();
        // 获取日志
        this.queryRecordList({
            business: this.$route.query.surveyId,
        });
    }
    // 获取所有数据
    getAllData() {
        this.loading = true;
        this.getDetailFN({
            surveyId: this.$route.query.surveyId,
            custId: this.$route.query.custId,
        })
            .then((res) => {
                // 基本信息
                this.$set(this, "baseInfo", res.hisEnterBaseInfo.basicInfo);
                // 经营信息
                this.$set(
                    this,
                    "businessData",
                    res.hisEnterBaseInfo.managementInfo
                );
                // 经营不良
                this.$set(
                    this,
                    "businessBad",
                    res.hisEnterBaseInfo.managementBad
                );
                // 司法信息
                this.$set(
                    this,
                    "judicialData",
                    res.hisEnterBaseInfo.judicialInfo
                );
                // 法代信息
                this.$set(
                    this,
                    "normalData",
                    res.hisEnterBaseInfo.methodOfGneraInfo
                );
                // 资信调查信息
                this.creditSurveyInfo = res.creditSurveyInfo;
                this.reportData = res.creditReport;
            })
            .finally(() => (this.loading = false));
    }
    // 获取分页数据
    getPageData(data) {
        let params = {
            surveyId: this.$route.query.surveyId,
            custId: this.$route.query.custId,
            ...data,
        };
        this.getDetailFN(params)
            .then((res) => {
                // 经营信息
                let business = ["bizInvest", "partnerInvest"];
                if (business.includes(data.queryCertain)) {
                    for (let key in res) {
                        this.$set(this.businessData, key, res[key]);
                    }
                }
                // 司法信息
                let judicial = [
                    "executor",
                    "uncreditexecutor",
                    "judgmentdoc",
                    "openannounce",
                ];
                if (judicial.includes(data.queryCertain)) {
                    for (let key in res) {
                        this.$set(this.judicialData, key, res[key]);
                    }
                }
            })
            .finally(() => (this.loading = false));
    }
    // 回到列表
    onClose() {
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: "/enterpriseCreditManage",
        });
    }
    onSubmit(params, handleType) {
        let apis = {
            approve_consign: this.queryConsign,
            approve_endorsement: this.queryEndorsement,
            approve_pass: this.queryPass,
            approve_back: this.queryRollback,
            approve_refuse: this.queryReject,
        };

        const formAPI = apis[handleType];
        let $approve: any = this.$refs["approveForm"];
        $approve.btnLoading = true;
        formAPI(params)
            .then((msg) => {
                this.$message({
                    type: "success",
                    message: msg,
                });
                this.onClose();
            })
            .finally(() => ($approve.btnLoading = false));
    }
}
</script>

<style scoped lang="scss">
.mb20 {
    margin-bottom: 20px;
}
.tops {
    background: #fff;
    .paddings {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .title {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 20px;
        }
    }
}
.setps {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
}
.template-container .fixed {
    position: fixed !important;
    bottom: 0 !important;
    left: 295px !important;
    z-index: 1;
    width: calc(100% - 388px) !important;
}
/deep/ .fixLoading {
    .el-loading-spinner {
        left: 100px !important;
        top: 500px !important;
        margin-top: -21px;
        width: 100%;
        text-align: center;
        position: fixed !important;
    }
}
</style>
