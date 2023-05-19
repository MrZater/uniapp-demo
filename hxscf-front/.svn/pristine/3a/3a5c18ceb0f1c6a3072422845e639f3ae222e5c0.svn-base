<template>
    <el-table stripe :data="list" class="br-table">
        <el-table-column label="指标名" prop="indexCodeName"></el-table-column>
        <el-table-column label="全行业结果" align="center">
            <el-table-column prop="indexGoodValue" label="优秀值"></el-table-column>
            <el-table-column prop="indexWellValue" label="良好值"></el-table-column>
            <el-table-column prop="indexAvgValue" label="平均值"></el-table-column>
            <el-table-column prop="indexLowValue" label="较低值"></el-table-column>
            <el-table-column prop="indexBadValue" label="较差值"></el-table-column>
        </el-table-column>
    </el-table>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class Grid extends Vue {
    @Prop({ default: () => [], type: Array }) list;
}
</script>