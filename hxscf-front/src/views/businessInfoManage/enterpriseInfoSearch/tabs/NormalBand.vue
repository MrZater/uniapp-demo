<template>
    <div>
        <div class="point-group">
            <el-button v-for="(item,index) in tags" class="model-button" size="mini" :type="index==currentTagIndex ? 'primary' : ''" :key="index" @click="goToAnchor(index)">
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
        <!-- <div class="sub-gap"></div>
        <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small" v-if="$route.query.isCreate =='1'">
            <el-form-item class="br-form-item-label" label="案件类型" prop="caseType">
                <el-select v-model="formParams.caseType" placeholder="请选择案件类型" class="br-select">
                    <el-option v-for="(item,index) in $select('caseReasonType')" :key="index" :value="item.value" :label="item.text"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="审判时间" prop="time">
                <el-date-picker v-model="formParams.time" class="br-datepicker-large" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始审判时间"
                    end-placeholder="结束审判时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                <el-button class="br-btn template-reset-btn" @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form> -->
        <el-table stripe :data="data.hxcourtcpws" class="br-table" border>
            <!-- <el-table-column label="裁判文书ID" prop="cpwsId" show-overflow-tooltip></el-table-column> -->
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
            <!-- <el-table-column label="法院公告ID" prop="fyggId" show-overflow-tooltip /> -->
            <el-table-column label="公告类型" prop="ggType" show-overflow-tooltip />
            <el-table-column label="姓名" prop="pname" show-overflow-tooltip />
            <el-table-column label="发布时间" prop="sortTimeString" show-overflow-tooltip />
            <el-table-column label="法院名称" prop="courtName" show-overflow-tooltip></el-table-column>
            <el-table-column label="标题" prop="caseTitle" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" @click="handleDetail(row.caseBody)">内容概要</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-title">开庭公告</div>
        <el-table stripe :data="data.hxcourtktgg" class="br-table" border>
            <!-- <el-table-column label="开庭公告ID" prop="ktggId" show-overflow-tooltip /> -->
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
        <childDialog ref="dialogDetail" :dialogData="dialogData" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import childDialog from "./dialog.vue";
@Component({
    name: "NormalBand",
    components: {
        childDialog,
    },
})
export default class NormalBand extends Vue {
    @Prop({ default: () => ({}), type: Object }) data;

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
    // formParams: any = {
    //   caseType: '',
    //   time: []
    // }
    public dialogData = "";
    mounted() {
        this.$nextTick(() => {
            this.nodeLists = this.$el.querySelectorAll(".sub-title");
        });
    }

    goToAnchor(index) {
        this.currentTagIndex = index;
        this.nodeLists[index].scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐
        });
    }

    // search() {
    //     let { caseType, time } = this.formParams;
    //     let [beginDate, endDate] = this.formParams.time;
    //     let params = {
    //         caseType: caseType,
    //         beginDate: beginDate || "",
    //         endDate: endDate || "",
    //         flag: "hxcourtcpws",
    //     };
    //     this.getNormalBand(params);
    // }

    resetForm(formName) {
        let oDom: any = this.$refs[formName];
        oDom.resetFields();
    }
    dialogFN(val) {
        this.$refs.dialogDetail["open"]();
        this.dialogData = val;
    }
    handleDetail(row) {
        this.dialogFN(row);
    }
}
</script>

<style scoped lang="scss">
.w100 {
    width: 100%;
}

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

.detail_content {
    background: #edf5ff;
}
</style>
