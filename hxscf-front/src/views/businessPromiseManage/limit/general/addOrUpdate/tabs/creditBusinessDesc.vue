<template>
    <div class="template-container">
        <div class="sub-title">授信企业情况说明</div>
        <div>
            <el-form :rules="rules" :model="formData" ref="forms" size="small">
                <el-form-item class="br-form-item-label" label="" prop="creditCasestate">
                    <el-input class="br-textarea__full" v-model.trim="formData.creditCasestate" type="textarea" placeholder="请输入授信企业情况说明" :autosize="{ minRows: 8, maxRows: 14 }" maxlength="500"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class creditWay extends Vue {
    @Prop({ default: () => {}, type: Object }) propData;
    @Watch("propData", { deep: true })
    onPropData(val) {
        if (val) {
            this.$set(this.formData, "creditCasestate", val.creditCasestate);
        }
    }
    public formData = {
        creditCasestate: "",
    };

    public rules = {
        creditCasestate: [
            {
                required: true,
                message: "请输入授信企业情况说明",
                trigger: "blur",
            },
        ],
    };

    // 供父组件使用
    handleParams() {
        return this.formData;
    }
}
</script>

<style scoped lang="scss">
</style>
