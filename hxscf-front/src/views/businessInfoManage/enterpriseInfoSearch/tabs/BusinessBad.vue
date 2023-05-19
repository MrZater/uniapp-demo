<template>
    <div>
        <div class="point-group">
            <el-button v-for="(item,index) in tags" class="model-button" size="mini" :type="index==currentTagIndex ? 'primary' : ''" :key="index" @click="goToAnchor(index)">
                {{ item }}
            </el-button>
        </div>
        <div class="sub-gap"></div>
        <div class="sub-title">行政处罚</div>
        <el-table stripe :data="data.penalty" class="br-table" border>
            <el-table-column label="决定文书号" prop="docNo" />
            <el-table-column label="处罚金额" prop="caseAmt">
                <template slot-scope="{row}">
                    <span>{{ row.caseAmt | money }}</span>
                </template>
            </el-table-column>
            <el-table-column label="决定日期" prop="penaltyDate" />
            <el-table-column label="处罚事由" width="80">
                <template slot-scope="{row}">
                    <el-button type="text" @click="onSubmit(row.caseContent)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">列入经营异常名录</div>
        <el-table stripe :data="data.bizOpException" class="br-table" border>
            <el-table-column label="列入日期" prop="addDate" />
            <el-table-column label="列入机关" prop="addOffice" />
            <el-table-column label="列入原因" prop="addReason" show-overflow-tooltip />
            <el-table-column label="移出日期" prop="removeDate" />
            <el-table-column label="移出机关" prop="removeOffice" />
            <el-table-column label="移出原因" width="80">
                <template slot-scope="{row}">
                    <el-button type="text" @click="onSubmit(row.removeReason)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">列入严重违法失信黑名单(工商)</div>
        <el-table stripe :data="data.bizSeriousViolation" class="br-table" border>
            <el-table-column label="列入日期" prop="addDate" />
            <el-table-column label="列入机关" prop="addOffice" />
            <el-table-column label="列入原因" prop="addReason" show-overflow-tooltip />
            <el-table-column label="移出日期" prop="removeDate" />
            <el-table-column label="移出机关" prop="removeOffice" />
            <el-table-column label="移出原因" width="80">
                <template slot-scope="{row}">
                    <el-button type="text" @click="onSubmit(row.removeReason)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-title">股权冻结</div>
        <el-table stripe :data="data.freezeInfo" class="br-table" border>
            <el-table-column label="冻结被执行人" prop="executee" show-overflow-tooltip />
            <el-table-column label="冻结被执行人证件号码" prop="executeeIdentifyNo" min-width="120" show-overflow-tooltip />
            <el-table-column label="冻结被执行人证件类型" prop="executeeIdentifyType" min-width="110" show-overflow-tooltip />
            <el-table-column label="冻结股权数额" prop="equityAmount">
                <template slot-scope="{row}">
                    <span>{{ row.equityAmount | money }}</span>
                </template>
            </el-table-column>
            <el-table-column label="冻结状态" prop="equityStatus" />
            <el-table-column label="冻结期限" prop="freezeYears" />
            <el-table-column label="开始日期" prop="freezeStartDate" />
            <el-table-column label="结束日期" prop="freezeEndDate" />
            <el-table-column label="公示日期" prop="publicDate" />
            <el-table-column label="裁定书文号" prop="execNo" show-overflow-tooltip />
            <el-table-column label="通知书文号" prop="docNo" />
            <el-table-column label="执行法院" prop="execCourt" />
            <el-table-column label="执行事项" width="80">
                <template slot-scope="{row}">
                    <el-button type="text" @click="onSubmit(row.execItem)">详情</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">简易注销公告</div>
        <el-table stripe :data="data.bizLogout" class="br-table" border>
            <el-table-column label="企业名称" prop="bizName" />
            <el-table-column label="登记机关" prop="belongOrg" />
            <el-table-column label="开始日期" prop="logoutFrom" />
            <el-table-column label="结束日期" prop="logoutTo" />
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">清算</div>
        <el-table stripe :data="data.liquidation" class="br-table" border>
            <el-table-column label="清算组负责人" prop="leader" />
            <el-table-column label="清算组成员" prop="member" />
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-title">司法协助</div>
        <el-table stripe :data="data.bizJustice" class="br-table" border>
            <el-table-column label="被执行人" prop="executee" />
            <el-table-column label="股权数额" prop="equityAmount">
                <template slot-scope="{row}">
                    <span>{{ row.equityAmount | money }}</span>
                </template>
            </el-table-column>
            <el-table-column label="股权数额类型" prop="equityAmountType" />
            <el-table-column label="执行法院" prop="execCourt" />
            <el-table-column label="执行通知书文号" prop="execNo" />
            <el-table-column label="状态" prop="equityStatus" />
        </el-table>
        <childDialog ref="dialogDetail" :dialogData="dialogData" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import childDialog from "./dialog.vue";

@Component({
    name: "BusinessBad",
    components: {
        childDialog,
    },
})
export default class BusinessBad extends Vue {
    @Prop({ default: () => ({}), type: Object }) data;

    currentTagIndex: number = 0;
    tags: any = [
        "行政处罚",
        "列入经营异常名录",
        "列入严重违法失信黑名单(工商)",
        "股权冻结",
        "简易注销公告",
        "清算",
        "司法协助",
    ];
    nodeLists: any = [];
    public dialogData = "";

    mounted() {
        this.$nextTick(() => {
            this.nodeLists = this.$el.querySelectorAll(".sub-title");
        });
    }
    goToAnchor(index) {
        this.currentTagIndex = index;
        this.nodeLists[index].scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐
        });
    }

    dialogFN(val) {
        this.$refs.dialogDetail["open"]();
        this.dialogData = val;
    }
    onSubmit(row) {
        this.dialogFN(row);
    }
}
</script>

<style scoped lang="scss">
.w100 {
    width: 100%;
}

.point-group {
    background: #edf5ff;
    padding: 0px 18px;
    height: 60px;
    line-height: 60px;

    .model-button:not(:first-child) {
        margin-left: 10px;
        margin-bottom: 10px;
    }
}

.detail_content {
    background: #edf5ff;
}
</style>
