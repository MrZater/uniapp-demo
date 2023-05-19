<template>
    <div class="template-container" v-loading="loading">
        <ContentWrapper>
            <template #title>基础信息</template>
            <template #extra-btn>
                <el-button type="info" class="br-btn-large">预览审批表</el-button>
                <el-button type="warning" class="br-btn-large">下载审批表</el-button>
                <el-button type="primary" class="br-btn-large">查看资信报告</el-button>
            </template>
            <template #grid>
                <div>
                    <el-row :gutter="20">
                        <el-col :span="8" class="base-item">
                            <span>企业名称</span>：<span class="base-content">{{ baseInfo.bizName }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>组织名称</span>：<span class="base-content">{{ baseInfo.orgName }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>所属行业</span>：<span class="base-content">{{ baseInfo.tradeName }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>业务部门</span>：<span class="base-content">{{ baseInfo.busOrgName }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>业务人员</span>：<span class="base-content">{{ baseInfo.busUserName }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>企业角色</span>：<span class="base-content">{{ translateRoles(baseInfo.bizRole) }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>信用评分</span>：<span class="base-content">{{ baseInfo.riskScore }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>信用等级</span>：<span class="base-content">{{ baseInfo.riskLevel }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>建议信用额度上限</span>：<span class="base-content">{{ baseInfo.surveyMaxAmt | money }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>限额乘数</span>：<span class="base-content">{{ baseInfo.limitMultiplier	 }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>风险系数</span>：<span class="base-content">{{ baseInfo.riskRatio }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>信用风险限额</span>：<span class="base-content">{{ baseInfo.riskMaxAmt | money}}</span>
                        </el-col>
                    </el-row>
                </div>
            </template>
        </ContentWrapper>
        <br>
        <ContentWrapper>
            <template #title>额度种类</template>
            <template #grid>
                <div class="sub-gap"></div>
                <el-radio-group v-model="baseInfo.quotaType">
                    <el-radio disabled v-for="(item,index) in $select('quotaType')" :key="index" :label="item.value">{{item.text}}</el-radio>
                </el-radio-group>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="授信方式" name="1">
                        <CreditWay :creditType="baseInfo.creditTypes" :data="creditData"></CreditWay>
                    </el-tab-pane>
                    <el-tab-pane label="额度申请" name="2">
                        <LimitApplication :creditType="baseInfo.creditTypes" :data="limitData"></LimitApplication>
                    </el-tab-pane>
                    <el-tab-pane label="关联企业" name="3" v-if="baseInfo.quotaType =='02'">
                        <AssociatedBusiness :data="associatedData"></AssociatedBusiness>
                    </el-tab-pane>
                    <el-tab-pane label="业务开展组织" name="4">
                        <BusinessDevelopOrg :data="orgData"></BusinessDevelopOrg>
                    </el-tab-pane>
                    <el-tab-pane label="授信企业情况说明" name="5">
                        <CreditBusinessDesc :data="descData"></CreditBusinessDesc>
                    </el-tab-pane>
                    <el-tab-pane label="上一年度授信业务情况" name="6" v-if="$route.query.handleType === 'year'">
                        <LastYearCreditBusiness ref="lastYear"></LastYearCreditBusiness>
                    </el-tab-pane>
                    <el-tab-pane label="附件" name="7">
                        <Upload ref="upload" :fileList="fileData"></Upload>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </ContentWrapper>
        <br>
        <ContentWrapper>
            <template #bottom-btn>
                <div v-if="$route.query.handleType === 'detail'">
                    <el-button class="br-btn" @click="goRouter" :disabled="loading">关 闭</el-button>
                </div>
                <div v-else>
                    <el-button class="br-btn" @click="onSubmit" :disabled="loading">保 存</el-button>
                    <el-button class="br-btn" type="primary" @click="onSubmit">提交审核</el-button>
                </div>
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
import { ContentWrapper } from "@/components";
import CreditWay from "./tabs/creditWay.vue"; //授信方式
import LimitApplication from "./tabs/limitApplication.vue"; //额度申请
import AssociatedBusiness from "./tabs/associatedBusiness.vue"; //关联企业
import BusinessDevelopOrg from "./tabs/businessDevelopOrg.vue"; //业务开展组织
import CreditBusinessDesc from "./tabs/creditBusinessDesc.vue"; //授信情况说明
import LastYearCreditBusiness from "./tabs/lastYearCreditBusiness.vue"; //上一年度授信业务情况
import Upload from "./tabs/Upload.vue";

@Component({
    name: "generalDetail",
    components: {
        ContentWrapper,
        CreditWay,
        LimitApplication,
        AssociatedBusiness,
        BusinessDevelopOrg,
        CreditBusinessDesc,
        LastYearCreditBusiness,
        Upload,
    },
})
export default class Application extends Vue {
    @general.Action queryDetail;
    @general.Action queryYearAudit;
    public loading: boolean = false;
    public activeName = "1";
    public baseInfo: any = {};
    public creditData: any = {};
    public limitData: any = {};
    public associatedData: any = [];
    public orgData: any = [];
    public descData: any = {};
    public fileData: any = [];

    public cacheResponse: any = {};

    mounted() {
        this.initData();
    }

    initData() {
        this.loading = true;
        this.queryDetail({ creditId: this.$route.query.creditId })
            .then((res) => {
                this.cacheResponse = res;
                let {
                    loanCreditSxguaranteebizs,
                    loanCreditSxguarantors,
                    loanCreditSxmortgageinfos,
                    loanCreditSxpledges,
                    loanCreditSxotherstypes,
                } = res;
                let creditData = {
                    loanCreditSxguaranteebizs,
                    loanCreditSxguarantors,
                    loanCreditSxmortgageinfos,
                    loanCreditSxpledges,
                    loanCreditSxotherstypes,
                };
                this.$set(this, "baseInfo", res.loanCreditSxapplyinfo);
                this.$set(this, "creditData", creditData);
                this.$set(this, "limitData", res.loanCreditSxquotaapply);
                this.$set(this, "associatedData", res.loanCreditSxrelationbizs);
                this.$set(this, "orgData", res.loanCreditSxbussinessorgs);
                this.$set(this, "descData", res.loanCreditSxcasestate);
                this.$set(this, "fileData", res.loanSysArchInfos);
            })
            .finally(() => (this.loading = false));
    }

    translateRoles(row) {
        let cancats: any = [];
        if (row instanceof Array) {
            row.map((item) => {
                cancats.push(this.$code("bizRoles", item));
            });
        }
        return cancats.join("，");
    }

    onSubmit() {
        let $el: any = this.$refs["lastYear"];
        let form = $el.$refs["forms"];
        form.validate((valid) => {
            if (valid) {
                let params = {
                    ...this.cacheResponse,
                    loanCreditSxearlycooperation: $el.formData.list[0],
                };
                this.loading = true;
                this.queryYearAudit(params)
                    .then((res) => {
                        this.$message({ type: "success", message: res });
                        this.goRouter();
                    })
                    .finally(() => (this.loading = false));
            } else {
                this.activeName = "6";
                return false;
            }
        });
    }
    goRouter() {
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: "/businessPromiseManage/limit/general",
        });
    }
}
</script>

<style scoped lang="scss">
.base-item {
    color: #666;
    font-size: 14px;
    margin-top: 20px;
    display: inline-block;
}
.base-content {
    color: #333;
}
</style>
