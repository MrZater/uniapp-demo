<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                客户风险系数记录列表
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading" border>
                    <el-table-column label="客户风险系数编号" prop="riskId">
                        <template slot-scope="{row}">
                            <el-button type="text" size="mini" @click="handleDetail(row)">{{row.riskId}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="行业等级" prop="riskLevel" show-overflow-tooltip></el-table-column>
                    <el-table-column label="行业评分" prop="riskScore" show-overflow-tooltip></el-table-column>
                    <el-table-column label="状态" prop="apprState" align="center">
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
                </el-table>
                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const customRiskCoefficientRecord = namespace("customRiskCoefficientRecord");
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
    @customRiskCoefficientRecord.Action queryList;
    @customRiskCoefficientRecord.State list;
    @customRiskCoefficientRecord.State searchData;
    @customRiskCoefficientRecord.Action saveSearchData;
    @customRiskCoefficientRecord.State loading;

    //详情
    handleDetail(row) {
        this.$router.push({
            path: "/customRiskCoefficientDetail",
            name: "customRiskCoefficientDetail",
            query: {
                cacheRouteQuery: JSON.stringify(this.$route.query),
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

    changePageFn(val) {
        let params = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryList(params);
        this.saveSearchData(params);
    }
}
</script>
<style scoped lang="scss">
.template-container .template-content {
    padding: 0px;
}
</style>