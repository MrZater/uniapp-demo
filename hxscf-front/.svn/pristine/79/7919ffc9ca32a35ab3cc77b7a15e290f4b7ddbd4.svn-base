<template>
    <div class="template-container" v-loading="loading">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="item.modelTableConfig.tableCname" :name="String(index)" v-for="(item,index) in data" :key="index">
                <el-table stripe :data="item.modelColumnVoList" class="br-table" border style="width: 100%">
                    <el-table-column label="指标名称" prop="columCname"></el-table-column>
                    <el-table-column label="录入信息" prop="columValue">
                        <template slot-scope="{row}">
                            {{handleValue(row)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="说明" prop="remark"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");

@Component({})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action showTradeTemplateDetail;

    public loading: boolean = false;

    public activeName: string = "0";

    data: any = [];

    mounted() {
        this.loading = true;
        let params = {
            riskId: this.$route.query.riskId || "",
        };
        this.showTradeTemplateDetail(params)
            .then((res) => {
                this.data = res.modelTableVos || [];
            })
            .finally(() => (this.loading = false));
    }
    handleValue(row) {
        /* inputModel == "03" 是下拉多选，需要进行翻译 */
        if (row.inputModel == "03" && row.columValue) {
            let total: any = [];
            row.columValue.forEach((item) => {
                row.columDicConfigList.forEach((sub) => {
                    if (item === sub.dictCode) {
                        total.push(sub.dictName);
                    }
                });
            });
            return total.join(",");
        }
        /* inputModel == "02" 是下拉单选，需要进行翻译 */
        if (row.inputModel == "02") {
            let total: string = "";
            row.columDicConfigList.forEach((sub) => {
                if (row.columValue === sub.dictCode) {
                    total = sub.dictName;
                }
            });
            return total;
        }
        return row.columValue;
    }
}
</script>

<style scoped lang="scss">
</style>
