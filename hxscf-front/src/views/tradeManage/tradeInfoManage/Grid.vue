<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                行业信息管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="tradeInfo_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleAddOrUpdate">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="行业名称" prop="tradeName">
                        <template slot-scope="{row}">
                            <el-button type="text" size="mini" @click="handleTrade(row)">{{row.tradeName}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="组织名称" prop="orgName">
                    </el-table-column>
                    <!-- <el-table-column label="行业三方编号" prop="tradeCode" min-width="90" show-overflow-tooltip /> -->
                    <el-table-column label="资信调查模板" prop="bizsurveyModel" min-width="100" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{ $code("modelType",row.bizsurveyModel ) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="动态跟踪模板" prop="dyntrackModel" min-width="100" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{ $code("modelType",row.dyntrackModel ) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" min-width="100" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ row.createTime | time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template slot-scope="scope">
                            <renderBtn code="tradeInfo_manage_upd">
                                <el-button type="text" size="mini" @click="handleAddOrUpdate(scope.row)">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="tradeInfo_manage_cjfxxs">
                                <el-button type="text" size="mini" @click="handleCreate(scope.row)">
                                    创建风险系数
                                </el-button>
                            </renderBtn>
                            <renderBtn code="tradeInfo_manage_whtbqy">
                                <el-button type="text" size="mini" @click="handleHeader(scope.row)">
                                    维护头部企业
                                </el-button>
                            </renderBtn>
                            <renderBtn code="tradeInfo_manage_del">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(scope)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

                <child-dialog ref="dialog" />
                <headerTrade ref="headerTrade" />
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";
import headerTrade from "./headerTrade.vue";
import { Pages } from "@/components";

@Component({
    components: {
        ContentWrapper,
        childDialog,
        headerTrade,
        Pages,
    },
})
export default class Grid extends Vue {
    @tradeInfoManage.State list;
    @tradeInfoManage.Action queryList;
    @tradeInfoManage.State searchData;
    @tradeInfoManage.Action saveSearchDataFN;
    @tradeInfoManage.Action queryDeleteTrade;
    @tradeInfoManage.State loading;
    @tradeInfoManage.Action queryCheck; // 校验是否可以创建客户风险系数

    //新增编辑
    handleAddOrUpdate(row) {
        let $els: any = this.$refs["dialog"];
        $els.init(row);
    }
    // 查看行业详情
    handleTrade(row) {
        // return;
        this.$router.push({
            path: "/tradeInfoManage/tradeDetail",
            name: "tradeDetail",
            query: row,
        });
    }
    // 创建客户风险系数
    handleCreate(row) {
        let params = { orgPcode: row.orgPcode, keyNo: row.keyNo };
        this.queryCheck(params).then((res) => {
            this.$router.push({
                path: "/tradeInfoManage/createCustRiskFactor",
                name: "createCustRiskFactor",
                query: row,
            });
        });
    }

    // 维护头部企业
    handleHeader(row) {
        (this.$refs["headerTrade"] as headerTrade).init(row);
    }

    //删除
    handleRemove(scope) {
        this.queryDeleteTrade({
            keyNo: scope.row.keyNo,
            tradeCode: scope.row.tradeCode,
            tradeName: scope.row.tradeName,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList(this.searchData);
        });
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