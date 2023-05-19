<template>
    <div>
        <ContentWrapper>
            <template slot="title">
                授信统计列表
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" border v-loading="loading">
                    <el-table-column label="组织名称" prop="riskLevel" show-overflow-tooltip />
                    <el-table-column label="授信总额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="已用总额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="剩余总额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="一般额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="已用一般额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="剩余一般额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="临时额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="已用临时额度" prop="riskScore" show-overflow-tooltip />
                    <el-table-column label="剩余临时额度" prop="riskScore" show-overflow-tooltip />
                    <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />
                </el-table>
            </template>
        </ContentWrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const creditExten = namespace("creditExten");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";

@Component({
    components: {
        ContentWrapper,
        Pages,
    },
})
export default class Grid extends Vue {
    @creditExten.State list;
    // @creditExten.Action queryList;
    // @creditExten.State searchData;
    // @creditExten.Action saveSearchDataFN;
    @creditExten.State loading;

    changePageFn(val) {
        // let { custId } = this.$route.query;
        // let params = {
        //     ...this.searchData,
        //     pageNum: val.pageNum,
        //     pageSize: val.pageSize,
        //     custId: custId,
        // };
        // this.queryList(params);
        // this.saveSearchDataFN(params);
    }
}
</script>