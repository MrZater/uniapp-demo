<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                岗位列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="post_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleAddOrUpdate">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="roleList.list" class="br-table" v-loading="loading">
                    <el-table-column label="岗位名称" prop="postName"></el-table-column>
                    <el-table-column label="创建人" prop="createUser"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="100">
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="岗位描述" prop="remark" min-width="100"></el-table-column>
                    <el-table-column label="操作" width="130">
                        <template slot-scope="scope">
                            <renderBtn code="post_manage_upd">
                                <el-button type="text" size="mini" @click="handleAddOrUpdate(scope.row)">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="post_manage_del">
                                <el-popconfirm title="确认删除该岗位吗？" @onConfirm="handleRemove(scope)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="roleList.pageNum" :pageSize="roleList.pageSize" :total="roleList.total" @changePage="changePageFn" />

                <child-dialog ref="dialog"   />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const postManage = namespace("postManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";
import { Pages } from "@/components";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
        Pages,
    },
})
export default class Grid extends Vue {
    @postManage.State roleList;
    @postManage.Action queryPostList;
    @postManage.Action queryDeleteRole;
    @postManage.State loading;
    @postManage.State saveSearch;

    //新增、编辑
    handleAddOrUpdate(row) {
        let $els: any = this.$refs["dialog"];
        $els.init(row);
    }

    //删除
    handleRemove(scope) {
        this.queryDeleteRole({ postCode: scope.row.postCode }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryPostList({ pageNum: 1, pageSize: 10, postName: "" });
        });
    }

    changePageFn(val) {
        let parame = {
            ...this.saveSearch,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };

        this.queryPostList(parame);
    }
}
</script>

<style scoped lang="scss">
</style>
