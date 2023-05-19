<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                流程配置列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="finance_process_set_add">
                    <el-button class="br-btn table-extra-button" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table :data="s_data.list" class="br-table" v-loading="s_loading">
                    <el-table-column label="序号" type="index" width="50"></el-table-column>
                    <el-table-column label="流程类型" prop="activitetype" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{getNameByCode(row.activitetype)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="组织名称" prop="orgName" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="流程编号" prop="activitecode" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="流程名称" prop="activitename" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建人" prop="createuser" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createtime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{(row.createtime ? row.createtime : '') | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改人" prop="modifyuser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="修改时间" prop="modifytime" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ (scope.row.modifytime ? scope.row.modifytime : '') | time }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <renderBtn code="finance_process_set_upd">
                                <el-button size="mini" @click="handleEdit(scope.row,'edit')" type="text">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="finance_process_set_stop" v-if="scope.row.isdel == '1'">
                                <el-button size="mini" @click="handleEdit(scope.row,'stop')" type="text">停用</el-button>
                            </renderBtn>
                            <renderBtn code="finance_process_set_use" v-if="scope.row.isdel == '0'">
                                <el-button size="mini" @click="handleEdit(scope.row,'use')" type="text">启用</el-button>
                            </renderBtn>
                            <renderBtn code="finance_process_set_del">
                                <el-button size="mini" @click="handleRemove(scope.row)" type="text">删除</el-button>
                            </renderBtn>
                            <renderBtn code="finance_process_set_def">
                                <el-button size="mini" @click="handleSetProcess(scope.row)" type="text">定义流程</el-button>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="s_data.pageNum" :pageSize="s_data.pageSize" :total="s_data.total" @changePage="paginationd" />
                <processControlDialog ref="processControlDialog" :dialogDataByProps="dialogDataByProps" :dialogStaus="dialogStaus"></processControlDialog>
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ContentWrapper from "@/components/ContentWrapper.vue";
import processControlDialog from "./processControlDialog.vue";
import { Pages } from "@/components";

const processControl = namespace("processControl");
@Component({
    components: {
        ContentWrapper,
        processControlDialog,
        Pages,
    },
})
export default class Grid extends Vue {
    @processControl.State s_data;
    @processControl.Action processControlListFN;
    @processControl.Action processControlCreateFN;
    @processControl.Action processControlOptFN;
    @processControl.Action queryCreateProcessSettingFN;
    @processControl.State s_searchData;
    @processControl.State s_loading;
    @processControl.State m_selectList;
    @processControl.Action startFN;
    @processControl.Action stopFN;
    dialogStaus = "1";
    dialogDataByProps: object = {};

    // 弹窗
    openDialog(str, objdata) {
        this.dialogStaus = str;
        this.dialogDataByProps = objdata;
        let $els = this.$refs["processControlDialog"];
        $els["open"]();
    }

    //添加
    handleAdd() {
        this.processControlCreateFN({}).then((data) => {
            this.openDialog("1", {
                activitecode: data.activitecode,
                pagetype: "insert",
                orgName: "",
            });
        });
    }

    //编辑
    handleEdit(row, type) {
        if (type == "edit") {
            this.openDialog("2", { ...row, pagetype: "update" });
        } else if (type == "use") {
            this.startFN({ activitecode: row.activitecode });
            this.processControlListFN(this.s_searchData);
        } else {
            this.stopFN({ activitecode: row.activitecode });
            this.processControlListFN(this.s_searchData);
        }
    }

    //删除
    handleRemove(row) {
        this.$confirm("您确定要删除当前流程配置吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.processControlOptFN({
                    activitecode: row.activitecode,
                    pagetype: "delete",
                }).then((msg) => {
                    this.$message({
                        type: "success",
                        message: msg,
                    });
                    this.processControlListFN(this.s_searchData);
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消",
                });
            });
    }

    handleSetProcess(row) {
        //   定义流程
        this.queryCreateProcessSettingFN({
            activitecode: row.activitecode,
        }).then((data) => {
            if (!data.activitetempid) {
                //创建流程
                this.$router.push({
                    path: "/system/processControl/processControlSeting",
                    query: {
                        orgCode: row.orgcode,
                        activitecode: row.activitecode,
                        activitedesc: row.activitedesc,
                        activitename: row.activitename,
                        type: "create",
                    },
                });
            } else {
                this.$router.push({
                    path: "/system/processControl/processControlSeting",
                    query: {
                        orgCode: row.orgcode,
                        activitecode: row.activitecode,
                        activitedesc: row.activitedesc,
                        activitename: row.activitename,
                        activitetempid: row.activitetempid,
                        type: "edit",
                    },
                });
            }
        });
    }

    /*-------start[分页]-------*/
    paginationd(val) {
        // 分页组件数据子传父
        this.processControlListFN({ ...this.s_searchData, ...val });
    }
    /*-------end[分页]-------*/

    getNameByCode(code) {
        let item = this.m_selectList.find((item) => item.dictCode === code);
        return item ? item.dictName : "---";
    }
}
</script>

<style scoped lang="less">
</style>
