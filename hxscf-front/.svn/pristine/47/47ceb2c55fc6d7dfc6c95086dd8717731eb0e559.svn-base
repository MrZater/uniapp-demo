<template>
    <div class="template-container">
        <div>
            <div class="sub-title">关联企业
                <el-link type="primary" :underline="false" class="link" @click="onChangeDetail">变更信息</el-link>
            </div>
            <el-table stripe border :data="data" class="br-table">
                <el-table-column label="企业名称" prop="bizName" show-overflow-tooltip></el-table-column>
                <el-table-column label="企业性质" prop="bizNature" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{handleBizNature(row.bizNature)}}
                    </template>
                </el-table-column>
                <el-table-column label="实缴资本(万元)" prop="realAmt" width="120px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.realAmt | money}}
                    </template>
                </el-table-column>
                <el-table-column label="净资产" prop="netAmt" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.netAmt | money}}
                    </template>
                </el-table-column>
                <el-table-column label="信用等级" prop="riskLevel" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用评分" prop="riskScore" show-overflow-tooltip></el-table-column>
                <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="信用风险限额" prop="riskMaxAmt" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="是否担保" prop="guaranteeFlag" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("guaranteeType",row.guaranteeFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="是否设置申请额度" prop="quotaSetFlag" width="150px" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{$code("quotaSetType",row.quotaSetFlag)}}
                    </template>
                </el-table-column>
                <el-table-column label="申请额度" prop="applyQuota" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{row.applyQuota | money}}
                    </template>
                </el-table-column>
                <el-table-column label="授信到期日" prop="endDate" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="其他信息" prop="code9" width="100px">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="onReport">资信报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <RemarkDialog ref="remark" />
        <ChangeInformation ref="changeInfomation" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
import RemarkDialog from "./remark-dialog.vue";
import ChangeInformation from "../../common/changeInformation.vue";
@Component({
    components: {
        RemarkDialog,
        ChangeInformation,
    },
})
export default class creditWay extends Vue {
    @Prop({ default: () => [], type: Array }) data;
    @general.Action queryDataByDicCode;
    @general.State enterpriseNatureOption;

    public bizNature: any = [];

    mounted() {
        this.queryDataByDicCode({ dicCode: "enterpriseNature" });
    }

    // 翻译企业性质
    handleBizNature(code) {
        let target = this.enterpriseNatureOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "";
    }

    // 资信报告
    onReport() {}

    // 备注
    onRemark(row) {
        let $el: any = this.$refs["remark"];
        $el.init(row);
    }

    // 变更信息
    onChangeDetail() {
        let $el: any = this.$refs["changeInfomation"];
        $el.init();
    }
}
</script>

<style scoped lang="scss">
.link {
    margin-left: 10px;
    vertical-align: text-top;
}
</style>
