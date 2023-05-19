<template>
    <div>
        <div class="sub-gap"></div>
        <div class="sub-title">操作记录</div>
        <el-table stripe :data="list" class="br-table" border style="width: 100%">
            <el-table-column label="操作时间" prop="approveTime" show-overflow-tooltip>
                <template slot-scope="{ row }">
                    {{ row.approveTime | time }}
                </template>
            </el-table-column>
            <el-table-column label="组织名称" prop="currentOperOrgan" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作人" prop="currentOperOne" show-overflow-tooltip></el-table-column>
            <el-table-column label="审核结果" prop="approveResult" show-overflow-tooltip>
                <template slot-scope="{ row }">
                    {{ $code("approveResult", row.approveResult) }}
                </template>
            </el-table-column>
            <el-table-column label="审核意见" prop="approveAdvise" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class LogTable extends Vue {
    @Prop({ default: () => [], type: Array }) list;
}
</script>
