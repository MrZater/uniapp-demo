<template>
    <B-dialog title="详情" :visible="dialogVisible" width="1100px" @close="close" :destroy-on-close="true">
        <div v-loading="loading">
            <div class="point-group">
                <el-button v-for="(item,index) in tags" class="model-button" size="mini" :type="index == currentTagIndex ? 'primary' : ''" :key="index" @click="goToAnchor(index)">
                    {{ item }}
                </el-button>
            </div>
            <div class="sub-gap"></div>
            <div class="sub-title">执行公告</div>
            <el-table stripe :data="data.hxcourtzxgg" class="br-table" border>
                <el-table-column label="姓名" prop="pname" />
                <el-table-column label="身份证号码" prop="idCardNo" show-overflow-tooltip />
                <el-table-column label="案号" prop="caseNo" show-overflow-tooltip />
                <el-table-column label="立案时间" prop="sortTimeString" show-overflow-tooltip />
                <el-table-column label="执行法院" prop="courtName" show-overflow-tooltip />
                <el-table-column label="标题" prop="caseTitle" show-overflow-tooltip />
                <el-table-column label="执行标的（元）" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <span>{{ row.execMoney | money }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="案件状态" prop="caseState" show-overflow-tooltip />
                <el-table-column label="操作" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="handleDetail(row.caseBody)">内容概要</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-title">失信公告</div>
            <el-table stripe :data="data.hxcourtsxgg" class="br-table" border>
                <el-table-column label="姓名" prop="pname" show-overflow-tooltip />
                <el-table-column label="身份证号码" prop="idCardNo" show-overflow-tooltip />
                <el-table-column label="案号" prop="caseNo" show-overflow-tooltip />
                <el-table-column label="立案时间" prop="sortTimeString" show-overflow-tooltip />
                <el-table-column label="执行法院" prop="courtName" show-overflow-tooltip />
                <el-table-column label="做出执行依据单位" prop="execYjdw" show-overflow-tooltip />
                <el-table-column label="操作" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="handleDetail(row.shixinLxqk)">履行情况</el-button>
                        <el-button type="text" @click="handleDetail(row.shixinJtqx)">具体情形</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-title">裁判文书</div>
            <el-table stripe :data="data.hxcourtcpws" class="br-table" border>
                <el-table-column label="案件类型" prop="caseType" show-overflow-tooltip></el-table-column>
                <el-table-column label="审结时间" prop="sortTimeString" show-overflow-tooltip />
                <el-table-column label="审理程序" prop="trialProcedure" show-overflow-tooltip></el-table-column>
                <el-table-column label="法院名称" prop="courtName" show-overflow-tooltip></el-table-column>
                <el-table-column label="标题" prop="caseTitle" show-overflow-tooltip></el-table-column>
                <el-table-column label="案号" prop="caseNo" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="handleDetail(row.caseCause)">案由</el-button>
                        <el-button type="text" @click="handleDetail(row.judgeResult)">判决结果</el-button>
                        <el-button type="text" @click="handleDetail(row.cpwsYiju)">依据</el-button>
                        <el-button type="text" @click="handleDetail(row.caseBody)">内容概要</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-title">法院公告</div>
            <el-table stripe :data="data.hxcourtfygg" class="br-table" border>
                <el-table-column label="公告类型" prop="ggType" show-overflow-tooltip />
                <el-table-column label="姓名" prop="pname" show-overflow-tooltip />
                <el-table-column label="发布时间" prop="sortTimeString" show-overflow-tooltip />
                <el-table-column label="法院名称" prop="courtName" show-overflow-tooltip></el-table-column>
                <el-table-column label="标题" prop="caseTitle" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="handleDetail(row.caseBody)">内容概要</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-title">开庭公告</div>
            <el-table stripe :data="data.hxcourtktgg" class="br-table" border>
                <el-table-column label="案号" prop="caseNo" show-overflow-tooltip />
                <el-table-column label="开庭时间" prop="sortTimeString" show-overflow-tooltip />
                <el-table-column label="法院名称" prop="courtName" show-overflow-tooltip />
                <el-table-column label="原告" prop="plainTiff" show-overflow-tooltip />
                <el-table-column label="操作" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="handleDetail(row.caseCause)">案由</el-button>
                        <el-button type="text" @click="handleDetail(row.caseBody)">内容概要</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-title">限制最高消费</div>
            <el-table stripe :data="data.hxcourtxzxf" class="br-table" border>
                <el-table-column label="案号" prop="elxgCaseCode" show-overflow-tooltip />
                <el-table-column label="性别" prop="elxgSexName" show-overflow-tooltip />
                <el-table-column label="年龄" prop="elxgAge" show-overflow-tooltip />
                <el-table-column label="执行法院" prop="elxgCourtName" show-overflow-tooltip />
                <el-table-column label="地域名称" prop="elxgAreaName" show-overflow-tooltip />
                <el-table-column label="发布时间" prop="elxgPublishDate" show-overflow-tooltip />
                <el-table-column label="立案时间" prop="elxgRegDate" show-overflow-tooltip />
            </el-table>

        </div>
        <template slot="footer">
            <el-button class="br-btn-large" @click="close">关 闭</el-button>
        </template>
        <Remark ref="remark" :dialogData="dialogData" />
    </B-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const enterpriseInfoManage = namespace("enterpriseInfoManage");
import { BDialog } from "@/components";

import Remark from "./remark.vue";

@Component({
    components: {
        BDialog,
        Remark,
    },
})
export default class Dialog extends Vue {
    @enterpriseInfoManage.Action queryAffiPersonDetails;
    public dialogVisible: boolean = false;
    public loading: boolean = false;
    public data: any = {
        hxcourtzxgg: [],
        hxcourtsxgg: [],
        hxcourtcpws: [],
        hxcourtfygg: [],
        hxcourtxzxf: [],
    };
    currentTagIndex: number = 0;
    tags: any = [
        "执行公告",
        "失信公告",
        "裁判文书",
        "法院公告",
        "开庭公告",
        "限制最高消费",
    ];
    nodeLists: any = [];

    public dialogData = "";

    goToAnchor(index) {
        this.currentTagIndex = index;
        this.nodeLists[index].scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐
        });
    }

    handleDetail(row) {
        this.$refs.remark["open"]();
        this.dialogData = row;
    }
    initData(params) {
        this.dialogVisible = true;
        this.$nextTick(() => {
            this.nodeLists = this.$el.querySelectorAll(".sub-title");
        });
        this.loading = true;
        this.queryAffiPersonDetails(params)
            .then((res) => {
                this.data = res;
            })
            .finally(() => (this.loading = false));
    }
    close() {
        this.data = {};
        this.dialogVisible = false;
    }
}
</script>
<style scoped lang="scss">
.point-group {
    background: #edf5ff;
    padding: 0px 18px;
    height: 60px;
    line-height: 60px;

    .model-button:not(:first-child) {
        margin-left: 10px;
        margin-bottom: 10px;
    }
}
</style>
