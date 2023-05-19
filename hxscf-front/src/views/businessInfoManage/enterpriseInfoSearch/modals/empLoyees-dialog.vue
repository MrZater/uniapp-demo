<template>
    <B-dialog title="详情" :visible="dialogVisible" width="60%" @close="close" :destroy-on-close="true">
        <NormalBand :data="normalData" v-loading="loading"></NormalBand>
        <template slot="footer">
            <el-button class="br-btn-large" @click="close">关 闭</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const enterpriseInfoSearch = namespace("enterpriseInfoSearch");
import { BDialog } from "@/components";

import NormalBand from "../tabs/NormalBand.vue";

@Component({
    components: {
        BDialog,
        NormalBand,
    },
})
export default class Dialog extends Vue {
    @enterpriseInfoSearch.Action getNormalBandFN;
    @enterpriseInfoSearch.Action getNormalBandUnCreatedFN;
    public dialogVisible: boolean = false;
    public loading: boolean = false;
    public normalData: any = {};
    open(row) {
        this.dialogVisible = true;
        this.getNormalBand(row);
    }

    // 法代信息
    getNormalBand(row: any) {
        let { creditCode, isCreate, keyNo, corpName } = this.$route.query;
        if (isCreate === "1") {
            let params = {
                custId: row.custId,
                keyNo: row.keyNo,
                custType: "1",
            };
            this.loading = true;
            this.getNormalBandFN(params)
                .then((res) => {
                    this.normalData = res;
                })
                .finally(() => (this.loading = false));
        } else {
            let params = {
                creditCode: creditCode,
                corpName: row.corpName, //企业名称
                cell: row.employeMobileno, // 	手机号
                id: row.employePaperid, // 		身份证号
                keyNo: row.keyNo, // 		列表唯一编号
            };
            this.loading = true;
            this.getNormalBandUnCreatedFN(params)
                .then((res) => {
                    this.normalData = res;
                })
                .finally(() => (this.loading = false));
        }
    }
    close() {
        this.normalData = {};
        this.dialogVisible = false;
    }
}
</script>
