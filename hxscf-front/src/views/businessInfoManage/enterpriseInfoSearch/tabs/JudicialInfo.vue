
<template>
    <div>
        <div class="point-group">
            <el-button v-for="(item,index) in tags" class="model-button" size="mini" :type="index==currentTagIndex ? 'primary' : ''" :key="index" @click="goToAnchor(index)">
                {{item}}
            </el-button>
        </div>
        <div class="sub-gap"></div>
        <div class="sub-title">企业被执行</div>
        <el-table stripe :data="data.executor.list" class="br-table" border>
            <el-table-column label="案号" prop="caseNo" show-overflow-tooltip />
            <el-table-column label="执行法院名称" prop="courtName" show-overflow-tooltip />
            <el-table-column label="组织机构代码" prop="orgNo" show-overflow-tooltip />
            <el-table-column label="执行依据案号" prop="executorDependDocumentno" show-overflow-tooltip />
            <el-table-column label="立案时间" prop="registerTime" show-overflow-tooltip />
            <el-table-column label="标的金额" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.executorMoney | money}}</span>
                </template>
            </el-table-column>
        </el-table>
        <Pages :pageNum="data.executor.pageNum" :pageSize="data.executor.pageSize" :total="data.executor.total" @changePage="changePage" flag="executor" />
        <div class="sub-gap"></div>
        <div class="sub-title">企业失信被执行</div>
        <el-table stripe :data="data.uncreditexecutor.list" class="br-table" border>
            <el-table-column label="案号" prop="caseNo" show-overflow-tooltip />
            <el-table-column label="公司名称" prop="bizName" show-overflow-tooltip />
            <el-table-column label="法定代表人" prop="operName" show-overflow-tooltip />
            <el-table-column label="执行单位" prop="courtName" show-overflow-tooltip />
            <el-table-column label="执行依据案号" prop="executorDependDocumentno" show-overflow-tooltip />
            <el-table-column label="立案时间" prop="registerTime" show-overflow-tooltip />
            <el-table-column label="发布时间" prop="publishTime" show-overflow-tooltip />
            <el-table-column label="作出执行依据单位" prop="gistUnit" show-overflow-tooltip />
            <el-table-column label="已履行部分" prop="fulfillPart" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.fulfillPart | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="未履行部分" prop="unfulfillPart" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.unfulfillPart | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="160">
                <template slot-scope="{row}">
                    <el-button type="text" @click="handleDetail(row.legalDuty)">文书确定的法律义务</el-button>
                    <el-button type="text" @click="handleDetail(row.fulfillPerformance)">履行情况</el-button>
                    <el-button type="text" @click="handleDetail(row.disruptLegalType)">具体情形</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pages :pageNum="data.uncreditexecutor.pageNum" :pageSize="data.uncreditexecutor.pageSize" :total="data.uncreditexecutor.total" @changePage="changePage" flag="uncreditexecutor" />
        <div class="sub-gap"></div>
        <div class="sub-title">裁判文书</div>
        <!-- <el-form :inline="true" :model="queryForm" label-width="65px" ref="searchForm" size="small" v-if="isCreate == 1">
            <el-form-item class="br-form-item-label" label="案由类型" prop="caseReasonType">
                <el-select v-model="queryForm.caseReasonType" placeholder="请选择案由类型" class="br-select">
                    <el-option v-for="(item,index) in $select('caseReasonType')" :key="index" :value="item.value" :label="item.text"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="是否原告" prop="isProsecutor">
                <el-select v-model="queryForm.isProsecutor" placeholder="请选择是否原告" class="br-select">
                    <el-option v-for="(item,index) in $select('isProsecutorType')" :key="index" :value="item.value" :label="item.text"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="审判时间" prop="time">
                <el-date-picker v-model="queryForm.time" class="br-datepicker-large" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始审判时间"
                    end-placeholder="结束审判时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                <el-button class="br-btn template-reset-btn" @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form> -->
        <el-table stripe :data="data.judgmentdoc.list" class="br-table" border>
            <el-table-column label="裁判文书编号" prop="caseNo" show-overflow-tooltip />
            <el-table-column label="裁判文书类型" prop="caseType" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{$code('caseReasonType',row.caseType)}}
                </template>
            </el-table-column>
            <el-table-column label="案由类型" prop="caseReasonType" show-overflow-tooltip></el-table-column>
            <el-table-column label="审判时间" prop="updateDate" show-overflow-tooltip />
            <el-table-column label="执行法院" prop="courtName" show-overflow-tooltip />
            <el-table-column label="裁判文书名字" prop="caseName" show-overflow-tooltip />
            <el-table-column label="案件金额" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.caseAmount | money}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否原告" prop="isProsecutor" width="120px" align="center">
                <template slot-scope="{row}">
                    <el-tag size="mini" :type="row.isProsecutor == 'true' ? 'success': 'danger'">{{$code('isProsecutorType',row.isProsecutor)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="涉案人员角色" prop="caseRole" show-overflow-tooltip></el-table-column>
            <el-table-column label="案由" width="80">
                <template slot-scope="{row}">
                    <el-link type="primary" :underline="false" @click="handleDetail(row.caseReason)">详情</el-link>
                </template>
            </el-table-column>
        </el-table>
        <Pages :pageNum="data.judgmentdoc.pageNum" :pageSize="data.judgmentdoc.pageSize" :total="data.judgmentdoc.total" @changePage="changePage" flag="judgmentdoc" />
        <div class="sub-gap"></div>
        <div class="sub-title">开庭公告</div>
        <el-table stripe :data="data.openannounce.list" class="br-table" border>
            <!-- <el-table-column label="开庭公告ID" prop="ktggId" show-overflow-tooltip /> -->
            <el-table-column label="案号" prop="caseNo" show-overflow-tooltip />
            <el-table-column label="开庭时间" prop="sortTime" show-overflow-tooltip />
            <el-table-column label="法院名称" prop="courtName" show-overflow-tooltip></el-table-column>
            <el-table-column label="原告" prop="plainTiff" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="{row}">
                    <el-button type="text" @click="handleDetail(row.caseCause)">案由</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pages :pageNum="data.openannounce.pageNum" :pageSize="data.openannounce.pageSize" :total="data.openannounce.total" @changePage="changePage" flag="openannounce" />
        <childDialog ref="dialogDetail" :dialogData="dialogData" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const enterpriseInfoSearch = namespace("enterpriseInfoSearch");
import { Pages } from "@/components";
import childDialog from "./dialog.vue";

@Component({
    name: "JudicialInfo",
    components: {
        Pages,
        childDialog,
    },
})
export default class JudicialInfo extends Vue {
    // @Prop(String) isCreate;
    // @enterpriseInfoSearch.State judgmentdoc;
    // @enterpriseInfoSearch.State executor;
    // @enterpriseInfoSearch.State uncreditexecutor;
    // @enterpriseInfoSearch.State openannounce;
    @Prop({ default: () => ({}), type: Object }) data;

    currentTagIndex: number = 0;
    public isCreate: any = "";
    tags: any = ["企业被执行", "企业失信被执行", "裁判文书", "开庭公告"];
    nodeLists: any = [];
    // queryForm: any = {
    //     caseReasonType: "",
    //     isProsecutor: "",
    //     time: [],
    // };
    public dialogData = "";

    mounted() {
        this.$nextTick(() => {
            this.nodeLists = this.$el.querySelectorAll(".sub-title");
        });
        // this.getJudicialInfo()
    }

    goToAnchor(index) {
        this.currentTagIndex = index;
        this.nodeLists[index].scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐
        });
    }

    changePage(val) {
        let params: any = {
            pageSize: val.pageSize,
            pageNum: val.pageNum,
            queryCertain: val.flag,
        };
        this.$emit("getJudicialInfo", params);
        /* 如果分页器为 裁判文书，则需要将表单数据追加到参数当中 */
        // if (val.flag == 'judgmentdoc') {
        //   let { caseReasonType, isProsecutor, time } = this.queryForm
        //   let [beginDate, endDate] = time
        //   params = {
        //     caseReasonType: caseReasonType,
        //     isProsecutor: isProsecutor,
        //     beginDate: beginDate || '',
        //     endDate: endDate || '',
        //     ...params
        //   }
        // }
        // this.getJudicialInfo(params)
    }

    // search() {
    //     let { caseReasonType, isProsecutor, time } = this.queryForm
    //     let [beginDate, endDate] = time
    //     let params = {
    //       caseReasonType,
    //       isProsecutor,
    //       beginDate: beginDate || '',
    //       endDate: endDate || '',
    //       flag: 'judgmentdoc',
    //       pageSize: 50,
    //       pageNum: 1
    //     }
    //     this.getJudicialInfo(params)
    // }

    // resetForm(formName) {
    //     let oDom: any = this.$refs[formName];
    //     oDom.resetFields();
    // }

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
