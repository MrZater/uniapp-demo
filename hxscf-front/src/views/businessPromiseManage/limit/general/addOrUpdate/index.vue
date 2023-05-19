<template>
    <div class="template-container">
        <ContentWrapper>
            <template #title>基础信息</template>
            <template #extra-btn>
                <el-button type="primary" size="small">查看资信报告</el-button>
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
                            <span>业务人员</span>：<span class="base-content">{{ baseInfo.businessUser }}</span>
                        </el-col>
                        <el-col :span="8" class="base-item">
                            <span>企业角色</span>：<span class="base-content">{{ translateRoles(baseInfo.bizRoles) }}</span>
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
        <ContentWrapper v-loading="loading">
            <template #title>额度种类</template>
            <template #grid>
                <div class="sub-gap"></div>
                <el-radio-group v-model="quotaType" @change="onQuotaTypeChange">
                    <el-radio v-for="(item,index) in $select('quotaType')" :key="index" :label="item.value">{{item.text}}</el-radio>
                </el-radio-group>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <el-tabs v-model="activeName" @tab-click="onTabClick">
                    <el-tab-pane label="授信方式" name="1">
                        <CreditWay ref="creditWay" :propCreditTypes="baseInfo.creditTypes" :propData="creditData"></CreditWay>
                    </el-tab-pane>
                    <el-tab-pane label="额度申请" name="2">
                        <LimitApplication ref="limitApplication" :propCreditTypes="baseInfo.creditTypes" :propData="limitData" :total="total"></LimitApplication>
                    </el-tab-pane>
                    <el-tab-pane label="关联企业" name="3" v-if="quotaType =='02'">
                        <AssociatedBusiness ref="associatedBusiness" :propData="assData"></AssociatedBusiness>
                    </el-tab-pane>
                    <el-tab-pane label="业务开展组织" name="4">
                        <BusinessDevelopOrg ref="businessDevelopOrg" :propData="orgData"></BusinessDevelopOrg>
                    </el-tab-pane>
                    <el-tab-pane label="授信企业情况说明" name="5">
                        <CreditBusinessDesc ref="creditBusinessDesc" :propData="descData"></CreditBusinessDesc>
                    </el-tab-pane>
                    <el-tab-pane label="附件" name="6">
                        <Upload ref="upload" :propData="fileData"></Upload>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </ContentWrapper>
        <br>
        <ContentWrapper>
            <template #bottom-btn>
                <div>
                    <el-button class="br-btn" @click="onSubmit('01')" :disabled="loading">保 存</el-button>
                    <el-button class="br-btn" type="primary" @click="onSubmit('02')">提交审核</el-button>
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
import CreditBusinessDesc from "./tabs/creditBusinessDesc.vue"; //业务开展组织
import Upload from "./tabs/Upload.vue";

@Component({
    components: {
        ContentWrapper,
        CreditWay,
        LimitApplication,
        AssociatedBusiness,
        BusinessDevelopOrg,
        CreditBusinessDesc,
        Upload,
    },
})
export default class Application extends Vue {
    @general.Action queryDetail;
    @general.Action queryBaseInfo;
    @general.State baseInfo;
    @general.Action addAndUpdateCreditInfo;
    @general.Mutation saveBaseInfo;

    public loading: boolean = false;
    // 当前激活的tab
    public activeName = "1";

    // 选择是那种企业，单一企业还是关联企业
    public quotaType = "01";

    public total: number = 0;

    // 传递给子组件的数据 start

    public creditData: any = {};
    public limitData: any = {};
    public orgData: any = [];
    public descData: any = {};
    public fileData: any = [];
    public assData: any = [];
    // 传递给子组件的数据 end

    created() {
        let { custId, creditId } = this.$route.query;
        if (custId) {
            /* 新增 */
            this.queryBaseInfo({ custId: custId });
        } else {
            /* 编辑 */
            this.loading = true;
            this.queryDetail({ creditId: this.$route.query.creditId })
                .then((res) => {
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
                    /* 文件回显处理 */
                    let arr = [
                        loanCreditSxguaranteebizs,
                        loanCreditSxguarantors,
                        loanCreditSxmortgageinfos,
                        loanCreditSxpledges,
                        loanCreditSxotherstypes,
                    ];

                    arr &&
                        arr.forEach((target) => {
                            target &&
                                target.forEach((item) => {
                                    item.mortgagee = item.mortgagees;
                                    item.deleteUrls = [];
                                    let fileArr: any = [];
                                    item.loanSysArchInfos.forEach((file) => {
                                        fileArr.push({
                                            isFromServer: true,
                                            name: file.fileName,
                                            url: file.url,
                                        });
                                    });
                                    item.files = fileArr;
                                });
                        });
                    /* 设置基础信息 */
                    this.saveBaseInfo(res.loanCreditSxapplyinfo);
                    /* 设置额度种类 */
                    this.quotaType = res.loanCreditSxapplyinfo.quotaType;
                    /* 设置授信方式 */

                    this.$set(this, "creditData", creditData);
                    this.$set(this, "limitData", res.loanCreditSxquotaapply);
                    this.$set(this, "orgData", res.loanCreditSxbussinessorgs);
                    this.$set(this, "descData", res.loanCreditSxcasestate);
                    /* 附件 */
                    res.loanSysArchInfos.forEach((item) => {
                        item.name = item.fileName;
                        item.isFromServer = true;
                    });
                    this.$set(this, "fileData", res.loanSysArchInfos);

                    /* 如果额度种类为关联企业，设置 关联企业 */
                    if (this.quotaType === "02") {
                        this.$nextTick(() => {
                            this.$set(
                                this,
                                "assData",
                                res.loanCreditSxrelationbizs
                            );
                        });
                    }
                })
                .finally(() => (this.loading = false));
        }
    }

    // 点击额度申请时，计算 total
    onTabClick(tab, event) {
        if (this.activeName === "2") this.calcTotal();
    }

    // 额度种类改变时
    onQuotaTypeChange() {
        if (this.activeName === "3") this.activeName = "1";
    }

    // 计算 total
    calcTotal() {
        this.total = 0;
        let $el: any = this.$refs["creditWay"];
        let creditType = $el.creditType;
        let {
            loanCreditSxguaranteebizs,
            loanCreditSxguarantors,
            loanCreditSxmortgageinfos,
            loanCreditSxpledges,
            loanCreditSxotherstypes,
        } = $el.formData;
        creditType.forEach((item) => {
            switch (item) {
                case "01":
                    this.total +=
                        Math.min(
                            this.baseInfo.surveyMaxAmt,
                            this.baseInfo.riskMaxAmt
                        ) || 0;
                    break;
                case "02":
                    loanCreditSxguaranteebizs.forEach((item) => {
                        this.total +=
                            Math.min(
                                item.surveyMaxAmt,
                                item.riskMaxAmt,
                                item.guaranteeMoney
                            ) || 0;
                    });
                    loanCreditSxguarantors.forEach((item) => {
                        this.total += item.guaranteeMoney;
                    });
                    break;
                case "03":
                    loanCreditSxmortgageinfos.forEach((item) => {
                        this.total += item.conversionCreditQuota;
                    });
                    break;
                case "04":
                    loanCreditSxpledges.forEach((item) => {
                        this.total += item.conversionCreditQuota;
                    });
                    break;
                case "05":
                    loanCreditSxotherstypes.forEach((item) => {
                        this.total += item.conversionCreditQuota;
                    });
                    break;
            }
        });
    }

    // 翻译企业角色
    translateRoles(row) {
        let cancats: any = [];
        if (row instanceof Array) {
            row.map((item) => {
                cancats.push(this.$code("bizRoles", item));
            });
        }
        return cancats.join("，");
    }

    // 表单校验
    validateForms() {
        let nameArr = Object.keys(this.$refs).filter(
            (item) => item !== "upload"
        );
        if (this.quotaType === "01") {
            nameArr = nameArr.filter((item) => item !== "associatedBusiness");
        }

        let $elForms: any = [];
        nameArr.forEach((name) =>
            $elForms.push({
                form: (this.$refs[name] as any).$refs["forms"],
                name: name,
                isPass: false,
            })
        );
        for (let i = 0; i < $elForms.length; i++) {
            $elForms[i].form.validate((valid) => {
                if (valid) {
                    $elForms[i].isPass = true;
                } else {
                    let target = $elForms.find((item) => item.isPass == false);
                    let nameMap = {
                        creditWay: "1",
                        limitApplication: "2",
                        associatedBusiness: "3",
                        businessDevelopOrg: "4",
                        creditBusinessDesc: "5",
                    };
                    if (this.activeName !== nameMap[target.name]) {
                        this.activeName = nameMap[target.name];
                    }
                    return false;
                }
            });
        }
        // 6、所有表单都通过校验后，发起 ajax 请求
        return $elForms.map((item) => item.isPass).every((sub) => sub);
    }

    // 获取参数
    getParams() {
        let params: any = {};
        let ref1: any = this.$refs["creditWay"];
        let params1 = ref1.handleParams();

        /* 1、基础数据 参数 */
        params.LoanCreditSxapplyinfo = {
            ...this.baseInfo,
            creditType: ref1.creditType,
            quotaType: this.quotaType,
            creditSource: this.$route.query.handleType == "change" ? "01" : "",
        };
        /* 2、授信方式 参数 */
        params.loanCreditSxguaranteebizs =
            params1.loanCreditSxguaranteebizs || []; //保证机构 参数
        params.loanCreditSxguarantors = params1.loanCreditSxguarantors || []; //保证人 参数
        params.loanCreditSxmortgageinfos =
            params1.loanCreditSxmortgageinfos || []; //抵押信息 参数
        params.loanCreditSxpledges = params1.loanCreditSxpledges || []; //质押信息 参数
        params.loanCreditSxotherstypes = params1.loanCreditSxotherstypes || []; //其他 参数

        let ref2: any = this.$refs["limitApplication"];
        let params2 = ref2.handleParams();
        /* 3、额度申请 参数 */
        params.loanCreditSxquotaapply = params2;

        let ref3: any = this.$refs["businessDevelopOrg"];
        let params3 = ref3.handleParams();
        /* 4、业务开展组织 参数 */
        params.loanCreditSxbussinessorgs = params3;

        let ref4: any = this.$refs["creditBusinessDesc"];
        let params4 = ref4.handleParams();

        /* 5、授信企业情况说明 参数 */
        params.loanCreditSxcasestate = params4;

        let ref5: any = this.$refs["upload"];
        let params5 = ref5.handleParams();

        /* 6、附件 参数 */

        params.files = params5.fileList;
        params.deleteUrls = params5.deleteUrls;

        /* 关联企业 参数 */
        if (this.quotaType === "02") {
            let ref6: any = this.$refs["associatedBusiness"];
            params.loanCreditSxrelationbizs = ref6.handleParams();
        }

        return this.jsonToFormData(params);
    }

    // 将 json 转换为 formData 格式
    jsonToFormData(params) {
        let formData = new FormData();
        for (let key in params) {
            if (Array.isArray(params[key])) {
                // 附件-外层
                if (key === "files") {
                    params[key]
                        .filter((item) => !item.isFromServer)
                        .forEach((file) => {
                            formData.append(`${key}`, file.raw, file.name);
                        });
                    params[key]
                        .filter((item) => item.isFromServer)
                        .forEach((obj, i) => {
                            for (let k in obj) {
                                formData.append(
                                    `loanSysArchInfos[${i}].${k}`,
                                    obj[k]
                                );
                            }
                        });
                } else if (key === "deleteUrls") {
                    params[key].forEach((url, index) => {
                        formData.append(`${key}[${index}]`, url);
                    });
                } else {
                    params[key].forEach((item, index) => {
                        for (let sub in item) {
                            if (sub === "files") {
                                if (item[sub].length) {
                                    item[sub].forEach((ele) => {
                                        if (!ele.isFromServer) {
                                            // 只上传本地新上传文件，从服务器读取的不需要操作
                                            formData.append(
                                                `${key}[${index}].${sub}`,
                                                ele.raw,
                                                ele.name
                                            );
                                        }
                                    });
                                }
                            } else if (sub === "deleteUrls") {
                                item[sub].forEach((url, uIndex) => {
                                    formData.append(
                                        `${key}[${index}].${sub}[${uIndex}]`,
                                        url
                                    );
                                });
                            } else if (sub === "loanSysArchInfos") {
                                item[sub].forEach((iItem, iIndex) => {
                                    for (let iKey in iItem) {
                                        formData.append(
                                            `${key}[${index}].${sub}[${iIndex}].${iKey}`,
                                            iItem[iKey]
                                        );
                                    }
                                });
                            } else {
                                formData.append(
                                    `${key}[${index}].${sub}`,
                                    item[sub]
                                );
                            }
                        }
                    });
                }
            } else {
                for (let sub in params[key]) {
                    formData.append(`${key}.${sub}`, params[key][sub]);
                }
            }
        }
        return formData;
    }

    // 保存
    onSubmit(handleType) {
        if (this.validateForms()) {
            this.calcTotal();
            /* 待 dom 更新完成后，获取参数 */
            this.$nextTick(() => {
                let params = this.getParams();
                this.loading = true;
                this.addAndUpdateCreditInfo(params)
                    .then((res) => {
                        this.$message({ type: "success", message: res });
                        this.$bus.$emit("jumpToTag", {
                            path: this.$route.path,
                            tag: "/businessPromiseManage/limit/general",
                        });
                    })
                    .finally(() => (this.loading = false));
            });
        }
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
