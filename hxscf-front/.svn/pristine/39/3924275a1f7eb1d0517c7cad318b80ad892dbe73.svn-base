<template>
    <div class="template-container">
        <template>
            <div class="template-content">
                <div class="grid-title">
                    <div class="sub-title">获取方式</div>
                    <div class="sub-gap"></div>
                </div>
                <el-form :inline="true" :model="formData" label-width="110px" ref="formData" size="small">
                    <el-form-item label="基础数据获取方式" prop="code1" class="br-form-item-label">
                        {{list.list?"三方获取":"手动导入"}}
                    </el-form-item>
                </el-form>
            </div>
            <div class="sub-gap"></div>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const tradeDataConfig = namespace("tradeDataConfig");
@Component({})
export default class Title extends Vue {
    @tradeDataConfig.Action queryList;
    @tradeDataConfig.State searchData;
    @tradeDataConfig.State list;
    public formData: any = {
        code1: "三方获取",
    };
    created() {
        this.queryList(this.searchData);
    }
}
</script>

<style scoped lang="scss">
</style>