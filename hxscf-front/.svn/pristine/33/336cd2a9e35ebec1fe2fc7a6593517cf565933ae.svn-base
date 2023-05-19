<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                授信通知管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="credit_notice_set_add">
                    <el-button class="br-btn" type="primary" @click="onAddOrUpdate('add')">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="roleList.list" class="br-table" v-loading="loading">
                    <el-table-column label="授信通知主题" prop="messageTitle" show-overflow-tooltip></el-table-column>
                    <el-table-column label="状态" prop="isDel" align="center" width="100px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.isDel == '1' ? 'success': 'danger'">{{ $code("costStatus",row.isDel ) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改人" prop="modifyUser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="修改时间" prop="modifyTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.modifyTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <renderBtn code="credit_notice_set_dets">
                                <el-button type="text" size="mini" @click="onAddOrUpdate('see',scope.row)">详情</el-button>
                            </renderBtn>
                            <renderBtn code="credit_notice_set_upd">
                                <el-button type="text" size="mini" @click="onAddOrUpdate('edit',scope.row)">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="credit_notice_set_use">
                                <el-button type="text" size="mini" @click="onStart(scope.row)" :disabled="scope.row.isDel == '1'">启用</el-button>
                            </renderBtn>
                            <renderBtn code="credit_notice_set_stop">
                                <el-button type="text" size="mini" @click="onStop(scope.row)" :disabled="scope.row.isDel == '0'">停用</el-button>
                            </renderBtn>

                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="roleList.pageNum" :pageSize="roleList.pageSize" :total="roleList.total" @changePage="changePageFn" />
                <child-dialog ref="dialog" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const creditNotice = namespace("creditNotice");
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";
import { Pages } from "@/components";
@Component({
    components: {
        ContentWrapper,
        childDialog,
        Pages,
    },
})
export default class Grid extends Vue {
    @creditNotice.State roleList;
    @creditNotice.Action queryNoticeList;
    @creditNotice.State loading;
    @creditNotice.Action saveSearchDataFN;
    @creditNotice.State searchData;
    @creditNotice.Action queryStart;
    @creditNotice.Action queryStop;

    //新增 编辑 详情
    onAddOrUpdate(handleType, row?: any) {
        let $els = this.$refs["dialog"];
        $els["init"](handleType, row);
    }

    // 启用
    onStart(row) {
        this.queryStart({
            keyNo: row.keyNo,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryNoticeList(this.searchData);
        });
    }
    // 停用
    onStop(row) {
        this.queryStop({
            keyNo: row.keyNo,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryNoticeList(this.searchData);
        });
    }
    changePageFn(val) {
        let params = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryNoticeList(params);
        this.saveSearchDataFN(params);
    }
}
</script>

<style scoped lang="scss">
</style>
