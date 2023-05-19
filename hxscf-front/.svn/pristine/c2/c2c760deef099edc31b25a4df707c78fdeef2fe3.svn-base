<template>
    <div>
        <content-wrapper>
            <template slot="title">
                字典列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="dic_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="字典名称" prop="value"></el-table-column>
                    <el-table-column label="字典英文名称" prop="code" min-width="90" :show-overflow-tooltip="true" />
                    <el-table-column label="字典状态" prop="disabled" min-width="100" :show-overflow-tooltip="true">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.disabled | statusClassMap" :underline="false">{{ row.disabled | statusMap }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="字典描述" prop="remark" min-width="100" :show-overflow-tooltip="true" />
                    <el-table-column label="创建日期" prop="createTime">
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <renderBtn code="dic_manage_upd">
                                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            </renderBtn>

                            <renderBtn code="dic_one_manage">
                                <el-button type="text" size="mini" @click="handleSelect(scope.row)">
                                    选项列表
                                </el-button>
                            </renderBtn>

                            <renderBtn code="dic_manage_del">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(scope)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

                <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const dictionaryManage = namespace("dictionaryManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";
import { Pages } from "@/components";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
        Pages,
    },
    filters: {
        statusMap(status) {
            const statusMap = {
                "0": "停用",
                "1": "启用",
            };
            return statusMap[status];
        },
        statusClassMap(status) {
            const classMap = {
                "0": "danger",
                "1": "success",
            };
            return classMap[status];
        },
    },
})
export default class Grid extends Vue {
    @dictionaryManage.State list;
    @dictionaryManage.Action queryList;
    @dictionaryManage.State searchData;
    @dictionaryManage.Action saveSearchDataFN;
    @dictionaryManage.Action queryDeleteUser;
    @dictionaryManage.State loading;

    @dictionaryManage.Action editListFN;
    @dictionaryManage.State searchEditData;

    dialogType = "1";
    codeFlag = null;
    dialogData: object = {
        value: "", // 字典名称
        code: "", // 字典英文名称
        disabled: "", // 字典状态
        remark: "", // 字典描述
    };
    @Watch("codeFlag")
    codeFlags(val, old) {}

    openDialog(str, objdata) {
        this.dialogType = str;
        this.dialogData = objdata;
        let $els = this.$refs["dialog"];
        $els["open"]();
    }
    //新增
    handleAdd() {
        let rowObj = {
            value: "", // 字典名称
            code: "", // 字典英文名称
            disabled: "", // 字典状态
            remark: "", // 字典描述
        };
        this.openDialog("add", rowObj);
    }
    //编辑
    handleEdit(row) {
        let rowObj = {
            id: row.id,
            value: row.value, // 字典名称
            code: row.code, // 字典英文名称
            disabled: row.disabled, // 字典状态
            remark: row.remark, // 字典描述
        };
        this.openDialog("edit", rowObj);
    }
    // 选项列表
    handleSelect(row) {
        let that = this;
        let code = row.code;
        let params = {
            dicCode: code,
            ...this.searchEditData,
        };
        this.editListFN(params);
        that.$router.push({
            path: "/system/dictionaryManage/editList",
            query: row,
        });
    }

    //删除
    handleRemove(scope) {
        this.queryDeleteUser({
            id: scope.row.id,
            code: scope.row.code,
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