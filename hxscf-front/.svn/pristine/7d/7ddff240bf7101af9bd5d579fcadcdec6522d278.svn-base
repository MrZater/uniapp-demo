<template>
    <div class="template-container">
        <div>
            <div class="sub-title">业务开展组织</div>
            <el-table stripe border :data="data" class="br-table">
                <el-table-column label="组织名称" prop="orgPname"></el-table-column>
                <el-table-column label="组织代码" prop="orgNo"></el-table-column>
                <el-table-column label="可使用额度上限" prop="quotaMax">
                    <template slot-scope="{row}">
                        {{row.quotaMax | money}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <remark-dialog ref="remark"></remark-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import RemarkDialog from "./remark-dialog.vue";
@Component({
    components: {
        "remark-dialog": RemarkDialog,
    },
})
export default class creditWay extends Vue {
    @Prop({ default: () => [], type: Array }) data;
    // 备注
    onRemark(row) {
        let $el: any = this.$refs["remark"];
        $el.init(row);
    }
}
</script>

<style scoped lang="scss">
</style>