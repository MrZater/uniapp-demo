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
            <el-form :inline="true" :model="data" label-width="170px" ref="forms" size="small" disabled>
                <el-form-item class="br-form-item-label" label="授信额度上限" prop="creditQuotaMax">
                    <el-input class="br-input" placeholder="请输入" v-model.number="data.creditQuotaMax">
                        <template slot="prepend">¥</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="申请额度" prop="applyQuota">
                    <el-input class="br-input" placeholder="请输入" v-model.trim="data.applyQuota">
                        <template slot="prepend">¥</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="动态跟踪频次" prop="dynamicTrackingFrequency">
                    <el-select v-model="data.dynamicTrackingFrequency" placeholder="请输入" class="br-select" filterable>
                        <el-option v-for="(item,index) in dynamicTrackingOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="授信到期日" prop="endDate">
                    <el-date-picker v-model="data.endDate" type="date" class="br-datepicker" placeholder="请选择授信到期日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="业务类型" prop="businessType">
                    <el-select v-model="data.businessType" placeholder="请选择" class="br-select" filterable>
                        <el-option v-for="(item,index) in businessOption" :key="index" :value="item.dictCode" :label="item.dictName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="应收账款单笔业务结算周期" prop="gainCycle" v-if="data.businessType == '01' || data.businessType == '03'">
                    <el-input class="br-input" placeholder="请输入" v-model.trim="data.gainCycle">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="br-form-item-label" label="预付账款单笔业务结算周期" prop="payCycle" v-if="data.businessType == '02' || data.businessType == '03'">
                    <el-input class="br-input" placeholder="请输入" v-model.trim="data.payCycle">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
@Component({})
export default class creditWay extends Vue {
    @general.Action queryDataByDicCode;
    @general.State dynamicTrackingOption; //动态跟踪频次
    @general.State businessOption; //业务类型
    @Prop({ default: () => {}, type: Object }) data;
    @Prop({ default: () => [], type: Array }) creditType;

    mounted() {
        // 动态跟踪频次
        this.queryDataByDicCode({ dicCode: "dynamicTracking" });
        // 业务类型
        this.queryDataByDicCode({ dicCode: "businessType" });
    }
}
</script>

<style scoped lang="scss">
</style>
