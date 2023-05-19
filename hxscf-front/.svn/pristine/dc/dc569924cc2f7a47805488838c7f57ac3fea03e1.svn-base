<!--
 * @Author: zhiqiang.qiao
 * @Date: 2020-05-25 13:48:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 14:01:20
 * @Description: 分页案例
 -->
<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                分页案例
            </template>
            <template slot="grid">
                <el-row>
                    <el-col :span="4">
                        <div class='title'>基础分页</div>
                    </el-col>
                    <el-col :span="20">
                        <Pages :pageNum="pageData.pageNum" :pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePageFn" />
                    </el-col>
                    <el-col :span="4">
                        <div class='title'>自定义个数选择器</div>
                    </el-col>
                    <el-col :span="20">
                        <Pages :pageNum="pageData.pageNum" :pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePageFn" :pageSizeList="[10,20,30,40]" />
                    </el-col>
                    <el-col :span="4">
                        <div class='title'>是否显示个数选择器</div>
                    </el-col>
                    <el-col :span="20">
                        <Pages :pageNum="pageData.pageNum" :pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePageFn" :isShowSizeList="false" />
                    </el-col>
                    <el-col :span="4">
                        <div class='title'>有背景色的分页</div>
                    </el-col>
                    <el-col :span="20">
                        <Pages :pageNum="pageData.pageNum" :pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePageFn" isHaveBackground />
                    </el-col>
                    <el-col :span="4">
                        <div class='title'>禁用分页</div>
                    </el-col>
                    <el-col :span="20">
                        <Pages :pageNum="pageData.pageNum" :pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePageFn" disabled />
                    </el-col>
                    <el-col :span="4">
                        <div class='title'>自定义前一页后一页内容</div>
                    </el-col>
                    <el-col :span="20">
                        <Pages :pageNum="pageData.pageNum" :pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePageFn" prevText="上一页" nextText="下一页" />
                    </el-col>
                </el-row>
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
const batchAdjustment = namespace("batchAdjustment");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        Pages
    }
})
export default class Pager extends Vue {
    public pageData = {
        pageNum: 1,
        pageSize: 10,
        total: 55
    };

    changePageFn(val) {
        this.pageData.pageNum = val.pageNum;
        this.pageData.pageSize = val.pageSize;
    }
}
</script>

<style scoped lang="scss">
.title {
    font-size: 14px;
    text-align: right;
    margin-top: 20px;
}
</style>