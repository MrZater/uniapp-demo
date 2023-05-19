<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                通知消息列表
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="通知时间" prop="noticeDate" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.noticeDate | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="通知类型" prop="noticeType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleType(row.noticeType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="通知内容" prop="noticeContent" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false" @click="goRouter(row)">{{row.noticeContent}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="noticeReadState" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <span>
                                <el-tag size="mini" :type="row.noticeReadState == '0' ? 'success': 'danger'">{{$code("noticeReadState",row.noticeReadState)}}</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const noticeMessage = namespace("noticeMessage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
        Pages,
    },
})
export default class Grid extends Vue {
    @noticeMessage.State noticeTypeOption; //通知类型
    @noticeMessage.State list;
    @noticeMessage.Action queryList;
    @noticeMessage.State loading;
    @noticeMessage.State saveSearch;
    @noticeMessage.Action resetToRead;

    //跳转地址
    goRouter(row) {
        this.resetToRead({ noticeId: row.noticeId }).then((res) => {
            this.$router.push(row.jumpPosition);
        });
    }

    // 分页
    changePageFn(val) {
        let parame = {
            ...this.saveSearch,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };

        this.queryList(parame);
    }
    // 翻译通知类型
    handleType(code) {
        let target = this.noticeTypeOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "-";
    }
}
</script>

<style scoped lang="scss">
</style>
