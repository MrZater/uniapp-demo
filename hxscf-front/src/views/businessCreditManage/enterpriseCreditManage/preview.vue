/*
 * @Author: mingliang.zhu 
 * @Date: 2021-02-24 20:24:40 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-25 16:36:09
 */
<template>
    <el-dialog class="br-dialog" title="预览" :visible.sync="visible" width="900px" :close-on-click-modal="false">
        <div class="btn-group">
            <el-button type="primary" class="br-btn" v-print="printObj">打印</el-button>
            <el-button type="primary" class="br-btn">下载</el-button>
        </div>
        <div class="report-box" v-loading="loading" id="printMer">
            <div class="main-title">资信调查审批表

            </div>
            <table class="detail-table">
                <tr>
                    <td>资信调查组织</td>
                    <td colspan="3">{{data.bizSurveyApply.code1 || "-"}}</td>
                    <td>编号</td>
                    <td colspan="4">{{data.bizSurveyApply.surveyId || "-"}}</td>
                </tr>
                <tr>
                    <td>申请部门</td>
                    <td>{{data.bizSurveyApply.businessOrgName || "-"}}</td>
                    <td>业务人员</td>
                    <td>{{data.bizSurveyApply.businessUserName || "-"}}</td>
                    <td>企业名称</td>
                    <td colspan="4">{{data.bizSurveyApply.bizName || "-"}}</td>
                </tr>
                <tr>
                    <td>信用评分</td>
                    <td>{{data.bizSurveyApply.riskScore || "-"}}</td>
                    <td>信用等级</td>
                    <td>{{data.bizSurveyApply.riskScore || "-"}}</td>
                    <td>资信有效期</td>
                    <td colspan="4">{{data.bizSurveyApply.createTime | date}} 至 {{data.bizSurveyApply.endDate | date}}</td>
                </tr>
            </table>
            <div class="main-title">审批记录</div>
            <el-table stripe :data="data.pinionInfoList" class="br-table">
                <el-table-column label="操作时间" prop="approveTime">
                    <template slot-scope="{row}">
                        {{row.approveTime | time}}
                    </template>
                </el-table-column>
                <el-table-column label="组织名称" prop="currentOperOrganName"></el-table-column>
                <el-table-column label="操作人" prop="currentOperOneName"></el-table-column>
                <el-table-column label="审核结果" prop="approveResult">
                    <template slot-scope="{row}">
                        {{$code("approveResult",row.approveResult)}}
                    </template>
                </el-table-column>
                <el-table-column label="审核意见" prop="approveAdvise"></el-table-column>
            </el-table>
        </div>
        <div slot="footer" class="br-dialog-footer">
            <el-button class="br-btn-large" @click="visible = false">关闭</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const enterpriseCreditManage = namespace("enterpriseCreditManage");

@Component({})
export default class Dialog extends Vue {
    @enterpriseCreditManage.Action queryPreview;
    loading: boolean = false;
    visible: boolean = false;

    public printObj: any = {
        id: "printMer", //打印区域 Dom ID
        popTitle: "",
        extraCss: "https://www.google.com,https://www.google.com",
        extraHead:
            '<meta http-equiv="Content-Language"content="zh-cn"/>,<style> #printMe { width: 100%; !important;height: auto !important; } <style>', //  可以传进去  style tag 标签；注意要逗号分隔   解决特定区域不显示问题；
    };

    public data: any = {
        bizSurveyApply: {},
        pinionInfoList: [],
    };

    init(row) {
        this.loading = true;
        this.queryPreview({ surveyId: row.surveyId })
            .then((res) => {
                this.data = res;
            })
            .finally(() => (this.loading = false));
        this.visible = true;
    }
}
</script>

<style lang="scss" scoped>
// .detail-table {
//     td {
//         &:nth-child(odd) {
//             width: 72px;
//         }
//         &:nth-child(even) {
//             width: auto;
//         }
//     }
// }
.br-dialog {
    /deep/ .report-box {
        border: none;
        box-shadow: none;
        padding: 0px;
        .main-title {
            margin: 0 0 10px 0;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 4px;
            text-align: center;
            color: #606266;
        }
    }
}
.btn-group {
    position: absolute;
    right: 18px;
    top: 60px;
    z-index: 1;
}
</style>
