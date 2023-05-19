<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                客户风险系数列表
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="客户风险系数编号" prop="riskId" show-overflow-tooltip></el-table-column>
                    <el-table-column label="行业名称" prop="tradeName"></el-table-column>
                    <el-table-column label="组织名称" prop="orgName"></el-table-column>
                    <el-table-column label="状态" prop="apprState" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.apprState | statusFilter">{{ $code("templateStatus",row.apprState ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{ row.createTime | time }}
                        </template>
                    </el-table-column>
                    <el-table-column label="通过时间" prop="passTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{ row.passTime | time }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="330">
                        <template slot-scope="{row}">
                            <renderBtn code="customer_risk_subcheck">
                                <el-button type="text" size="mini" @click="onSubmit(row,'submit')" :disabled="!(row.apprState === '01')">提交审核</el-button>
                            </renderBtn>

                            <renderBtn code="customer_risk_resub">
                                <el-button type="text" size="mini" @click="onSubmit(row,'reSubmit')" :disabled="!(row.apprState === '05')">重新提交</el-button>
                            </renderBtn>

                            <renderBtn code="customer_risk_dets">
                                <el-button type="text" size="mini" @click="onDetail(row)">详情</el-button>
                            </renderBtn>

                            <renderBtn code="customer_risk_back">
                                <el-button type="text" size="mini" @click="onRecall(row)" :disabled="!(row.apprPhase === 'A02')">
                                    撤回
                                </el-button>
                            </renderBtn>

                            <renderBtn code="customer_risk_use">
                                <!-- :disabled="!(row.apprState === '04')" -->
                                <el-button type="text" size="mini" @click="onStart(row)" :disabled="!(row.apprState === '04')">
                                    启用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="customer_risk_stop">
                                <!-- :disabled="!(row.apprState === '03')" -->
                                <el-button type="text" size="mini" @click="onStop(row)" :disabled="!(row.apprState === '03')">
                                    停用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="customer_risk_del">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(row)">
                                    <!-- :disabled="!(row.apprState === '01')" -->
                                    <el-button type="text" size="mini" slot="reference" style="margin-left:10px">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const customRiskCoefficient = namespace("customRiskCoefficient");
import ContentWrapper from "@/components/ContentWrapper.vue";

import { Pages } from "@/components";

@Component({
    components: {
        ContentWrapper,
        Pages,
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                "01": "info", // 待送审
                "02": "", // 审核中
                "03": "success", // 生效中
                "04": "danger", // 已停用
                "05": "warning", // 已拒绝
            };
            return statusMap[status];
        },
    },
})
export default class Grid extends Vue {
    @customRiskCoefficient.State list;
    @customRiskCoefficient.Action queryList;
    @customRiskCoefficient.State searchData;
    @customRiskCoefficient.Action saveSearchDataFN;
    @customRiskCoefficient.Action queryDelete; //删除

    @customRiskCoefficient.Action queryStart; //启用
    @customRiskCoefficient.Action queryStop; //停用
    @customRiskCoefficient.State loading;

    //提交审核、重新提交
    onSubmit(row, type) {}

    // 详情
    onDetail(row) {
        this.$router.push({
            path: "/customRiskCoefficientDetail",
            name: "customRiskCoefficientDetail",
            query: {
                tradeName: row.tradeName,
                orgName: row.orgName,
                createTime: row.createTime,
                createUser: row.createUser,
                orgPcode: row.orgPcode,
                riskId: row.riskId,
                tradeKeyNo: row.tradeKeyNo,
            },
        });
    }

    // 撤回
    onRecall(row) {}

    // 启用
    onStart(row) {
        this.queryStart({
            tradeKeyNo: row.tradeKeyNo,
            riskId: row.riskId,
        }).then((msg) => {
            this.onSuccess(msg);
        });
    }

    // 停用
    onStop(row) {
        this.queryStop({
            riskId: row.riskId,
        }).then((msg) => {
            this.onSuccess(msg);
        });
    }

    //删除
    handleRemove(row) {
        this.queryDelete({
            riskId: row.riskId,
        }).then((msg) => {
            this.onSuccess(msg);
        });
    }
    onSuccess(msg) {
        this.$message({ type: "success", message: msg });
        this.queryList(this.searchData);
    }
    changePageFn(val) {
        let parame = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryList(parame);
        this.saveSearchDataFN(parame);
    }
}
</script>