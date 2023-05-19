
<template>
    <div class="template-container" v-loading="detailLoading" element-loading-custom-class="fixLoading" element-loading-text="玩命加载中">
        <div class="template-content">
            <div class="base_info">
                <div class="base_top_info">
                    <div class="avator">
                        <img src="@/assets/images/company.png" alt="图片加载失败，请刷新重试">
                    </div>
                    <div class="base_top_info_content">
                        <p>{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.bizName) || "---" }}</p>
                        <div class="detail_content" v-if="isCreate == 0">
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">法定代表人</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.operName || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">成立时间</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.startDate || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">注册资本</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.registCapi || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">地址</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.registAddress || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <el-button type="primary" size="mini" class="br-btn-large" @click="onCreate(baseInfo.bizBaseInfo)">创建企业</el-button>
                            </div>
                        </div>
                        <div class="detail_content" v-if="isCreate == 1">
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">组织名称</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizapply && baseInfo.bizapply.businessOrgPname || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">所属行业</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizapply && baseInfo.bizapply.tradeName || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">业务人员</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizapply && baseInfo.bizapply.realName || '---'}}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">业务部门</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizapply && baseInfo.bizapply.orgName || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <span class="detail_content_item_label">企业角色</span>
                                <span class="detail_content_item_content">{{ baseInfo.bizapply && bizRolesFN(baseInfo.bizapply.bizRoles) || '---' }}</span>
                            </div>
                            <div class="detail_content_item">
                                <el-button type="primary" size="mini" class="br-btn-large" @click="onInvest(baseInfo.bizapply)">资信调查</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-gap"></div>
        <div class="template-content">
            <template v-if="isCreate == '1'">
                <el-tabs v-model="activeOuter">
                    <el-tab-pane name="first">
                        <span slot="label"><i class="el-icon-user"></i> 基础信息</span>
                        <el-tabs v-model="activeInner" :before-leave='leaveTab' type="border-card">
                            <el-tab-pane name="first">
                                <span slot="label"><i class="el-icon-user"></i> 基本信息</span>
                                <BaseInfo :baseInfo="baseInfo" :isCreate="isCreate"></BaseInfo>
                            </el-tab-pane>
                            <el-tab-pane name="second">
                                <span slot="label"><i class="el-icon-position"></i> 经营信息</span>
                                <BusinessInfo :businessData="businessData" @getBusinessInfo="getBusinessInfo"></BusinessInfo>
                            </el-tab-pane>
                            <el-tab-pane name="third">
                                <span slot="label"><i class="el-icon-bell"></i> 经营不良</span>
                                <BusinessBad :data="businessBad"></BusinessBad>
                            </el-tab-pane>
                            <el-tab-pane name="fourth">
                                <span slot="label"><i class="el-icon-suitcase"></i> 司法信息</span>
                                <JudicialInfo :data="judicialData" @getJudicialInfo="getJudicialInfo"></JudicialInfo>
                            </el-tab-pane>
                            <el-tab-pane name="five">
                                <span slot="label"><i class="el-icon-suitcase-1"></i> 法代信息</span>
                                <NormalBand :data="normalData"></NormalBand>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane name="second">
                        <span slot="label"><i class="el-icon-document"></i> 资信记录</span>
                        <CreditStand></CreditStand>
                    </el-tab-pane>
                    <el-tab-pane name="third">
                        <span slot="label"><i class="el-icon-collection-tag"></i> 授信记录</span>
                        <CreditExten></CreditExten>
                    </el-tab-pane>
                    <el-tab-pane name="fourth">
                        <span slot="label"><i class="el-icon-coin"></i> 动态跟踪记录</span>
                        <!-- <DynamicTrack></DynamicTrack> -->
                    </el-tab-pane>
                    <el-tab-pane name="five">
                        <span slot="label"><i class="el-icon-discount"></i> 资信报告记录</span>
                        <CreditReport></CreditReport>
                    </el-tab-pane>
                    <el-tab-pane name="six">
                        <span slot="label"><i class="el-icon-news"></i> 风险信息</span>

                    </el-tab-pane>

                    <el-tab-pane name="seven">
                        <span slot="label"><i class="el-icon-pie-chart"></i> 趋势统计</span>

                    </el-tab-pane>
                </el-tabs>
            </template>
            <template v-if="isCreate == '0'">
                <el-tabs v-model="activeInner" :before-leave='leaveTab'>
                    <el-tab-pane name="first">
                        <span slot="label"><i class="el-icon-user"></i> 基本信息</span>
                        <BaseInfo :baseInfo="baseInfo" :isCreate="isCreate"></BaseInfo>
                    </el-tab-pane>
                    <el-tab-pane name="second">
                        <span slot="label"><i class="el-icon-position"></i> 经营信息</span>
                        <BusinessInfo :businessData="businessData" @getBusinessInfo="getBusinessInfo"></BusinessInfo>
                    </el-tab-pane>
                    <el-tab-pane name="third">
                        <span slot="label"><i class="el-icon-bell"></i> 经营不良</span>
                        <BusinessBad :data="businessBad"></BusinessBad>
                    </el-tab-pane>
                    <el-tab-pane name="fourth">
                        <span slot="label"><i class="el-icon-suitcase"></i> 司法信息</span>
                        <JudicialInfo :data="judicialData" @getJudicialInfo="getJudicialInfo"></JudicialInfo>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>
        <AddOrUpdate ref="addOrUpdate" :dialogData="dialogData" :creadInfo="creadInfo" dialogType="create" @getBaseInfo="getBaseInfo" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ContentWrapper } from "@/components";
import { namespace } from "vuex-class";

const enterpriseInfoSearch = namespace("enterpriseInfoSearch");
const enterpriseInfoManage = namespace("enterpriseInfoManage");

import AddOrUpdate from "./modals/addOrUpdate.vue";

import BaseInfo from "./tabs/BaseInfo.vue";
import BusinessInfo from "./tabs/BusinessInfo.vue";
import BusinessBad from "./tabs/BusinessBad.vue";
import JudicialInfo from "./tabs/JudicialInfo.vue";
import NormalBand from "./tabs/NormalBand.vue";

/* 资信记录 */
import CreditStand from "./records/creditStand/index.vue";
/* 授信记录 */
import CreditExten from "./records/creditExten/index.vue";
/* 资信报告记录 */
import CreditReport from "./records/creditReport/index.vue";

@Component({
    name: "detailView",
    components: {
        ContentWrapper,
        AddOrUpdate,
        BaseInfo,
        BusinessInfo,
        BusinessBad,
        JudicialInfo,
        NormalBand,
        CreditStand,
        CreditExten,
        CreditReport,
    },
})
export default class detailView extends Vue {
    @enterpriseInfoManage.Action chectCreditStandFN;
    @enterpriseInfoManage.Action checkEnterpriseLocalFN;

    @enterpriseInfoSearch.Action getBaseInfoFN;
    @enterpriseInfoSearch.Action getBaseInfoUnCreatedFN;

    @enterpriseInfoSearch.Action getBusinessInfoFN;
    @enterpriseInfoSearch.Action getBusinessInfoUnCreatedFN;

    @enterpriseInfoSearch.Action getBusinessBadFN;
    @enterpriseInfoSearch.Action getBusinessBadUnCreatedFN;

    @enterpriseInfoSearch.Action getJudicialInfoFN;
    @enterpriseInfoSearch.Action getJudicialInfoUnCreatedFN;

    @enterpriseInfoSearch.Action getNormalBandFN;
    @enterpriseInfoSearch.Action getNormalBandUnCreatedFN;

    activeOuter: string = "first";
    activeInner: string = "first";
    isCreate: any = "";
    creadInfo: any = {}; // 创建企业需要的信息存储

    dialogData: any = {
        bizName: "",
        creditCode: "",
        bizRoles: [],
        areaList: [],
        busOrgCode: "",
        tradeKeyNo: "",
        busUserId: "",
        ifCreditFlag: "",
        ifInvestFlag: "",
        createUser: "",
        createTime: "",
        operPaperId: "",
        operMobileNo: "",
        detailAddr: "",
        creditFlag: "",
        operName: "", // 法定代表人
    };
    public detailLoading: boolean = false;
    public baseInfo: any = {
        bizBaseInfo: {
            bizName: "",
        },
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
    mounted() {
        this.detailLoading = true;
        this.getBaseInfo();
        this.getBusinessInfo();
        this.getBusinessBad();
        this.getJudicialInfo();
        this.getNormalBand();
    }
    bizRolesFN(data) {
        let cancats: any = [];
        data.map((item) => {
            cancats.push(this.$code("bizRoles", item));
        });
        return cancats.join("，");
    }
    // 基本信息
    getBaseInfo() {
        let { custId, creditCode, isCreate, corpName } = this.$route.query;

        this.isCreate = isCreate;

        if (this.isCreate === "1") {
            // 已创建
            let params = {
                custId: custId || "",
                creditCode: creditCode || "",
            };
            this.getBaseInfoFN(params)
                .then((res) => {
                    this.baseInfo = res;
                })
                .finally(() => (this.detailLoading = false));
        } else {
            // 未创建
            let params = {
                creditCode: creditCode || "",
                corpName: corpName || "",
            };
            this.getBaseInfoUnCreatedFN(params)
                .then((res) => {
                    this.baseInfo = res;
                })
                .finally(() => (this.detailLoading = false));
        }
    }
    // 经营信息
    getBusinessInfo(data?: any) {
        let { corpName, creditCode, custId } = this.$route.query;
        if (this.isCreate === "1") {
            // 已创建
            let params =
                typeof data == "object" ? { custId, ...data } : { custId };
            this.getBusinessInfoFN(params).then((res) => {
                for (let key in res) {
                    this.$set(this.businessData, key, res[key]);
                }
            });
        } else {
            // 未创建
            let cache = {
                creditCode: creditCode,
                corpName: corpName,
            };
            let params =
                typeof data == "object" ? { ...cache, ...data } : cache;
            this.getBusinessInfoUnCreatedFN(params).then((res) => {
                for (let key in res) {
                    this.$set(this.businessData, key, res[key]);
                }
            });
        }
    }

    // 经营不良
    getBusinessBad(data?: any) {
        let { custId, creditCode, corpName } = this.$route.query;
        if (this.isCreate === "1") {
            // 已创建
            let params = {
                custId: custId || "",
                creditCode: creditCode || "",
            };
            this.getBusinessBadFN(params).then((res) => {
                this.businessBad = res;
            });
        } else {
            // 未创建
            let params = {
                creditCode: creditCode || "",
                corpName: typeof data == "object" ? data.bizName : corpName,
            };
            this.getBusinessBadUnCreatedFN(params).then((res) => {
                this.businessBad = res;
            });
        }
    }

    // 司法信息
    getJudicialInfo(data?: any) {
        let { custId, creditCode, isCreate, corpName } = this.$route.query;
        this.isCreate = isCreate;
        if (this.isCreate === "1") {
            // 已创建
            let cache = {
                custId: custId || "",
                creditCode: creditCode || "",
            };
            let params =
                typeof data == "object" ? { ...cache, ...data } : cache;

            this.getJudicialInfoFN(params).then((res) => {
                this.judicialData = res;
            });
        } else {
            // 未创建
            let cache = {
                creditCode: creditCode || "",
                corpName: corpName, // 企业名称
            };
            let params =
                typeof data == "object" ? { ...cache, ...data } : cache;

            this.getJudicialInfoUnCreatedFN(params).then((res) => {
                this.judicialData = res;
            });
        }
    }

    // 法代信息
    getNormalBand(data?: any) {
        let {
            custId,
            creditCode,
            isCreate,
            keyNo,
            corpName,
        } = this.$route.query;
        if (isCreate == "1") {
            let cache = {
                custId: custId,
                creditCode: creditCode,
                custType: "0",
            };
            let params =
                typeof data == "object" ? { ...cache, ...data } : cache;
            this.getNormalBandFN(params).then((res) => {
                this.normalData = res;
            });
        } else {
            // 未创建时，data 为表格中的数据
            let params = {
                creditCode: creditCode,
                corpName: typeof data == "object" ? data.bizName : corpName, //企业名称
                cell: data.employeMobileno, // 	手机号
                id: data.employePaperid, // 		身份证号
                keyNo: data.keyNo, // 		列表唯一编号
            };
            this.getNormalBandUnCreatedFN(params).then((res) => {
                this.normalData = res;
            });
        }
    }

    leaveTab(activeName, oldActiveName) {
        return;
        let FnMap = {
            first: this.getBaseInfo,
            second: this.getBusinessInfo,
            third: this.getBusinessBad,
            fourth: this.getJudicialInfo,
            five: this.getNormalBand,
        };
        FnMap[activeName]();
    }

    // 创建企业
    onCreate(row) {
        this.creadInfo = {
            bizName: row.bizName,
            creditCode: row.creditCode,
            operPaperId: row.operPaperId,
            operMobileNo: row.operMobileNo,
            operName: row.operName, // 法定代表人
        };

        this.$refs.addOrUpdate["open"]();
    }
    // 资信调查
    checkFN(row) {
        return new Promise((resolve, reject) => {
            this.checkEnterpriseLocalFN({ custId: row.custId }).then((res) => {
                if (res && res.code === "0") {
                    this.$confirm(res.message, "温馨提示", {
                        confirmButtonText: "我知道了",
                        showCancelButton: false,
                        type: "warning",
                    });
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
    async onInvest(row) {
        let result = await this.checkFN(row);
        if (result) {
            this.chectCreditStandFN({
                tradeKeyNo: row.tradeKeyNo,
                custId: row.custId,
                creditCode: row.creditCode,
                modelType: "02",
            }).then((res) => {
                let jump = () => {
                    this.$router.push({
                        path: "/enterpriseInfoManage/survey",
                        name: "survey",
                        query: row,
                    });
                };
                if (res.resultCode == "0") {
                    this.$confirm(res.resultMsg, "温馨提示", {
                        confirmButtonText: "我知道了",
                        showCancelButton: false,
                        type: "warning",
                    });
                } else if (res.resultCode == "1") {
                    this.$confirm(res.resultMsg, "温馨提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    }).then(() => jump());
                } else {
                    jump();
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.base_top_info {
    display: flex;
    .avator {
        width: 60px;
        height: 60px;
        img {
            width: 100%;
        }
    }
    .base_top_info_content {
        flex: 1;
        margin-left: 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
            font-size: 16px;
            color: #3c3d40;
            font-weight: bold;
        }
        .detail_content_item {
            margin: 0;
            margin-right: 28px;
            flex-basis: 0;
            .detail_content_item_label {
                width: auto;
            }
        }
    }
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