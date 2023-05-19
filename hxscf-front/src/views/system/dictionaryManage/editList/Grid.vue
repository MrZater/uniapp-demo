<template>
    <div>
        <content-wrapper>
            <template slot="title">
                选项列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="user_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="editList ? editList.list : []" class="br-table" v-loading="editLoading">
                    <el-table-column label="选项名称" prop="dictName" />
                    <el-table-column label="选项英文名" prop="dictCode" min-width="90" :show-overflow-tooltip="true" />
                    <el-table-column label="选项排序" prop="orders" min-width="100" :show-overflow-tooltip="true" />
                    <el-table-column label="选项状态" prop="disabled" min-width="100" :show-overflow-tooltip="true">
                        <template slot-scope="{row}">
                            <el-link :type="row.disabled | statusClassMap" :underline="false">
                                <el-link :type="row.disabled | statusClassMap" :underline="false">{{ row.disabled | statusMap }}</el-link>
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="选项描述" prop="remark" />
                    <el-table-column label="创建日期" prop="createTime">
                        <template slot-scope="{row}">{{row.createTime | date}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <renderBtn code="user_manage_upd">
                                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="editList.pageNum" :pageSize="editList.pageSize" :total="editList.total" @changePage="changePageFn" />

                <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
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
    @dictionaryManage.State editList;
    @dictionaryManage.Action editListFN;
    @dictionaryManage.Action saveEditSearchDataFN;
    @dictionaryManage.State editLoading;
    @dictionaryManage.State searchEditData;

    dialogType = "1";
    dialogData: object = {
        dictName: "", // 登录名
        dictCode: "", // 真实姓名
        remark: "",
        disabled: "",
        orders: "",
        dicCode: "",
    };
    code: any = "";

    openDialog(str, objdata) {
        this.dialogType = str;
        this.dialogData = objdata;
        let $els = this.$refs["dialog"];
        $els["open"]();
    }

    //新增
    handleAdd() {
        let rowObj = {
            dicCode: this.$route.query.code,
            dictName: "", // 登录名
            dictCode: "", // 真实姓名
            remark: "",
            disabled: "",
            orders: "",
        };
        this.openDialog("add", rowObj);
    }

    //编辑
    handleEdit(row) {
        let rowObj = {
            dicCode: this.$route.query.code,
            dictName: row.dictName, // 登录名
            dictCode: row.dictCode, // 真实姓名
            remark: row.remark,
            disabled: row.disabled,
            orders: row.orders,
        };
        this.openDialog("edit", rowObj);
    }

    changePageFn(val) {
        let parame = {
            ...this.searchEditData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.editListFN(parame);
        this.saveEditSearchDataFN(parame);
    }
}
</script>