/*
 * @Author: mingliang.zhu 
 * @Date: 2020-11-13 17:08:35 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-12-24 14:31:47
 * @Description 此组件默认为 企业，通过动态参数为isBranch:true 设置为 关联公司
 */

<template>
    <div>
        <div class="point-group">
            <el-button v-for="(item,index) in tags" class="model-button" size="mini" :type="index==currentTagIndex ? 'primary' : ''" :key="index" @click="goToAnchor(index)">
                {{item}}
            </el-button>
        </div>
        <div class="sub-gap"></div>
        <div class="sub-title">资产状况</div>
        <el-table stripe :data="businessData.assetsData" class="br-table" border>
            <el-table-column label="报送年度" prop="sendYear"></el-table-column>
            <el-table-column label="所有者权益合计">
                <template slot-scope="{row}">
                    <span>{{row.totalOwnersEquity | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="营业总收入">
                <template slot-scope="{row}">
                    <span>{{row.cgrossTradingIncome | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="利润总额" prop="code4">
                <template slot-scope="{row}">
                    <span>{{row.totalProfit | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="主营业务" prop="mainBusinessIncome"></el-table-column>
            <el-table-column label="净利润">
                <template slot-scope="{row}">
                    <span>{{row.netProfit | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="纳税总额">
                <template slot-scope="{row}">
                    <span>{{row.totalTaxAmount | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="负债总额">
                <template slot-scope="{row}">
                    <span>{{row.totalLiablities | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="金融贷款">
                <template slot-scope="{row}">
                    <span>{{row.bankingCredit | money}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">对外保证担保</div>
        <el-table stripe :data="businessData.providAassurance" class="br-table" border>
            <el-table-column label="报送年度" prop="sendYear" show-overflow-tooltip></el-table-column>
            <el-table-column label="债务人" prop="debtor" show-overflow-tooltip></el-table-column>
            <el-table-column label="债权人" prop="creditor" show-overflow-tooltip></el-table-column>
            <el-table-column label="主债权种类" prop="creditorCategory" show-overflow-tooltip></el-table-column>
            <el-table-column label="主债权数额" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.creditorAmount | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="债务期限" prop="fulfillObligation" show-overflow-tooltip />
            <el-table-column label="保证期间" prop="assuranceDurn" show-overflow-tooltip></el-table-column>
            <el-table-column label="保证方式" prop="assuranceType" show-overflow-tooltip></el-table-column>
            <el-table-column label="保证范围" min-width="80">
                <template slot-scope="{row}">
                    <el-button type="text" @click="onSubmit(row.assuranceScope)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">股东及出资信息</div>
        <el-table stripe :data="businessData.partners" class="br-table" border>
            <el-table-column label="股东名称" prop="stockName" show-overflow-tooltip></el-table-column>
            <el-table-column label="股东类型" prop="stockType" show-overflow-tooltip></el-table-column>
            <el-table-column label="认缴出资额" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.shouldCapi | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="认缴出资方式" prop="investType" show-overflow-tooltip></el-table-column>
            <el-table-column label="认缴出资时间" prop="shoudDate" show-overflow-tooltip />
            <el-table-column label="实缴出资额" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.realCapi | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="出资比例" prop="stockPercent" show-overflow-tooltip />
            <el-table-column label="实缴时间" prop="capiDate" show-overflow-tooltip />
            <el-table-column label="最终收益股份" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.finalBenefitPercent | money}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-title">企业对外投资</div>
        <el-table stripe :data="businessData.bizInvest.list" class="br-table" border>
            <el-table-column label="公司名称" prop="bizName" show-overflow-tooltip></el-table-column>
            <el-table-column label="统一社会信用代码" prop="creditCode" show-overflow-tooltip></el-table-column>
            <el-table-column label="法定代表人" prop="operName" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业类型" prop="econKind" show-overflow-tooltip></el-table-column>
            <el-table-column label="注册资本" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.registCapi | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="成立日期" prop="startDate" show-overflow-tooltip />
            <el-table-column label="出资比例" prop="fundedRatio" show-overflow-tooltip />
        </el-table>
        <Pages :pageNum="businessData.bizInvest.pageNum" :pageSize="businessData.bizInvest.pageSize" :total="businessData.bizInvest.total" @changePage="changePageFn" flag="bizInvest" />
        <div class="sub-gap"></div>
        <div class="sub-title">股东对外投资</div>
        <el-table stripe :data="businessData.partnerInvest.list" class="br-table" border>
            <el-table-column label="股东名称" prop="stockName" show-overflow-tooltip></el-table-column>
            <el-table-column label="公司名称" prop="bizName" show-overflow-tooltip></el-table-column>
            <el-table-column label="法定代表人" prop="operName" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业类型" prop="econKind" show-overflow-tooltip></el-table-column>
            <el-table-column label="注册资本" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.registCapi | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="成立日期" prop="startDate" show-overflow-tooltip></el-table-column>
            <el-table-column label="出资比例" prop="fundedRatio" show-overflow-tooltip></el-table-column>
        </el-table>
        <Pages :pageNum="businessData.partnerInvest.pageNum" :pageSize="businessData.partnerInvest.pageSize" :total="businessData.partnerInvest.total" @changePage="changePageFn"
            flag="partnerInvest" />
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">股权出质</div>
        <el-table stripe :data="businessData.pledge" class="br-table" border>
            <el-table-column label="质权登记编号" prop="registNo" show-overflow-tooltip></el-table-column>
            <el-table-column label="出质人" prop="pledgor" show-overflow-tooltip></el-table-column>
            <el-table-column label="出质人证照编号" prop="pledgorNo" show-overflow-tooltip></el-table-column>
            <el-table-column label="质权人" prop="pledgee" show-overflow-tooltip></el-table-column>
            <el-table-column label="质权人证照编号" prop="pledgeeNo" show-overflow-tooltip></el-table-column>
            <el-table-column label="出质股权数额">
                <template slot-scope="{row}">
                    <span>{{row.pledgedAmount | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="登记日期" prop="regDate" show-overflow-tooltip></el-table-column>
            <el-table-column label="公示时间" prop="publicDate" show-overflow-tooltip />
            <el-table-column label="出质状态" prop="pledgStatus" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-title">动产抵押</div>
        <el-table stripe :data="businessData.chattelMortgage" class="br-table" border>
            <el-table-column label="登记编号" prop="registerNo" show-overflow-tooltip></el-table-column>
            <el-table-column label="登记时间" prop="registerDate" show-overflow-tooltip />
            <el-table-column label="登记机关" prop="registerOffice" show-overflow-tooltip></el-table-column>
            <el-table-column label="被保证担保债权数额" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.debtsecuredAmount | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="registerStatus" show-overflow-tooltip></el-table-column>
        </el-table>
        <childDialog ref="dialogDetail" :dialogData="dialogData"></childDialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import childDialog from "./dialog.vue";
import { Pages } from "@/components";

@Component({
    name: "BusinessInfo",
    components: {
        Pages,
        childDialog,
    },
})
export default class BusinessInfo extends Vue {
    @Prop({
        default: () => ({
            assetsData: [],
            providAassurance: [],
            partners: [],
            partnerInvest: { list: [], pageSize: 10, pageNum: 1 },
            pledge: [],
            bizInvest: { list: [], pageSize: 10, pageNum: 1 },
            chattelMortgage: [],
        }),
        type: Object,
    })
    businessData;
    currentTagIndex: number = 0;
    tags: any = [
        "资产状况",
        "对外保证担保",
        "股东及出资信息",
        "企业对外投资",
        "股东对外投资",
        "股权出质",
        "动产抵押",
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
    changePageFn(val) {
        let params = {
            pageSize: val.pageSize,
            pageNum: val.pageNum,
            queryCertain: val.flag,
        };
        this.$emit("getBusinessInfo", params);
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
