<template>
    <div class="template-container">
        <ContentWrapper>
            <template #title>企业信息管理列表</template>
            <template #grid>
                <el-table stripe :data="data.list" class="br-table" v-loading="isLoading" border>
                    <el-table-column type="expand">
                        <template slot-scope="{row}">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="企业角色">
                                    <span>{{handleRules(row.bizRoles)}}</span>
                                </el-form-item>
                                <el-form-item label="组织名称">
                                    <span>{{ row.businessOrgPname }}</span>
                                </el-form-item>
                                <el-form-item label="业务部门">
                                    <span>{{ row.businessOrgName }}</span>
                                </el-form-item>
                                <el-form-item label="所属行业">
                                    <span>{{ row.tradeName }}</span>
                                </el-form-item>
                                <el-form-item label="创建人">
                                    <span>{{ row.createUserName }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{ row.createTime | time }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="企业名称" prop="bizName" min-width="200" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false" @click="enterprise(row)">{{row.bizName}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="统一社会信用代码" prop="creditCode" min-width="150" show-overflow-tooltip />
                    <!-- <el-table-column label="企业角色" prop="bizRoles" width="100">
                        <template slot-scope="{row}">
                            {{handleRules(row.bizRoles)}}
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="所属行业" prop="tradeKeyNo" min-width="100">
                        <template slot-scope="{row}">
                            {{row.tradeName}}
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="业务部门" prop="businessOrgName" min-width="150" show-overflow-tooltip /> -->
                    <el-table-column label="业务人员" prop="businessUserName" min-width="80" show-overflow-tooltip />
                    <el-table-column label="是否资信" prop="ifInvestFlag" min-width="80" align="center">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.ifInvestFlag=='1'?'success':'danger'">{{ $code('yesOrNo', row.ifInvestFlag) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否授信" prop="ifCreditFlag" min-width="80" align="center">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.ifCreditFlag=='1'?'success':'danger'">{{ $code('yesOrNo', row.ifCreditFlag) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否黑灰名单" prop="ifCreditFlag" min-width="80" align="center">
                        <template slot-scope="{row}">
                            <!-- <el-tag size="mini" :type="row.ifCreditFlag=='1'?'success':'danger'">否</el-tag> -->
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="创建人" prop="createUserName" min-width="150" show-overflow-tooltip /> -->
                    <!-- <el-table-column label="创建时间" prop="createTime" min-width="160">
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.createTime | time }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作" width="220">
                        <template slot-scope="{row}">
                            <renderBtn code="enterprise_info_query_upd">
                                <el-button type="text" size="mini" @click="edit(row)">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="enterprise_info_query_zxdc">
                                <el-button type="text" size="mini" @click="onSurvey(row)">资信调查</el-button>
                            </renderBtn>
                            <renderBtn code="enterprise_info_query_sxsq">
                                <el-button type="text" size="mini" @click="onApplication(row)" :disabled="row.ifInvestFlag=='0'">授信申请</el-button>
                            </renderBtn>
                            <renderBtn code="enterprise_info_query_del">
                                <el-popconfirm title="确认删除吗？" @onConfirm="del(row)">
                                    <el-button type="text" size="mini" slot="reference" :disabled="row.ifInvestFlag == '1'">删除
                                    </el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="data.pageNum" :pageSize="data.pageSize" :total="data.total" @changePage="changePageFn" />
                <AddOrUpdate ref="addOrUpdate" :dialogData="dialogData" dialogType="edit" />
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Pages } from "@/components";
import ContentWrapper from "@/components/ContentWrapper.vue";
import AddOrUpdate from "../enterpriseInfoSearch/modals/addOrUpdate.vue";

const enterpriseInfoManage = namespace("enterpriseInfoManage");

@Component({
    components: {
        ContentWrapper,
        Pages,
        AddOrUpdate,
    },
})
export default class Grid extends Vue {
    @enterpriseInfoManage.State isLoading;
    @enterpriseInfoManage.State saveSearch;
    @enterpriseInfoManage.State data;
    @enterpriseInfoManage.Action searchFN;
    @enterpriseInfoManage.Action delFN;
    @enterpriseInfoManage.Action chectCreditStandFN;
    @enterpriseInfoManage.Action checkEnterpriseLocalFN;

    public dialogData: Object = {
        bizName: "",
        creditCode: "",
        bizRoles: [],
        busOrgCode: "",
        tradeKeyNo: "",
        busUserId: "",
        ifCreditFlag: "",
        ifInvestFlag: "",
        createUser: "",
        createTime: "",
        operPaperId: "",
        operMobileNo: "",
        detailAddr: "",
        creditFlag: "",
        areaPcode: [],
    };

    handleRules(row) {
        let cancats: any = [];
        row.map((item) => {
            cancats.push(this.$code("bizRoles", item));
        });
        return cancats.join("，");
    }

    // 编辑
    async edit(row) {
        let result = await this.checkFN(row);
        if (result) {
            this.dialogData = row;
            this.$refs.addOrUpdate["open"]();
        }
    }

    checkFN(row, butType?) {
        return new Promise((resolve, reject) => {
            this.checkEnterpriseLocalFN({ custId: row.custId, butType }).then(
                (res) => {
                    if (res && res.code === "0") {
                        this.$confirm(res.message, "温馨提示", {
                            confirmButtonText: "我知道了",
                            showCancelButton: false,
                            type: "warning",
                        });
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }

    // 资信调查
    async onSurvey(row) {
        let result = await this.checkFN(row, "zx");
        if (result) {
            this.chectCreditStandFN({
                tradeKeyNo: row.tradeKeyNo,
                custId: row.custId,
                creditCode: row.creditCode,
                modelType: "02",
            }).then((res) => {
                let jump = () => {
                    this.$router.push({
                        path: "/enterpriseInfoManage/survey",
                        name: "survey",
                        query: row,
                    });
                };
                if (res.resultCode == "0") {
                    this.$confirm(res.resultMsg, "温馨提示", {
                        confirmButtonText: "我知道了",
                        showCancelButton: false,
                        type: "warning",
                    });
                } else if (res.resultCode == "1") {
                    this.$confirm(res.resultMsg, "温馨提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    }).then(() => jump());
                } else {
                    jump();
                }
            });
        }
    }

    // 授信申请
    onApplication(row) {
        // return;
        this.$router.push({
            path: "/businessPromiseManage/limit/general/addOrUpdate",
            name: "generalAddOrUpdate",
            query: {
                custId: row.custId,
                handleType: "add",
            },
        });
    }

    // 删除
    async del(row) {
        // let result = await this.checkFN(row);
        // if (result) {
        let param = { custId: row.custId, ifInvestFlag: row.ifInvestFlag };
        this.delFN(param).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.searchFN(this.saveSearch);
        });
        // }
    }

    // 企业名称
    async enterprise(row) {
        let result = await this.checkFN(row);
        if (result) {
            this.$router.push({
                path: "/enterpriseInfoDetail",
                name: "enterpriseInfoDetail",
                query: {
                    custId: row.custId || "",
                    creditCode: row.creditCode || "",
                    isCreate: "1",
                },
            });
        }
    }

    // 分页
    changePageFn(val) {
        let parame = {
            ...this.saveSearch,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.searchFN(parame);
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
    margin-left: 60px;
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
