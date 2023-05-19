<template>
    <div class="template-container">
        <div class="sub-title">授信方式</div>
        <div class="sub-gap"></div>
        <div>
            <el-checkbox-group v-model="creditType" :min="1" disabled>
                <el-checkbox label="01">信用</el-checkbox>
                <el-checkbox label="02">保证</el-checkbox>
                <el-checkbox label="03">抵押</el-checkbox>
                <el-checkbox label="04">质押</el-checkbox>
                <el-checkbox label="05">其他</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="sub-gap"></div>
        <div>
            <el-form :inline="true" :rules="rules" :model="formData" label-width="170px" ref="forms" size="small">
                <el-form-item class="br-form-item-label" label="授信额度上限" prop="creditQuotaMax">
                    <el-input class="br-input" placeholder="请输入" v-model.number="total" disabled>
                        <template slot="prepend">¥</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="申请额度" prop="applyQuota">
                    <el-input class="br-input" placeholder="请输入" v-model.trim="formData.applyQuota">
                        <template slot="prepend">¥</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="动态跟踪频次" prop="dynamicTrackingFrequency">
                    <el-select v-model="formData.dynamicTrackingFrequency" placeholder="请输入" class="br-select" filterable>
                        <el-option v-for="(item,index) in dynamicTrackingOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="授信到期日" prop="endDate">
                    <el-date-picker v-model="formData.endDate" type="date" class="br-datepicker" placeholder="请选择授信到期日" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="业务类型" prop="businessType">
                    <el-select v-model="formData.businessType" placeholder="请选择" class="br-select" filterable>
                        <el-option v-for="(item,index) in businessOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="应收账款单笔业务结算周期" prop="gainCycle" v-if="formData.businessType == '01' || formData.businessType == '03'">
                    <el-input class="br-input" placeholder="请输入" v-model.trim="formData.gainCycle">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="预付账款单笔业务结算周期" prop="payCycle" v-if="formData.businessType == '02' || formData.businessType == '03'">
                    <el-input class="br-input" placeholder="请输入" v-model.trim="formData.payCycle">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
@Component({})
export default class creditWay extends Vue {
    @general.Action queryDataByDicCode;
    @general.State dynamicTrackingOption;
    @general.State businessOption;
    @Prop({ default: () => [], type: Array }) propCreditTypes;
    @Watch("propCreditTypes", { deep: true })
    onCreditType(val) {
        if (val) {
            this.creditType = val;
        }
    }
    @Prop({ default: () => {}, type: Object }) propData;
    @Watch("propData", { deep: true })
    onPropData(val) {
        if (val) {
            this.formData = { ...val };
        }
    }
    @Prop({ default: 0, type: Number }) total;
    public formData: any = {
        // applyQuota: "50",
        // dynamicTrackingFrequency: "01",
        // endDate: "2020-10-20",
        // businessType: "03",
        // gainCycle: "10000",
        // payCycle: "20000",
    };
    public options: any = [];
    public options2: any = [];
    public rules = {
        applyQuota: [{ required: true, message: "请输入", trigger: "blur" }],
        dynamicTrackingFrequency: [
            { required: true, message: "请选择", trigger: "change" },
        ],
        endDate: [{ required: true, message: "请选择", trigger: "change" }],
        businessType: [
            { required: true, message: "请选择", trigger: "change" },
        ],
        gainCycle: [{ required: true, message: "请输入", trigger: "blur" }],
        payCycle: [{ required: true, message: "请输入", trigger: "blur" }],
    };

    public creditType = ["01"];

    public pickerOptions: any = {
        // 限制预约时间-只能是未来时间
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
        },
    };

    mounted() {
        this.$bus.$on("onCreditWayChange", (val) => {
            this.$set(this, "creditType", val);
        });
        // 动态跟踪频次
        this.queryDataByDicCode({ dicCode: "dynamicTracking" });
        // 业务类型
        this.queryDataByDicCode({ dicCode: "businessType" });
    }
    // 供父组件使用
    handleParams() {
        let params = {
            ...this.formData,
            creditType: this.creditType,
            creditQuotaMax: this.total,
        };
        return params;
    }
}
</script>

<style scoped lang="scss">
</style>
