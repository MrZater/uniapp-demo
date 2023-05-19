<template>
    <div class="template-container">
        <div>
            <div class="sub-title">行业经营情况
                <el-link type="primary" :underline="false" class="link" @click="onChangeDetail">查看行业经营情况</el-link>
            </div>
            <div class="sub-gap"></div>
            <div class="sub-title">前期合作情况（包括合作业务量和利润）</div>
            <el-form :model="formData" :rules="rules" ref="forms" size="small">
                <el-table stripe border :data="formData.list" class="br-table">
                    <el-table-column label="授信编号" prop="creditId" show-overflow-tooltip></el-table-column>
                    <el-table-column label="授信通过日期" prop="passDate" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.passData | date}}
                        </template>
                    </el-table-column>
                    <el-table-column label="授信到期日" prop="endDate" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.endDate | date}}
                        </template>
                    </el-table-column>
                    <el-table-column label="签约个数" prop="signedNum" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.signedNum' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.signedNum" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="签约数量" prop="signedCount" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.signedCount' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.signedCount" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="签约金额（万元）" prop="signedMoney" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.signedMoney' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.signedMoney" class="br-input-small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="累计逾期金额占比（%）" prop="sumoverdulMoneyRatio" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.sumoverdulMoneyRatio' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.sumoverdulMoneyRatio" :min="0" :max="100" :step="1"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="累计逾期次数" prop="sumoverdulMoneyNum" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.sumoverdulMoneyNum' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.sumoverdulMoneyNum" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="逾期处理情况">
                        <template slot-scope="{row}">
                            <el-button type="text" @click="onOpen(row)">填写</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </div>
        <el-dialog title="逾期处理情况" :visible.sync="visible" width="460px" class="br-dialog">
            <el-input type="textarea" v-model.trim="remark" class="br-textarea__full" placeholder="请输入逾期处理情况" :autosize="{ minRows: 8, maxRows: 14 }" maxlength="200" show-word-limit>
            </el-input>
            <div slot="footer" class="br-dialog-footer">
                <el-button type="primary" class="br-btn-large" @click="onSaveRemark">保存</el-button>
                <el-button class="br-btn-large" @click="visible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
@Component({})
export default class creditWay extends Vue {
    @Prop({ default: () => [], type: Array }) data;
    @general.Action queryDataByDicCode;
    @general.State enterpriseNatureOption;
    public formData: any = {
        list: [{}],
    };
    public bizNature: any = [];

    public rules = {
        code1: [{ required: true, message: "请输入", trigger: "blur" }],
        code2: [{ required: true, message: "请输入", trigger: "change" }],
    };

    public visible: boolean = false;

    public remark: string = "";

    public row: any = {};

    mounted() {
        let { creditId, passDate, endDate } = this.$route.query;

        this.$set(this.formData, "list", [
            {
                creditId: creditId,
                passDate: passDate,
                endDate: endDate,
            },
        ]);
        this.queryDataByDicCode({ dicCode: "enterpriseNature" });
    }

    // 逾期处理情况
    onOpen(row) {
        this.row = row;
        this.visible = true;
        this.remark = row.moverdulDealCase;
    }

    onSaveRemark() {
        this.row.moverdulDealCase = this.remark;
        this.visible = false;
    }

    // 变更信息
    onChangeDetail() {}
}
</script>

<style scoped lang="scss">
.link {
    margin-left: 10px;
    vertical-align: text-top;
}
</style>
