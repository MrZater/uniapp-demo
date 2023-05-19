<template>
    <div class="template-container">
        <div class="sub-title">授信方式</div>
        <div class="sub-gap"></div>
        <div>
            <el-checkbox-group v-model="creditType" disabled>
                <el-checkbox label="01">信用</el-checkbox>
                <el-checkbox label="02">保证</el-checkbox>
                <el-checkbox label="03">抵押</el-checkbox>
                <el-checkbox label="04">质押</el-checkbox>
                <el-checkbox label="05">其他</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-form :model="data" ref="forms" size="small">
            <div v-if="creditType.includes('02')">
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-title">保证机构信息</div>
                <el-table stripe border :data="data.loanCreditSxguaranteebizs" class="br-table">
                    <el-table-column label="保证机构" prop="bizName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="资信评分" prop="riskScore" show-overflow-tooltip></el-table-column>
                    <el-table-column label="信用等级" prop="riskLevel" show-overflow-tooltip></el-table-column>
                    <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="信用风险额度" prop="riskMaxAmt" width="100px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="保证金额" prop="guaranteeMoney" show-overflow-tooltip></el-table-column>
                    <el-table-column label="保证合同编号" prop="guaranteeContractNo" min-width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="附件" prop="code9" width="150px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <div v-for="(item,index) in row.loanSysArchInfos" :key="index">
                                <el-button type="text" class="br-btn" @click="handleDownload(item)">{{item.fileName}}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onReport(scope.row)">资信报告</el-button>
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('02')">
                <div class="sub-gap"></div>
                <div class="sub-title">保证人信息</div>

                <el-table stripe border :data="data.loanCreditSxguarantors" class="br-table">
                    <el-table-column label="保证人姓名" prop="guarantorName" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="保证人身份证号" prop="guarantorPaperid" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="保证金额" prop="guaranteeMoney" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.guaranteeMoney | money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="保证合同编号" prop="guaranteeContractNo" min-width="150px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="附件" prop="code9">
                        <template slot-scope="{row}">
                            <div v-for="(item,index) in row.loanSysArchInfos" :key="index">
                                <el-button type="text" class="br-btn" @click="handleDownload(item)">{{item.fileName}}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('03')">
                <div class="sub-gap"></div>
                <div class="sub-title">抵押信息</div>
                <el-table stripe border :data="data.loanCreditSxmortgageinfos" class="br-table">
                    <el-table-column label="抵押物" prop="pawn" show-overflow-tooltip></el-table-column>
                    <el-table-column label="类型" prop="mortgageType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{$code('mortgageType',row.mortgageType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押价值（元）" prop="mortgageValue" width="120px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.mortgageValue | money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="转换比例（%）" prop="conversionRatio" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="转换授信额度" prop="conversionCreditQuota" width="120px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.conversionCreditQuota | money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押权人" prop="mortgagee" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleMortgagee(row.mortgagees)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押合同编号" prop="mortgageContractNo" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="附件" prop="files" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <div v-for="(item,index) in row.loanSysArchInfos" :key="index">
                                <el-button type="text" class="br-btn" @click="handleDownload(item)">{{item.fileName}}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('04')">
                <div class="sub-gap"></div>
                <div class="sub-title">质押信息</div>
                <el-table stripe border :data="data.loanCreditSxpledges" class="br-table">
                    <el-table-column label="抵押物" prop="pawn" show-overflow-tooltip></el-table-column>
                    <el-table-column label="类型" prop="mortgageType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{$code('mortgageType',row.mortgageType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押价值（元）" prop="mortgageValue" width="120px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.mortgageValue | money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="转换比例（%）" prop="conversionRatio" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="转换授信额度" prop="conversionCreditQuota" width="120px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.conversionCreditQuota | money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押权人" prop="mortgagees" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleMortgagee(row.mortgagees)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押合同编号" prop="mortgageContractNo" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="附件" prop="files" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <div v-for="(item,index) in row.loanSysArchInfos" :key="index">
                                <el-button type="text" class="br-btn" @click="handleDownload(item)">{{item.fileName}}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('05')">
                <div class="sub-gap"></div>
                <div class="sub-title">其他</div>
                <el-table stripe border :data="data.loanCreditSxotherstypes" class="br-table">
                    <el-table-column label="授信方式" prop="creditType" show-overflow-tooltip></el-table-column>
                    <el-table-column label="转换授信额度" prop="conversionCreditQuota" min-width="120px" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.conversionCreditQuota | money}}
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip></el-table-column>
                    <el-table-column label="附件" prop="files" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <div v-for="(item,index) in row.loanSysArchInfos" :key="index">
                                <el-button type="text" class="br-btn" @click="handleDownload(item)">{{item.fileName}}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
        <remark-dialog ref="remark"></remark-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
import RemarkDialog from "./remark-dialog.vue";
@Component({
    components: {
        "remark-dialog": RemarkDialog,
    },
})
export default class creditWay extends Vue {
    @general.Action queryOrgNameList;
    @general.State mortgageeOptions;
    @Prop({ default: () => [], type: Array }) creditType;
    @Prop({ default: () => {}, type: Object }) data;

    mounted() {
        // 抵押权人下拉框
        this.queryOrgNameList({ flag: "5" });
    }
    // 翻译抵押权人
    handleMortgagee(arr) {
        if (arr && arr instanceof Array) {
            let list: any = [];
            arr.map((code) => {
                let target = this.mortgageeOptions.find(
                    (sub) => sub.orgCode === code
                );
                list.push(target.orgName);
            });
            return list.join("，");
        }
    }

    // 资信报告
    onReport(row) {}

    // 文件下载
    handleDownload(file) {
        window.location.href = `/approve/loanFile/download?fileName=${file.url}`;
    }

    // 备注
    onRemark(row) {
        let $el: any = this.$refs["remark"];
        $el.init(row);
    }
}
</script>

<style scoped lang="scss">
</style>
