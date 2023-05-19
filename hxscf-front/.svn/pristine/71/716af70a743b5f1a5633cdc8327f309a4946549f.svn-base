<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                限额乘数配置列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="limit_multiplier_set_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="限额乘数编号" prop="limitId" show-overflow-tooltip></el-table-column>
                    <el-table-column label="组织名称" prop="orgName"></el-table-column>
                    <el-table-column label="状态" prop="apprState" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.apprState | statusFilter">{{ $code("templateStatus",row.apprState ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.createTime | time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="通过时间" prop="passTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.passTime | time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="330">
                        <template slot-scope="{row}">
                            <renderBtn code="limit_multiplier_set_subcheck">
                                <el-button type="text" size="mini" @click="onSubmit(row,'submit')" :disabled="!(row.apprState == '01' && row.apprPhase == null)">提交审核</el-button>
                            </renderBtn>

                            <renderBtn code="limit_multiplier_set_resub">
                                <el-button type="text" size="mini" @click="onSubmit(row,'reSubmit')" :disabled="!(row.apprState == '01' && row.apprPhase != null )">重新提交</el-button>
                            </renderBtn>

                            <renderBtn code="limit_multiplier_set_dets">
                                <el-button type="text" size="mini" @click="onDetail(row)" :disabled="row.apprState == '01'">详情</el-button>
                            </renderBtn>

                            <renderBtn code="limit_multiplier_set_back">
                                <el-button type="text" size="small" @click="onRecall(row)" :disabled="!(row.apprPhase === 'A01' && row.apprState === '02')" class="riskList-button"
                                    v-loading="row.loading">
                                    撤回
                                </el-button>
                            </renderBtn>

                            <renderBtn code="limit_multiplier_set_use">
                                <el-button type="text" size="mini" @click="onStart(row)" :disabled="!(row.apprState === '04')">
                                    启用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="limit_multiplier_set_stop">
                                <el-button type="text" size="mini" @click="onStop(row)" :disabled="!(row.apprState === '03')">
                                    停用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="limit_multiplier_set_del">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(row)">
                                    <el-button type="text" size="mini" slot="reference" :disabled="!(row.apprState == '01')">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

                <add-or-update ref="addOrUpdate" />
                <detail-dialog ref="detail" />
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const limitMultiplier = namespace("limitMultiplier");
import ContentWrapper from "@/components/ContentWrapper.vue";
import addOrUpdate from "./addOrUpdate.vue";
import detailDialog from "./Detail.vue";
import { Pages } from "@/components";

@Component({
    components: {
        ContentWrapper,
        addOrUpdate,
        detailDialog,
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
    @limitMultiplier.State list;
    @limitMultiplier.Action queryList;
    @limitMultiplier.State searchData;
    @limitMultiplier.Action saveSearchDataFN;
    @limitMultiplier.Action queryDelete;
    @limitMultiplier.Action queryRevoke;
    @limitMultiplier.Action queryStart;
    @limitMultiplier.Action queryStop;
    @limitMultiplier.State loading;

    //新增
    handleAdd(): void {
        let limitRatioList: any[] = [
            { riskLevel: "AAA", riskRatio: "", orgName: "" },
            { riskLevel: "AA", riskRatio: "", orgName: "" },
            { riskLevel: "A", riskRatio: "", orgName: "" },
            { riskLevel: "BBB", riskRatio: "", orgName: "" },
            { riskLevel: "BB", riskRatio: "", orgName: "" },
            { riskLevel: "B", riskRatio: "", orgName: "" },
            { riskLevel: "CCC", riskRatio: "", orgName: "" },
            { riskLevel: "CC", riskRatio: "", orgName: "" },
            { riskLevel: "C", riskRatio: "", orgName: "" },
            { riskLevel: "D", riskRatio: "", orgName: "" },
        ];
        this.onSubmit(limitRatioList, "add");
    }
    //提交审核、重新提交
    onSubmit(row, type) {
        let $el: any = this.$refs["addOrUpdate"];
        $el.initData(row, type);
    }

    // 详情
    onDetail(row) {
        let $el: any = this.$refs["detail"];
        $el.initData(row);
    }
    // 撤回
    onRecall(row) {
        this.$set(row, "loading", true);
        this.queryRevoke({
            limitId: row.limitId,
        })
            .then((msg) => {
                this.onSuccess(msg);
            })
            .finally(() => this.$set(row, "loading", false));
    }

    // 启用
    onStart(row) {
        this.queryStart({
            limitId: row.limitId,
            orgCode: row.orgCode,
        }).then((msg) => {
            this.onSuccess(msg);
        });
    }

    // 停用
    onStop(row) {
        this.queryStop({
            limitId: row.limitId,
        }).then((msg) => {
            this.onSuccess(msg);
        });
    }

    //删除
    handleRemove(row) {
        this.queryDelete({
            limitId: row.limitId,
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