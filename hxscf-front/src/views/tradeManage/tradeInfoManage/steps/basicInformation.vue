<template>
    <div class="template-container" v-loading="loading">
        <div class="tags">
            <el-form :inline="true" :rules="rules" :model="queryForm" label-width="70px" ref="form" size="small">
                <el-form-item class="br-form-item-label" label="数据年份" prop="indexDate">
                    <el-date-picker class="br-select" v-model="queryForm.indexDate" type="year" value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="">
                    <el-upload :disabled="!queryForm.indexDate" class="upload-demo" name="file" :action="`/approve/customer/importDataByExcel`" :headers="{token:token}"
                        :data="{requestData:requestData}" :on-change="handleChange" :on-success="onSuccess" :file-list="fileList" :limit="1">
                        <el-button type="primary" class="br-btn" accept=".xlsx,.xls" :disabled="!queryForm.indexDate">选择文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-button type="primary" class="br-btn" style="float:right" @click="onDownload">下载模板</el-button>
            </el-form>
            <el-tabs v-model="activeName">
                <el-tab-pane label="盈利能力状况" name="first">
                    <Grid :list="data.profitAbility"></Grid>
                </el-tab-pane>
                <el-tab-pane label="资产质量状况" name="second">
                    <Grid :list="data.assetQuality"></Grid>
                </el-tab-pane>
                <el-tab-pane label="债务风险状况" name="third">
                    <Grid :list="data.debtRisk"></Grid>
                </el-tab-pane>
                <el-tab-pane label="经营增长状况" name="fourth">
                    <Grid :list="data.businessIncrease"></Grid>
                </el-tab-pane>
                <el-tab-pane label="其他绩效状况" name="five">
                    <Grid :list="data.otherItem"></Grid>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { getStore } from "@/utils/useStore";
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");
import Grid from "./Grid.vue";

@Component({
    components: {
        Grid,
    },
})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action queryRiskTradeBase; //查看行业基础数据
    @tradeInfoManage.Mutation saveRiskId;
    @tradeInfoManage.State riskId;
    public queryForm: any = {
        indexDate: "",
    };

    public loading: boolean = false;

    public activeName: string = "first"; // 页签

    fileList: any = [];

    rules = {
        indexDate: [
            { required: true, message: "请选择数据年份", trigger: "change" },
        ],
    };

    requestData: string = "";

    token: string = "";

    data: any = {
        profitAbility: [],
        assetQuality: [],
        debtRisk: [],
        businessIncrease: [],
        otherItem: [],
    };

    mounted() {
        this.token = getStore("token") || "";
        if (this.riskId) this.init(this.riskId);
    }
    @Watch("queryForm.indexDate", { deep: true })
    onDateChange(val) {
        if (val) this.updateRequestData(true, val);
    }
    @Watch("riskId", { deep: true })
    onRiskIdChange(val) {
        if (val) this.updateRequestData(false, val);
    }

    updateRequestData(isDate, val) {
        let { keyNo, orgPcode } = this.$route.query;
        let params = {
            params: {
                keyNo: keyNo,
                orgPcode: orgPcode,
                indexDate: isDate ? val : this.queryForm.indexDate,
                riskId: isDate ? "" : val,
            },
        };
        this.requestData = JSON.stringify(params);
    }

    handleChange(file) {
        const filename = file.name;
        const regs = new RegExp(".(xlsx|xls)");
        const fileNameReg = regs.test(filename);
        if (!fileNameReg) {
            this.$message({
                type: "error",
                message: "请选择.xls、.xlsx文件!",
            });
            this.fileList = [];
            return false;
        }
        const is500M = file.size / 1024 / 1024 < 500;

        if (!is500M) {
            this.$message({
                type: "error",
                message: "文件大小不能超过500M!",
            });
            this.fileList = [];
            return false;
        }
        this.queryForm.file = file.raw;
    }

    onSuccess(err, file, fileList) {
        this.fileList = [];
        if (err.code === "10004") {
            this.$router.replace({ path: "/login" });
            return;
        }
        if (err.code !== "00000") {
            this.$message({ type: "error", message: err.msg });
        }
        if (err.code === "00000") {
            // 将riskId存储到vuex，方便其他组件使用
            this.saveRiskId(err.data.riskId);
            this.init(err.data.riskId);
        }
    }
    onDownload() {
        window.location.href = `/approve/customer/export`;
    }
    init(riskId) {
        this.loading = true;
        this.queryRiskTradeBase({ riskId: riskId })
            .then((res) => {
                this.$set(this.queryForm, "indexDate", res.indexDate);
                this.data = res;
            })
            .finally(() => (this.loading = false));
    }
}
</script>

<style scoped lang="scss">
.tags {
    background: #fff;
    padding: 20px;
}
</style>
