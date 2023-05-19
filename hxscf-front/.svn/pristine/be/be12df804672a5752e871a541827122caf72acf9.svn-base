<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                资信报告记录列表
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" border v-loading="loading">
                    <el-table-column label="报告编号" prop="reportNo">
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false" @click="onOpen(row)">{{row.reportNo}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="报告来源" prop="reportSource" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleSource(row.reportSource)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="信用等级" prop="riskLevel" show-overflow-tooltip></el-table-column>
                    <el-table-column label="信用评分" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{ row.createTime | time }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="{row}">
                            <el-button type="text" size="mini" @click="onDownload(row)" :disabled="row.loading">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />
            </template>
        </ContentWrapper>
        <report-dialog ref="dialog"></report-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Message } from "element-ui";
import { namespace } from "vuex-class";
const creditReport = namespace("creditReport");
import { Pages, ContentWrapper } from "@/components";
import axios from "axios";
import ReportDialog from "./dialog.vue";
import { getStore } from "@/utils/useStore";
const baseConfig = require("../../../../../../baseConfig");

@Component({
    components: {
        ContentWrapper,
        Pages,
        ReportDialog,
    },
})
export default class Grid extends Vue {
    @creditReport.State list;
    @creditReport.Action queryList;
    @creditReport.State searchData;
    @creditReport.Action saveSearchDataFN;
    @creditReport.State loading;
    @creditReport.State reportSourceOption; // 报告来源

    changePageFn(val) {
        let { custId } = this.$route.query;
        let params = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
            custId: custId,
        };
        this.queryList(params);
        this.saveSearchDataFN(params);
    }
    // 查看报告
    onOpen(row) {
        (this.$refs["dialog"] as ReportDialog).init(row);
    }
    // 报告下载
    onDownload(row) {
        this.$set(row, "loading", true);
        let tips = Message({
            message: "请稍等，正在为您下载...",
            duration: 0,
            type: "warning",
        });

        let params = {
            reportKeyNo: row.keyNo,
        };
        let token = getStore("token") ? getStore("token") : "";
        let url = "/approve/loanFile/downLoadCreditReport";
        const instance = axios.create({ baseURL: "http://localhost:8008" });
        instance({
            url: url,
            method: "post",
            data: {
                params: params,
            },
            headers: {
                token: token,
            },
        }).then((r) => {
            if (r.data.code == 500) {
                tips.close();
                this.$message({
                    type: "error",
                    message: "下载失败：" + r.data.msg,
                });
                this.$set(row, "loading", false);
            } else {
                instance({
                    url: url,
                    method: "post",
                    data: {
                        params: params,
                    },
                    responseType: "blob",
                    headers: {
                        token: token,
                    },
                })
                    .then((r) => {
                        var filename = r.headers; //下载后文件名
                        filename = filename["content-disposition"];
                        filename = decodeURI(
                            filename.split(";")[1].split("filename=")[1]
                        );
                        let createUrl = window.URL.createObjectURL(r.data);
                        const a = document.createElement("a");
                        a.href = createUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        this.$message({ type: "success", message: "下载成功" });
                    })
                    .catch((err) => {
                        this.$message({
                            type: "error",
                            message: "下载失败：" + err,
                        });
                    })
                    .finally(() => {
                        this.$set(row, "loading", false);
                        tips.close();
                    });
            }
        })
        .catch((err) => {
            this.$message({
                type: "error",
                message: "下载失败：" + err,
            });
        })
        .finally(() => {
            tips.close();
            this.$set(row, "loading", false);
        });
    }
    // 翻译报告来源
    handleSource(code) {
        let target = this.reportSourceOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "-";
    }
}
</script>