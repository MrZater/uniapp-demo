<template>
    <el-dialog title="选项" :visible.sync="visible" width="70%" class="br-dialog" @close="reset" :close-on-click-modal="false">
        <Report :data="reportData" :reportLoading="reportLoading"></Report>
        <div slot="footer" class="br-dialog-footer">
            <el-button class="br-btn-large" @click="visible = false">关 闭</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const creditReport = namespace("creditReport");
import radarChart from "./radarChart.vue";
import Report from "@/views/businessInfoManage/enterpriseInfoManage/survey/Report.vue";
@Component({
    components: {
        radarChart,
        Report,
    },
})
export default class Dialog extends Vue {
    @creditReport.Action queryDetail;
    public reportLoading: boolean = false;
    public visible: boolean = false;
    public reportData: any = {};
    public chartData: any = [
        {
            value: [60, 73, 85, 40, 90],
            name: "某软件",
        },
    ];
    init(row) {
        this.visible = true;
        this.reportLoading = true;
        this.queryDetail({ reportKeyNo: row.keyNo })
            .then((res) => {
                this.$set(this, "reportData", res);
            })
            .finally(() => {
                this.$nextTick(() => (this.reportLoading = false));
            });
    }

    reset() {
        this.$set(this, "reportData", {});
        this.visible = false;
    }
}
</script>

<style  scoped lang="scss">
.br-dialog {
    /deep/ .report-box {
        border: none;
        box-shadow: none;
        padding: 0px 20px;
    }
}
</style>
