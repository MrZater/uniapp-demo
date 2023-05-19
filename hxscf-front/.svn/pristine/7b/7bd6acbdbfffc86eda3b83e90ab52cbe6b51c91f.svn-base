<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                {{flag === "0"?'一般授信记录列表':'临时授信记录列表'}}
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" border v-loading="loading">
                    <el-table-column label="授信编号" prop="creditId" width="180x" v-if="flag === '0'">
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false">{{row.creditId}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="临时授信编号" prop="surveyId" v-else>
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false">{{row.surveyId}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="信用等级" prop="riskLevel" show-overflow-tooltip />
                    <el-table-column label="信用评分" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="授信额度" prop="creditQuota" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.creditQuota | money }}
                        </template>
                    </el-table-column>
                    <el-table-column label="授信总额" prop="creditRental" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.creditRental | money }}
                        </template>
                    </el-table-column>
                    <el-table-column label="已用总额" prop="usedRental" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.usedRental | money }}
                        </template>
                    </el-table-column>
                    <el-table-column label="剩余总额" prop="laveRental" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.laveRental | money }}
                        </template>
                    </el-table-column>
                    <el-table-column label="业务类型" prop="businessType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleBus(row.businessType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="授信方式" prop="creditType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleCreditType(row.creditType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="额度种类" prop="quotaType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{$code('quotaType',row.quotaType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="授信到期日" prop="endDate" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.endDate | time }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="状态" prop="apprState" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.apprState | statusFilter">{{ $code("templateStatus",row.apprState ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" show-overflow-tooltip />
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const creditExten = namespace("creditExten");
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
    @Prop({ type: String }) flag;
    @creditExten.State list;
    @creditExten.Action queryList;
    @creditExten.State searchData;
    @creditExten.Action saveSearchDataFN;
    @creditExten.State loading;
    @creditExten.State businessOption; // 业务类型
    @creditExten.State creditTypeOption; // 授信方式

    handleBus(code) {
        let target = this.businessOption.find((item) => item.dictCode === code);
        return target ? target.dictName : "";
    }

    handleCreditType(arr) {
        if (arr && arr instanceof Array) {
            let list: any = [];
            arr.map((code) => {
                let target = this.creditTypeOption.find(
                    (sub) => sub.dictCode === code
                );
                list.push(target.dictName);
            });
            return list.join("，");
        }
    }

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