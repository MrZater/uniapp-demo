<template>
    <div class="template-container" style="margin-top: 10px">
        <ContentWrapper>
            <template #title>企业信息查询列表</template>
            <template #grid>
                <Empty v-if="!data.list || data.list.length == 0" :description="emptyText" v-loading="isLoading"></Empty>
                <div v-else v-loading="isLoading">
                    <el-table stripe :data="data.list" class="br-table">
                        <el-table-column label="企业名称" prop="corpName" min-width="200"></el-table-column>
                        <el-table-column label="统一社会信用代码" prop="creditCode" min-width="200"></el-table-column>
                        <el-table-column label="是否已创建" prop="isCreate" min-width="200">
                            <template slot-scope="{row}">
                                <el-tag size="mini" :type="row.isCreate == '1' ? 'success': 'danger'">{{$code('yesOrNo',row.isCreate)}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="{row}">
                                <renderBtn code="enterprise_info_query_dets">
                                    <el-button type="text" @click="detail(row)">企业详情</el-button>
                                </renderBtn>
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pages :pageNum="data.pageNum" :pageSize="data.pageSize" :pageSizeList="[20]" :total="data.total" @changePage="changePageFn" />
                </div>
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";

const enterpriseInfoSearch = namespace("enterpriseInfoSearch");
import { Pages, Empty } from "@/components";
import { namespace } from "vuex-class";

@Component({
    components: {
        ContentWrapper,
        Pages,
        Empty,
    },
})
export default class Grid extends Vue {
    @enterpriseInfoSearch.State data;
    @enterpriseInfoSearch.State isLoading;
    @enterpriseInfoSearch.State saveSearch;
    @enterpriseInfoSearch.Action getListFN;
    @enterpriseInfoSearch.Action resetListFN;
    public emptyText: string = "没有查到相关数据";

    beforeDestroy() {
        /* 组件销毁时，清空列表项，防止缓存 */
        this.resetListFN();
    }
    /**企业详情*/
    detail(row) {
        this.$router.push({
            path: "/enterpriseInfoDetail",
            query: row,
        });
    }

    /**分页*/
    changePageFn(val) {
        if (val.pageNum >= 4) {
            this.emptyText = "您的搜索词太宽泛，请更换搜索词";
        }
        let params = {
            ...this.saveSearch,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.getListFN(params);
    }
}
</script>

<style scoped>
</style>