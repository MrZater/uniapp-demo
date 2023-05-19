<!--*
 * @Author: mingliang.zhu 
 * @Date: 2020-05-26 16:28:49 
 * @Last Modified by:   mingliang.zhu 
 * @Last Modified time: 2020-05-26 16:28:49 
 */
 -->
<template>
    <el-table ref="table" class="br-table" v-loading="loading" :data="list" :border="border" width="100%" :height="height">
        <el-table-column type="selection" width="55" v-if="checkBox"></el-table-column>
        <el-table-column type="index" width="55" label="序号" v-if="index"></el-table-column>
        <el-table-column v-for="(column,index) in columns" :width="column.width ? column.width : ''" :key="index" :label="column.label" :prop="column.prop" :sortable="column.sortable ? true : false"
            :show-overflow-tooltip="column.tip ? true : false">
            <template slot-scope="scope">
                <span v-if="column.render">
                    {{column.render(scope.row)}}
                </span>
                <span v-else>{{scope.row[column.prop]}}</span>
            </template>
        </el-table-column>
        <el-table-column v-if="handles.label" :width="handles.width" :label="handles.label" align="center" fixed="right">
            <template slot-scope="scope">
                <el-button v-for="(item,index) in handles.options" :key="index" :type="item.type" :icon="item.icon" @click="handleButton(item.methods,scope.row,scope.row)" size="mini">
                    {{item.label}}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class index extends Vue {
    @Prop({ default: false, type: Boolean }) checkBox;
    @Prop({ default: false, type: Boolean }) index;
    @Prop({ default: 'auto', type: String || Number }) height;
    @Prop({ default: false, type: Boolean }) border;
    @Prop({ default: false, type: Boolean }) loading;
    @Prop({ default: () => [], type: Array }) list;
    @Prop({ default: () => [], type: Array, required: true }) columns;
    @Prop({ default: () => ({}), type: Object }) handles;
    handleButton(event, row) {
        this.$emit('handle', event, row);
    }
}
</script>
<style lang="scss" scoped></style>