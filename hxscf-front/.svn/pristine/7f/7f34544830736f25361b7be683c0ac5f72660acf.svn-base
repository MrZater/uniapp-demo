<template>
    <div>
        <content-wrapper>
            <template slot="title">
                预警企业管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="enterprise_credits_manage_downform">
                    <el-button class="br-btn-large" type="danger" :disabled="(checkedRows.length > 0 ? false : true)" @click="onStartOrStop('0')">停用</el-button>
                </renderBtn>
                <renderBtn code="enterprise_credits_manage_downform">
                    <el-button class="br-btn-large" type="success" :disabled="(checkedRows.length > 0 ? false : true)" @click="onStartOrStop('1')">启用</el-button>
                </renderBtn>
                <renderBtn code="enterprise_credits_manage_export">
                    <el-upload style="display:inline-block;margin-right:10px;" name="file" :action="`/approve/customer/importDataByExcel`" :headers="{token:token}" :data="{requestData:requestData}"
                        :on-change="handleChange" :on-success="onSuccess" :file-list="fileList" :limit="1">
                        <el-button type="info" class="br-btn" accept=".xlsx,.xls">选择文件</el-button>
                    </el-upload>
                </renderBtn>
                <renderBtn code="enterprise_credits_manage_export">
                    <el-button class="br-btn" @click="onDownload">下载模板</el-button>
                </renderBtn>
                <renderBtn code="enterprise_credits_manage_downform">
                    <el-button class="br-btn-large" type="primary" @click="onAddOrUpdate">新建</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" border v-loading="loading" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="企业名称" prop="code1" min-width="150"></el-table-column>
                    <el-table-column label="组织名称" prop="code2" min-width="120"></el-table-column>
                    <el-table-column label="业务部门" prop="code3" min-width="120"></el-table-column>
                    <el-table-column label="状态" prop="code4" min-width="120">
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.code4 == '1' ? 'success': 'danger'">{{ $code('costStatus',row.code4) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" min-width="120"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="120">
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改人" prop="modifyUser" min-width="120"></el-table-column>
                    <el-table-column label="修改时间" prop="modifyTime" min-width="120">
                        <template slot-scope="{row}">
                            {{row.modifyTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template slot-scope="{row}">
                            <renderBtn code="enterprise_credits_manage_subcheck">
                                <el-button type="text" size="mini" @click="onAddOrUpdate(row)">编辑</el-button>
                            </renderBtn>
                            <renderBtn code="enterprise_credits_manage_del">
                                <el-popconfirm title="确认删除吗？" @onConfirm="onDelete(row)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="onChangePage" />
            </template>
        </content-wrapper>
        <add-or-update ref="addOrUpdate"></add-or-update>
    </div>
</template>

<script lang="ts">
import { getStore } from "@/utils/useStore";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const warnEnterprise = namespace("warnEnterprise");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";
import AddOrUpdate from "./addOrUpdate.vue";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        Pages,
        AddOrUpdate,
    },
})
export default class Grid extends Vue {
    @warnEnterprise.State list;
    @warnEnterprise.State searchData;
    @warnEnterprise.State loading;
    @warnEnterprise.Action queryList;
    @warnEnterprise.Action saveSearchDataFN;
    @warnEnterprise.Action queryDeleteFN;
    @warnEnterprise.Action queryStartOrStop;

    checkedRows = [];
    token: string = "";
    fileList: any = [];
    requestData: string = "";

    mounted() {
        this.token = getStore("token") || "";
    }

    // 多选
    handleSelectionChange(row) {
        this.checkedRows = row;
    }
    // 新增/编辑
    onAddOrUpdate(row) {
        let $els: any = this.$refs["addOrUpdate"];
        $els.init(row);
    }

    // 删除
    onDelete(row) {
        this.queryDeleteFN({ surveyId: row.surveyId }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList(this.searchData);
        });
    }
    // 页码
    onChangePage(val) {
        let parame = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryList(parame);
        this.saveSearchDataFN(parame);
    }
    // 启停用
    onStartOrStop(handleType) {
        let ids = this.checkedRows.map((item: any) => item.id);
        let params = {
            ids: ids,
            handleType: handleType,
        };
        this.queryStartOrStop(params).then((res) => {
            this.$message({ type: "success", message: res });
            this.queryList(this.searchData);
        });
    }
    // 下载
    onDownload() {
        window.location.href = `/approve/customer/export`;
    }

    onSuccess(err, file, fileList) {
        this.fileList = [];
        if (err.code === "10004") {
            this.$router.replace({ path: "/login" });
            return;
        }
        if (err.code !== "00000") {
            this.$message({ type: "error", message: err.msg });
        }
        if (err.code === "00000") {
            this.init(err.data.riskId);
        }
    }
    init(riskId) {
        this.loading = true;
        this.queryList(this.searchData);
    }
    handleChange(file) {
        const filename = file.name;
        const regs = new RegExp(".(xlsx|xls)");
        const fileNameReg = regs.test(filename);
        if (!fileNameReg) {
            this.$message({
                type: "error",
                message: "请选择.xls、.xlsx文件!",
            });
            this.fileList = [];
            return false;
        }
        const is500M = file.size / 1024 / 1024 < 500;

        if (!is500M) {
            this.$message({
                type: "error",
                message: "文件大小不能超过500M!",
            });
            this.fileList = [];
            return false;
        }
        // this.queryForm.file = file.raw;
    }
}
</script>
<style lang="scss" scoped>
</style>
