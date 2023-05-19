<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-23 10:15:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 11:44:19
 * @Description: 分页组件
 -->
<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" :page-sizes="pageSizeList" :hide-on-single-page="hideOnSinglePage" :layout="isShowSizeList ? 'total, sizes, prev, pager, next, jumper' : 'total, prev, pager, next, jumper'" :total="Number(total)" :background="isHaveBackground" :disabled="disabled" :prev-text="prevText" :next-text="nextText" :small="isSmall" class="br-pagination">
            </el-pagination>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Pages extends Vue {
    @Prop({ default:'',type: String}) flag;
    @Prop({ default: 1 }) pageNum;
    @Prop({ default: 10 }) pageSize;
    @Prop({ default: 0 }) total;
    @Prop({
        default() {
            return [10, 20, 30, 50, 100];
        }
    })
    pageSizeList;
    @Prop({ default: true }) isShowSizeList;
    @Prop({ default: false }) hideOnSinglePage;
    @Prop({ default: false }) isHaveBackground;
    @Prop({ default: false }) disabled;
    @Prop({ default: false }) isSmall;
    @Prop({ default: "" }) prevText;
    @Prop({ default: "" }) nextText;

    handleSizeChange(pageSize) {
        this.$emit("changePage", {
            pageNum: 1,
            pageSize: pageSize,
            type: "sizeChange",
            flag: this.flag
        });
    }
    handleCurrentChange(pageNum) {
        this.$emit("changePage", {
            pageNum: pageNum,
            pageSize: this.pageSize,
            type: "numberChange",
            flag: this.flag
        });
    }
}
</script>