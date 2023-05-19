<template>
    <div class="template-container">
        <el-form :model="formData" :rules="rules" ref="forms" size="small">
            <div>
                <div class="sub-title">关联企业
                    <el-link type="primary" :underline="false" class="link" @click="onChangeDetail" v-if="$route.query.handleType=='change'">变更信息</el-link>
                    <el-button type="primary" class="br-btn rt" @click="onAdd(formData.list)">新增</el-button>
                </div>
                <el-table stripe border :data="formData.list" class="br-table">
                    <el-table-column label="企业名称" prop="custId" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.custId' " class="br-form-item-label" :rules="rules.code1">
                                <el-select v-model="scope.row.custId" filterable class="br-select-small" @change="(val)=>onChange(scope.row,val)">
                                    <el-option v-for="(item,index) in businessNameOption" :key="index" :value="item.custId" :label="item.bizName" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="企业性质" prop="bizNature" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.bizNature' " class="br-form-item-label" :rules="rules.code1">
                                <el-select v-model="scope.row.bizNature" filterable class="br-select-small">
                                    <el-option v-for="(item,index) in enterpriseNatureOption" :key="index" :value="item.dictCode" :label="item.dictName" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="实缴资本(万元)" prop="realAmt" min-width="150"></el-table-column>
                    <el-table-column label="净资产" prop="netAmt" min-width="150"></el-table-column>
                    <el-table-column label="信用等级" prop="riskLevel" min-width="150"></el-table-column>
                    <el-table-column label="信用评分" prop="riskScore" min-width="100"></el-table-column>
                    <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" min-width="220"></el-table-column>
                    <el-table-column label="信用风险限额" prop="riskMaxAmt" min-width="220"></el-table-column>
                    <el-table-column label="是否担保" prop="guaranteeFlag" min-width="220">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.guaranteeFlag' " class="br-form-item-label" :rules="rules.code1">
                                <el-select v-model="scope.row.guaranteeFlag" filterable class="br-select-small">
                                    <el-option v-for="(item,index) in $select('guaranteeType')" :key="index" :value="item.value" :label="item.text" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否设置申请额度" prop="quotaSetFlag" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.quotaSetFlag' " class="br-form-item-label" :rules="rules.code1">
                                <el-select v-model="scope.row.quotaSetFlag" filterable class="br-select-small" @change="(val)=>onQuotaSetChange(scope.row,val)">
                                    <el-option v-for="(item,index) in $select('quotaSetType')" :key="index" :value="item.value" :label="item.text" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请额度" prop="applyQuota" min-width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.quotaSetFlag == '0'">---</span>
                            <el-form-item v-else :prop="'list.' + scope.$index + '.applyQuota' " class="br-form-item-label" :rules="rules.code3">
                                <el-input-number v-model.trim="scope.row.applyQuota" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!-- 变更时显示、新建、编辑不显示 -->
                    <el-table-column label="审批额度" prop="approveQuota" min-width="200" v-if="$route.query.hanleType=='change'"></el-table-column>
                    <el-table-column label="授信到期日" prop="endDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.endDate' " class="br-form-item-label" :rules="rules.code1">
                                <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!-- 变更时显示、新建、编辑不显示 -->
                    <el-table-column label="通过日期" prop="passDate" min-width="200" v-if="$route.query.hanleType=='change'"></el-table-column>
                    <el-table-column label="其他信息" prop="code9" width="100px" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="150" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onReport">资信报告</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.list)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
        <RemarkDialog ref="remark" />
        <ChangeInformation ref="changeInfomation" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
import RemarkDialog from "./remark-dialog.vue";
import ChangeInformation from "../../common/changeInformation.vue";
@Component({
    components: {
        RemarkDialog,
        ChangeInformation,
    },
})
export default class associatedBusiness extends Vue {
    @Prop({ default: () => {}, type: Array }) propData;
    @Watch("propData", { deep: true })
    onPropData(val) {
        if (val) {
            this.$set(this.formData, "list", val);
        }
    }
    @general.Action queryCreditedBiz;
    @general.State businessNameOption;
    @general.Action queryDataByDicCode;
    @general.State enterpriseNatureOption;
    public formData: any = {
        list: [
            // {
            //     custId: "KHBH89389899-620210118I4r0",
            //     bizNature: "01",
            //     realAmt: "100000",
            //     netAmt: "10000",
            //     riskLevel: "AA",
            //     riskScore: "20",
            //     surveyMaxAmt: "1000",
            //     riskMaxAmt: "0.8",
            //     guaranteeFlag: "1",
            //     quotaSetFlag: "0",
            //     applyQuota: "50000",
            //     endDate: "2020-10-22",
            // },
        ],
    };
    public rules = {
        code1: [{ required: true, message: "请选择", trigger: "change" }],
        code3: [{ required: true, message: "请输入", trigger: "blur" }],
    };

    public bizNature: any = [];

    public pickerOptions: any = {
        // 限制预约时间-只能是未来时间
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
        },
    };

    mounted() {
        this.queryCreditedBiz({ flag: "02" });
        this.queryDataByDicCode({ dicCode: "enterpriseNature" });
    }

    // 企业名称改变时
    onChange(row, val) {
        this.businessNameOption.forEach((item) => {
            if (item.custId === val) {
                row.bizName = item.bizName || "";
                row.realAmt = item.realAmt || 0;
                row.netAmt = item.netAmt || 0;
                row.riskLevel = item.riskLevel || "";
                row.riskScore = item.riskScore || "";
                row.surveyMaxAmt = item.surveyMaxAmt || 0;
                row.riskMaxAmt = item.riskMaxAmt || 0;
            }
        });
    }

    // 是否设置申请额度改变时
    onQuotaSetChange(row, val) {
        if (val === "0") row.applyQuota = 0;
    }

    // 资信报告
    onReport() {}

    // 备注
    onRemark(row) {
        let $el: any = this.$refs["remark"];
        $el.init(row);
    }

    // 变更信息
    onChangeDetail() {
        let $el: any = this.$refs["changeInfomation"];
        $el.init();
    }

    // 添加
    onAdd(list) {
        list.push({});
    }

    // 删除
    onDelete(index, rows) {
        rows.splice(index, 1);
    }

    // 供父组件使用
    handleParams() {
        return this.formData.list;
    }
}
</script>

<style scoped lang="scss">
.rt {
    position: absolute;
    right: 0px;
    top: -5px;
}
.link {
    margin-left: 10px;
    vertical-align: text-top;
}
</style>
