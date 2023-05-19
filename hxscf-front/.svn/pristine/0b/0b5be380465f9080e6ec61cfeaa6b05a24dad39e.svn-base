<template>
    <div>
        <content-wrapper>
            <template slot="title">
                一般授信管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="ybsx_credit_manage_export">
                    <el-button class="br-btn" type="primary" :disabled="(multipleSelection.length > 0 ? false : true)">导出</el-button>
                </renderBtn>
                <renderBtn code="ybsx_credit_manage_downform">
                    <el-button class="br-btn-large" type="primary" :disabled="(multipleSelection.length > 0 ? false : true)">下载审批表</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" border v-loading="loading" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column type="expand">
                        <template slot-scope="{row}">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="授信编号">
                                    <span>{{ row.creditId }}</span>
                                </el-form-item>
                                <el-form-item label="组织名称">
                                    <span>{{ row.orgName }}</span>
                                </el-form-item>
                                <el-form-item label="业务部门">
                                    <span>{{ row.busOrgName }}</span>
                                </el-form-item>
                                <el-form-item label="业务类型">
                                    <span>{{handleBusType(row.businessType)}}</span>
                                </el-form-item>
                                <el-form-item label="授信方式">
                                    <span>{{handleCreditType(row.creditType)}}</span>
                                </el-form-item>
                                <el-form-item label="额度种类">
                                    <span>{{ $code("quotaType",row.quotaType ) }}</span>
                                </el-form-item>
                                <el-form-item label="通过时间">
                                    <span>{{ row.passDate | time }}</span>
                                </el-form-item>
                                <el-form-item label="授信到期日">
                                    <span>{{ row.endDate | date }}</span>
                                </el-form-item>
                                <el-form-item label="创建人">
                                    <span>{{ row.createUser }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{ row.createTime | time }}</span>
                                </el-form-item>
                                <el-form-item label="修改人">
                                    <span>{{ row.modifyUser }}</span>
                                </el-form-item>
                                <el-form-item label="修改时间">
                                    <span>{{ row.modifyTime | time }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="授信编号" prop="creditId" min-width="120" /> -->
                    <el-table-column label="企业名称" prop="bizName" min-width="300">
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false" @click="enterprise(row)">{{row.bizName}}</el-link>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="组织名称" prop="org_name" min-width="120" /> -->
                    <!-- <el-table-column label="业务部门" prop="busOrgName" min-width="120" /> -->
                    <el-table-column label="信用等级" prop="riskLevel" />
                    <el-table-column label="信用评分" prop="riskScore" />
                    <el-table-column label="授信额度" prop="creditQuota" />
                    <el-table-column label="授信总额" prop="creditRental" />
                    <el-table-column label="已用总额" prop="usedRental" />
                    <el-table-column label="剩余总额" prop="laveRental" />
                    <!-- <el-table-column label="业务类型" prop="businessType" min-width="120" /> -->
                    <!-- <el-table-column label="授信方式" prop="creditType" min-width="120" /> -->
                    <!-- <el-table-column label="额度种类" prop="quotaType" min-width="120" /> -->
                    <!-- <el-table-column label="授信到期日" prop="endDate" min-width="120" /> -->
                    <el-table-column label="状态" prop="apprState" min-width="120">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.apprState | statusFilter">{{ $code("templateStatus",row.apprState ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="创建人" prop="createUser" min-width="120" /> -->
                    <!-- <el-table-column label="创建时间" prop="createTime" min-width="120" /> -->
                    <!-- <el-table-column label="通过时间" prop="passDate" min-width="120" /> -->
                    <el-table-column label="审批表" width="100">
                        <template slot-scope="{row}">
                            <renderBtn code="ybsx_credit_manage_perview">
                                <el-button type="text" size="mini">预览</el-button>
                            </renderBtn>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="320">
                        <template slot-scope="{row}">
                            <renderBtn code="ybsx_credit_manage_subcheck">
                                <!-- :disabled="!(row.apprState == '01' && row.apprPhase == 'A01')" -->
                                <el-button type="text" size="mini" @click="onEdit(row,'submit')">提交审核</el-button>
                            </renderBtn>
                            <renderBtn code="ybsx_credit_manage_resub">
                                <!-- :disabled="!(row.apprState == '01' && row.apprPhase == 'A03')" -->
                                <el-button type="text" size="mini" @click="onEdit(row,'reSubmit')">重新提交</el-button>
                            </renderBtn>
                            <renderBtn code="ybsx_credit_manage_change">
                                <el-button type="text" size="mini" @click="onEdit(row,'change')">变更</el-button>
                            </renderBtn>
                            <renderBtn code="ybsx_credit_manage_yearcareful">
                                <el-button type="text" size="mini" @click="onDetail(row,'year')">年审</el-button>
                            </renderBtn>
                            <renderBtn code="ybsx_credit_manage_dets">
                                <!-- :disabled="!(row.apprState != '01')" -->
                                <el-button type="text" size="mini" @click="onDetail(row,'detail')">详情</el-button>
                            </renderBtn>
                            <renderBtn code="ybsx_credit_manage_back">
                                <el-button type="text" size="mini" :disabled="!(row.apprState == '02')">撤回</el-button>
                            </renderBtn>
                            <renderBtn code="ybsx_credit_manage_del">
                                <el-popconfirm title="确认删除吗？" @onConfirm="onDelete(row)">
                                    <!-- :disabled="!(row.apprState == '01')" -->
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="onChangePage" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
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
    @general.State businessOption;
    @general.State creditTypeOption;
    @general.State list;
    @general.State searchData;
    @general.State loading;
    @general.Action queryList;
    @general.Action saveSearchDataFN;
    @general.Action queryDeleteFN;

    multipleSelection = [];

    // 多选
    handleSelectionChange(row) {
        this.multipleSelection = row;
    }
    // 企业名称
    enterprise(row) {
        return;
        // this.$router.push({
        //     path: "/enterpriseInfoDetail",
        //     name: "enterpriseInfoDetail",
        //     query: {
        //         custId: row.custId || "",
        //         creditCode: row.creditCode || "",
        //         isCreate: "1",
        //     },
        // });
    }
    // 业务类型
    handleBusType(code) {
        let target = this.businessOption.find((item) => item.dictCode === code);
        return target.dictName;
    }
    // 处理授信方式
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
    // 详情 年审
    onDetail(row, handleType) {
        this.$router.push({
            path: "/businessPromiseManage/limit/general/detail",
            name: "generalDetail",
            query: {
                creditId: row.creditId,
                passDate: row.passDate,
                endDate: row.endDate,
                handleType,
            },
        });
    }
    // 提交审核 重新提交 变更
    onEdit(row, handleType) {
        this.$router.push({
            path: "/businessPromiseManage/limit/general/addOrUpdate",
            name: "generalAddOrUpdate",
            query: {
                creditId: row.creditId,
                handleType,
            },
        });
    }

    // 删除
    onDelete(row) {
        this.queryDeleteFN({ creditId: row.creditId }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList(this.searchData);
        });
    }
    // 页码
    onChangePage(val) {
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
<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand /deep/label.el-form-item__label {
    width: 75px;
    color: #99a9bf;
    font-size: 12px;
}
.demo-table-expand /deep/ .el-form-item {
    margin-left: 112px;
    margin-right: 0;
    margin-bottom: 0;
    width: 400px;
    .el-form-item__content {
        .expand-collapse {
            margin-left: 5px;
        }
    }
}
</style>
