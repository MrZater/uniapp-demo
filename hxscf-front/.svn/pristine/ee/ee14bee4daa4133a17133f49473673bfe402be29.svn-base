<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                角色列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="role_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="roleList.list" class="br-table" v-loading="loading">
                    <el-table-column label="角色名称" prop="roleName"></el-table-column>
                    <el-table-column label="描述" prop="remark" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createTime">
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="最后修改用户" prop="modifyUser"></el-table-column>
                    <el-table-column label="最后修改时间" prop="modifyTime">
                        <template slot-scope="{row}">
                            {{row.modifyTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="130">
                        <template slot-scope="scope">
                            <renderBtn code="role_manage_upd">
                                <el-button type="text" size="mini" @click="handleClick(scope.row,'edit')">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="role_manage_dets">
                                <el-button type="text" size="mini" @click="handleClick(scope.row,'see')">查看</el-button>
                            </renderBtn>
                            <renderBtn code="role_manage_del">
                                <el-popconfirm title="确认删除该角色吗？" @onConfirm="handleRemove(scope)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>

                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="roleList.pageNum" :pageSize="roleList.pageSize" :total="roleList.total" @changePage="changePageFn" />
                <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const roleManage = namespace("roleManage");
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
    @roleManage.State roleList;
    @roleManage.State allResourceList;
    @roleManage.Action queryRoleList;
    @roleManage.Action queryResourceTreeList;
    @roleManage.Action queryAllResource;
    @roleManage.Action queryDeleteRole;
    @roleManage.State loading;
    @roleManage.Action saveSearchDataFN;
    @roleManage.State searchData;

    checkDataArry: any[] = [];
    dialogType = "1";
    dialogData: object = {
        roleName: "",
        remark: "",
    };
    openDialog(str, objdata) {
        this.dialogType = str;
        this.dialogData = objdata;

        let $els = this.$refs["dialog"];
        $els["open"]();
    }
    //新增
    handleAdd() {
        let rowObj = {
            roleInfo: {
                roleName: "",
                remark: "",
            },
            authInfo: {},
            orgInfo: { orgList: [] },
        };
        this.openDialog("add", rowObj);
    }
    //编辑edit  查看 see
    handleClick(row, type) {
        let rowObj = {
            roleInfo: {
                roleCode: row.roleCode,
                roleName: row.roleName,
                remark: row.remark,
            },
            authInfo: {},
            orgInfo: { orgList: [] },
        };
        this.openDialog(type, rowObj);
    }

    //删除
    handleRemove(scope) {
        this.queryDeleteRole({ roleCode: scope.row.roleCode }).then((msg) => {
            this.$message({ type: "success", message: msg });
            this.queryRoleList(this.searchData);
        });
    }
    changePageFn(val) {
        let params = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryRoleList(params);
        this.saveSearchDataFN(params);
    }
}
</script>

<style scoped lang="scss">
</style>
