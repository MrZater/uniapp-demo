<template>
    <B-dialog title="详情" :visible="dialogVisible" width="1550px" @close="close">
        <el-tabs v-model="activeName" v-loading="loading">
            <el-tab-pane name="first">
                <span slot="label"><i class="el-icon-user"></i> 基本信息</span>
                <BaseInfo :baseInfo="baseInfo" :isBranch="true"></BaseInfo>
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
        <template slot="footer">
            <el-button class="br-btn-large" @click="dialogVisible = false">关 闭</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";

const enterpriseInfoSearch = namespace("enterpriseInfoSearch");

import { BDialog } from "@/components";

import BusinessInfo from "../tabs/BusinessInfo.vue";
import BusinessBad from "../tabs/BusinessBad.vue";
import JudicialInfo from "../tabs/JudicialInfo.vue";

@Component({
    name: "branch-dialog",
    components: {
        BDialog,
        BaseInfo: () => import("../tabs/BaseInfo.vue"),
        BusinessInfo,
        BusinessBad,
        JudicialInfo,
    },
})
export default class Dialog extends Vue {
    @enterpriseInfoSearch.Action getBaseInfoFN;
    @enterpriseInfoSearch.Action getBaseInfoUnCreatedFN;

    @enterpriseInfoSearch.Action getBusinessInfoFN;
    @enterpriseInfoSearch.Action getBusinessInfoUnCreatedFN;

    @enterpriseInfoSearch.Action getBusinessBadFN;
    @enterpriseInfoSearch.Action getBusinessBadUnCreatedFN;

    @enterpriseInfoSearch.Action getJudicialInfoFN;
    @enterpriseInfoSearch.Action getJudicialInfoUnCreatedFN;

    public loading: boolean = false;
    public baseInfo: any = {
        bizBaseInfo: {},
        empLoyees: [],
        branches: [],
        permissioneci: [],
        changeRecords: [],
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
    public activeName: string = "first";
    public dialogVisible: boolean = false;
    public rowData: any = {};

    open(row) {
        this.dialogVisible = true;
        this.rowData = row;
        this.getBaseInfo();
        this.getBusinessInfo();
        this.getBusinessBad();
        this.getJudicialInfo();
    }

    close() {
        this.dialogVisible = false;
        this.baseInfo = {};
        this.businessData = {
            assetsData: [],
            providAassurance: [],
            partners: [],
            partnerInvest: { list: [] },
            pledge: [],
            bizInvest: { list: [] },
            chattelMortgage: [],
        };
        this.businessBad = {};
        this.judicialData = {
            judgmentdoc: { list: [] },
            executor: { list: [] },
            uncreditexecutor: { list: [] },
            openannounce: { list: [] },
        };
        this.activeName = "first";
    }
    getBaseInfo() {
        // 未创建
        let params = {
            creditCode: this.rowData.creditCode || "",
            corpName: this.rowData.bizName || "",
        };
        this.loading = true;
        this.getBaseInfoUnCreatedFN(params)
            .then((res) => {
                this.baseInfo = res;
            })
            .finally(() => (this.loading = false));
    }
    getBusinessInfo(data?: any) {
        // 未创建
        let cache = {
            creditCode: this.rowData.creditCode || "",
            corpName: this.rowData.bizName,
        };
        let params = typeof data == "object" ? { ...cache, ...data } : cache;
        this.getBusinessInfoUnCreatedFN(params).then((res) => {
            for (let key in res) {
                this.$set(this.businessData, key, res[key]);
            }
        });
    }
    // 经营不良
    getBusinessBad(data?: any) {
        // 未创建
        let params = {
            creditCode: this.rowData.creditCode || "",
            corpName: this.rowData.bizName,
        };
        this.getBusinessBadUnCreatedFN(params).then((res) => {
            this.businessBad = res;
        });
    }

    // 司法信息
    getJudicialInfo(data?: any) {
        // 未创建
        let cache = {
            creditCode: this.rowData.creditCode || "",
            corpName: this.rowData.bizName,
        };
        let params = typeof data == "object" ? { ...cache, ...data } : cache;

        this.getJudicialInfoUnCreatedFN(params).then((res) => {
            this.judicialData = res;
        });
    }
}
</script>
