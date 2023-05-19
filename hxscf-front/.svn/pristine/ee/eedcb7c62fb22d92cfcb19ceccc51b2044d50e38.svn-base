<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                资信记录列表
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" border v-loading="loading">
                    <el-table-column label="资信编号" prop="surveyId">
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false">{{row.surveyId}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="信用等级" prop="riskLevel" show-overflow-tooltip></el-table-column>
                    <el-table-column label="信用评分" prop="riskScore" show-overflow-tooltip />

                    <el-table-column label="状态" prop="apprState" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.apprState | statusFilter">{{ $code("templateStatus",row.apprState ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUserName" show-overflow-tooltip />
                    <el-table-column label="通过时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.createTime | time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="资信到期日" prop="endDate" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.endDate | time }}</span>
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
const creditStand = namespace("creditStand");
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
    @creditStand.State list;
    @creditStand.Action queryList;
    @creditStand.State searchData;
    @creditStand.Action saveSearchDataFN;
    @creditStand.State loading;

    changePageFn(val) {
        let { custId } = this.$route.query;
        let params = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
            custId: custId,
        };
        this.queryList(params);
        this.saveSearchDataFN(params);
    }
}
</script>