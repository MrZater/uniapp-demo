<template>
    <div>
        <content-wrapper>
            <template slot="title">
                日志列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="log_manage_del">
                    <el-button class="br-btn" type="primary" @click="handleRemove" :disabled="(multipleSelection.length > 0 ? false : true)">删除
                    </el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column type="expand">
                        <template slot-scope="{row}">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="操作模块">
                                    <span>{{ row.operation }}</span>
                                </el-form-item>
                                <el-form-item label="请求方式">
                                    <span>{{$code('requireMet',row.requestMethod)}}</span>
                                </el-form-item>
                                <el-form-item label="操作方法">
                                    <span>{{ row.methodName }}</span>
                                </el-form-item>
                                <el-form-item label="请求地址">
                                    <span>{{ row.requestUri }}</span>
                                </el-form-item>
                                <el-form-item label="操作状态">
                                    <span><el-tag size="mini" :type="row.operState == '1' ? 'success': 'danger'">{{$code('successAndFailure',row.operState)}}</el-tag></span>
                                </el-form-item>
                                <el-form-item label="参数">
                                    <span>{{ row.requestParams }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="系统模块" prop="operation" show-overflow-tooltip />
                    <el-table-column label="操作类型" prop="operType" width="120" align="center">
                        <template slot-scope="{row}">
                            {{ $code('operType',row.operType) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人员" prop="userName" width="200" align="center" />
                    <el-table-column label="主机" prop="requestIp" width="150" align="center" />
                    <el-table-column label="操作地点" prop="operAddrs" width="150" align="center" />
                    <el-table-column label="状态" prop="operState" width="120" align="center">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.operState == '1' ? 'success': 'danger'">{{ $code('successAndFailure',row.operState) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作时间" prop="operTime" width="150">
                        <template slot-scope="{row}">{{ row.operTime | time }}</template>
                    </el-table-column>
                    <!-- <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <renderBtn code="log_manage_dets">
                                <el-button type="text" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                            </renderBtn>
                        </template>
                    </el-table-column> -->
                </el-table>
                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />
                <!-- <child-dialog ref="dialog" /> -->
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const logManage = namespace("logManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
// import childDialog from "./dialog.vue";
import { Pages } from "@/components";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        // childDialog,
        Pages,
    },
})
export default class Grid extends Vue {
    @logManage.State list;
    @logManage.Action queryList;
    @logManage.State searchData;
    @logManage.Action saveSearchDataFN;
    @logManage.Action queryDeleteUser;
    @logManage.State loading;
    multipleSelection = [];

    // 多选
    handleSelectionChange(row) {
        this.multipleSelection = row;
    }

    // 详情
    // handleDetail(row) {
    //     let data = {
    //         operation: row.operation,
    //         requestMethod: row.requestMethod,
    //         methodName: row.methodName,
    //         requestUri: row.requestUri,
    //         operState: row.operState,
    //         requestParams: row.requestParams,
    //     };
    //     let $els: any = this.$refs["dialog"];
    //     $els.init(data);
    // }

    //删除
    handleRemove() {
        let arr = this.multipleSelection.map((item: any): any => {
            return { id: item.id };
        });
        this.queryDeleteUser(arr).then((msg) => {
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
    margin-left: 108px;
    margin-right: 0;
    margin-bottom: 0;
    width: calc(100% - 130px);
    .el-form-item__content {
        .expand-collapse {
            margin-left: 5px;
        }
    }
}
</style>
