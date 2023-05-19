<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                {{flag == "0"?"通用模板列表":(flag == "1"?"行业特殊信息模板列表":"行业调查模板列表") }}
            </template>
            <template slot="extra-btn">
                <renderBtn code="industry_template_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading" border>
                    <el-table-column label="模板名称" prop="modelName"></el-table-column>
                    <el-table-column label="行业" prop="tradeName" min-width="90" show-overflow-tooltip v-if="flag == '1'"></el-table-column>
                    <el-table-column label="状态" prop="apprState" width="150" align="center">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.apprState | statusFilter">{{ $code("templateStatus",row.apprState ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" min-width="150" show-overflow-tooltip />
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
                    <el-table-column label="操作" width="280">
                        <template slot-scope="{row}">
                            <renderBtn code="industry_template_subcheck">
                                <el-button type="text" size="mini" @click="onSubmit(row)" :disabled="!(row.apprState == '01' && row.apprPhase == 'A01')">提交审核</el-button>
                            </renderBtn>

                            <renderBtn code="industry_template_resub">
                                <el-button type="text" size="mini" @click="onRetrySubmit(row)" :disabled="!(row.apprState == '01' && row.apprPhase == 'A03')">重新提交</el-button>
                            </renderBtn>

                            <renderBtn code="industry_template_dets">
                                <el-button type="text" size="mini" @click="handleDetail(row)" :disabled="!(row.apprState != '01')">详情</el-button>
                            </renderBtn>

                            <renderBtn code="industry_template_back">
                                <el-button type="text" size="mini" :disabled="!(row.apprState == '02')">撤回</el-button>
                            </renderBtn>

                            <renderBtn code="industry_template_stop" v-if="row.apprState == '03'">
                                <el-button type="text" size="mini" @click="handleState(row)" :disabled="!(row.apprState == '03' || row.apprState == '04')">停用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="industry_template_use" v-else>
                                <el-button type="text" size="mini" @click="handleState(row)" :disabled="!(row.apprState == '03' || row.apprState == '04')">启用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="industry_template_del">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(row)">
                                    <el-button type="text" size="mini" slot="reference" :disabled="!(row.apprState == '01')">删除</el-button>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const credit = namespace("credit");
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
    @Prop({ default: () => ({ list: [] }), type: Object }) list;
    @credit.Action queryList;
    @credit.State searchData;
    @credit.Action saveSearchDataFN;
    @credit.Action queryTemplateStatus;
    @credit.Action queryDeleteTemplate;
    @credit.State loading;

    //新增
    handleAdd() {
        // flag==2与flag==0 ==> modelFlag=0
        let modelFlag = this.flag == "1" ? "1" : "0";
        this.$router.push({
            path: "/configManage/credit/addOrUpdate",
            query: {
                modelFlag: modelFlag,
                handleType: "add",
                modelType: this.flag === "2" ? "01" : "02",
            },
        });
    }
    //提交审核
    onSubmit(row) {
        let modelFlag = this.flag == "1" ? "1" : "0";
        this.$router.push({
            path: "/configManage/credit/addOrUpdate",
            query: {
                keyNo: row.keyNo,
                modelFlag: modelFlag,
                handleType: "edit",
                isShowLog: "0",
            },
        });
    }
    //重新提交
    onRetrySubmit(row) {
        let modelFlag = this.flag == "1" ? "1" : "0";
        this.$router.push({
            path: "/configManage/credit/addOrUpdate",
            query: {
                keyNo: row.keyNo,
                modelFlag: modelFlag,
                handleType: "edit",
                isShowLog: "1",
            },
        });
    }
    //详情
    handleDetail(row) {
        this.$router.push({
            path: "/configManage/credit/detail",
            query: {
                keyNo: row.keyNo,
                modelFlag: this.flag == "1" ? "1" : "0",
                modelType: this.flag === "2" ? "01" : "02",
            },
        });
    }
    // 启/停用
    handleState(row) {
        this.queryTemplateStatus({
            keyNo: row.keyNo,
            apprState: row.apprState == "03" ? "04" : "03",
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList({
                ...this.searchData,
                modelFlag: this.flag == "1" ? "1" : "0",
                modelType: this.flag === "2" ? "01" : "02",
            });
        });
    }
    //删除
    handleRemove(row) {
        this.queryDeleteTemplate({
            keyNo: row.keyNo,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList({
                ...this.searchData,
                modelFlag: this.flag == "1" ? "1" : "0",
                modelType: this.flag === "2" ? "01" : "02",
            });
        });
    }

    changePageFn(val) {
        let params = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
            modelFlag: this.flag == "1" ? "1" : "0",
            modelType: this.flag === "2" ? "01" : "02",
        };
        this.queryList(params);
        this.saveSearchDataFN(params);
    }
}
</script>
<style scoped lang="scss">
</style>