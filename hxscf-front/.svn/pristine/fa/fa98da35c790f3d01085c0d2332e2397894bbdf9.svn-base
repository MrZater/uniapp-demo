<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:19:08
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 16:57:41
 * @Description: 
-->
<template>
    <div class="template-container">
        <div class="template-content">
            <div class="template-content-title">
                <div class="template-content-title-extra">
                    <el-button class="br-btn" type="primary" @click="handleEdit">编辑</el-button>
                </div>
            </div>
        </div>
        <template v-if="list.list">
            <div class="sub-gap"></div>
            <div class="template-content">
                <div class="template-content-title">
                    行业数据获取方式列表
                </div>
                <div class="template-content-main">
                    <el-table stripe :data="list.list" class="br-table" border v-loading="loading">
                        <el-table-column label="组织名称" prop="orgName"></el-table-column>
                        <el-table-column label="行业名称" prop="tradeName"></el-table-column>
                        <el-table-column label="三方编号" prop="tradeCode"></el-table-column>
                    </el-table>
                    <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />
                </div>
            </div>
        </template>

        <update ref="update" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeDataConfig = namespace("tradeDataConfig");
import Update from "./Update.vue";
import { Pages } from "@/components";

@Component({
    components: {
        Update,
        Pages,
    },
})
export default class Grid extends Vue {
    @tradeDataConfig.State list;
    @tradeDataConfig.Action queryList;
    @tradeDataConfig.State searchData;
    @tradeDataConfig.Action saveSearchDataFN;
    @tradeDataConfig.State loading;

    //编辑
    handleEdit(): void {
        let $el: any = this.$refs["update"];
        $el.init();
    }

    changePageFn(val) {
        let parame = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryList(parame);
        this.saveSearchDataFN(parame);
    }
}
</script>