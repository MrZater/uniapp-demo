<template>
    <div class="template-container" v-loading="detailLoading">
        <div class="template-content">
            <div class="grid-title">
                <div class="sub-title">模板详情</div>
            </div>
            <el-form :inline="true" :model="detailData.template" label-width="100px" ref="formData" size="small">
                <el-form-item label="模板名称" prop="modelName" class="br-form-item-label">
                    {{detailData.template.modelName}}
                </el-form-item>
                <el-form-item label="行业名称" prop="tradeName" class="br-form-item-label" v-if="modelFlag == '1'">
                    {{detailData.template.tradeName}}
                </el-form-item>
            </el-form>
            <el-divider content-position="left">
                <el-tag type="success" size="medium">{{ $code('templateStatus', detailData.template.apprState) }}</el-tag>
            </el-divider>
        </div>

        <div class="sub-gap"></div>

        <div class="template-content">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="item.modelTableConfig.tableCname" :name="String(index)" v-for="(item,index) in detailData.modelTableVos" :key="index">
                    <el-table stripe :data="item.modelColumnVoList" class="br-table" border style="width: 100%">
                        <el-table-column label="字段名称" prop="columCname">
                            <template slot-scope="{row}">
                                {{row.columCname}}
                            </template>
                        </el-table-column>
                        <el-table-column label="英文名称" prop="columCode" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                {{row.columCode}}
                            </template>
                        </el-table-column>
                        <el-table-column label="输入方式" prop="inputModel" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                {{$code("inputModelType",row.inputModel)}}
                            </template>
                        </el-table-column>
                        <el-table-column label="字段长度" prop="columLength" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                {{row.columLength}}
                            </template>
                        </el-table-column>
                        <el-table-column label="是否必填" prop="requiredFlag" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                <el-tag size="mini" :type="row.requiredFlag == '1' ? 'success': 'danger'">{{$code("yesOrNo",row.requiredFlag)}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段值" prop="columType">
                            <template slot-scope="{row}">
                                <template v-if="row.inputModel == '01'">
                                    {{$code("columType",row.columType)}}
                                </template>
                                <template v-else>
                                    <el-link type="primary" :underline="false" @click="openDialog(row)">查看字典项</el-link>
                                </template>
                            </template>

                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="sub-gap"></div>

        <!-- 操作记录 -->
        <LogTable :list='detailData.historyApprove' :applyKeyNo="detailData.applyKeyNo"></LogTable>

        <div class="sub-gap"></div>

        <div class="template-content">
            <div class="template-bottom-button">
                <el-button class="br-btn" @click="onCancel">关 闭</el-button>
            </div>
        </div>
        <el-dialog title="选项" :visible.sync="dialogVisible" width="30%" class="br-dialog">
            <el-table stripe :data="dialogData" class="br-table" border>
                <el-table-column label="选项名称" prop="dictName"></el-table-column>
                <el-table-column label="英文名称" prop="dictCode"></el-table-column>
            </el-table>
            <div slot="footer" class="br-dialog-footer">
                <el-button class="br-btn-large" @click="dialogVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const credit = namespace("credit");

import { ContentWrapper } from "@/components";
import Grid from "./Grid.vue";
import LogTable from "./addOrUpdate/LogTable.vue";

@Component({
    components: {
        ContentWrapper,
        Grid,
        LogTable,
    },
})
export default class child extends Vue {
    @credit.Action queryDetail;
    public detailData: any = {
        applyKeyNo: "",
        template: {},
        modelTableVos: [],
        historyApprove: [],
    };
    public detailLoading: boolean = false;
    dialogVisible: boolean = false;

    activeName: string = "0";

    dialogData: any[] = [];
    modelFlag: any = "";
    mounted() {
        let { keyNo, modelFlag } = this.$route.query;
        this.modelFlag = modelFlag;
        this.detailLoading = true;
        this.queryDetail({ keyNo })
            .then((res) => (this.detailData = res))
            .finally(() => (this.detailLoading = false));
    }
    openDialog(row) {
        this.dialogData = row.columDicConfigList || [];
        this.dialogVisible = true;
    }

    onCancel() {
        this.$bus.$emit("closeTag", {
            name: this.$route.name,
        });
        this.$router.go(-1);
    }
}
</script>

<style  scoped lang="scss">
</style>
