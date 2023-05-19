<template>
    <div class="template-container">
        <div class="sub-title">授信企业情况说明</div>
        <div>
            <el-form :model="data" ref="forms" size="small" disabled>
                <el-form-item class="br-form-item-label" label="" prop="creditCasestate">
                    <el-input class="br-textarea__full" v-model.trim="data.creditCasestate" type="textarea" placeholder="请输入授信企业情况说明" :autosize="{ minRows: 8, maxRows: 14 }" maxlength="500"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class creditWay extends Vue {
    @Prop({ default: () => [], type: Object }) data;
}
</script>

<style scoped lang="scss">
</style>
