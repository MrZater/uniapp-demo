<template>
    <div>
        <content-wrapper>
            <template slot="title">
                人员矩阵配置列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="staff_matrix_set_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="组织名称" prop="orgName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建人" prop="createUser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="120" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <renderBtn code="staff_matrix_set_dets">
                                <el-button type="text" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                            </renderBtn>

                            <renderBtn code="staff_matrix_set_upd">
                                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            </renderBtn>

                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

                <!-- 新建和编辑 -->
                <AddOrUpdate ref="addOrUpdate" />
                <!-- 详情 -->
                <Detail ref="detail" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const staffMatrix = namespace("staffMatrix");
import ContentWrapper from "@/components/ContentWrapper.vue";
import AddOrUpdate from "./addOrUpdate.vue";
import Detail from "./Detail.vue";
import { Pages } from "@/components";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        AddOrUpdate,
        Detail,
        Pages,
    },
})
export default class Grid extends Vue {
    @staffMatrix.State list;
    @staffMatrix.Action queryList;
    @staffMatrix.State searchData;
    @staffMatrix.Action saveSearchDataFN;
    @staffMatrix.State loading;

    //新增
    handleAdd() {
        (this.$refs["addOrUpdate"] as AddOrUpdate).init("add", {});
    }
    // 详情
    handleDetail(row) {
        (this.$refs["detail"] as Detail).init(row);
    }
    //编辑
    handleEdit(row) {
        (this.$refs["addOrUpdate"] as AddOrUpdate).init("edit", row);
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

<style scoped lang="scss">
</style>