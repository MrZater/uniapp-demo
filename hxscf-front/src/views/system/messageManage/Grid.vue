<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                消息管理列表
            </template>
            <template slot="grid">
                <el-table stripe :data="messageList.list" class="br-table" v-loading="loading">
                    <el-table-column label="通知方式" prop="noticeMode" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{$code("noticeModeType", row.noticeMode)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户登录名/企业微信/企业邮箱" prop="noticeUserId" show-overflow-tooltip></el-table-column>
                    <el-table-column label="通知类型" prop="noticeType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleTranslate(row.noticeType,'noticeTypeOption')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="通知时间" prop="noticeDate" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.noticeDate | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="noticeState" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-tag size="mini" :type="row.noticeState == '1' ? 'success': 'danger'">
                                {{handleTranslate(row.noticeState,"statusOption")}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="通知内容" prop="noticeContent" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="80px">
                        <template slot-scope="scope">
                            <renderBtn code="message_manage_send">
                                <el-button type="text" size="mini" :disabled="scope.row.noticeState == '1'" @click="onSend(scope.row)">发送</el-button>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="messageList.pageNum" :pageSize="messageList.pageSize" :total="messageList.total" @changePage="changePageFn" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const messageManage = namespace("messageManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import { Pages } from "@/components";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
        Pages,
    },
})
export default class Grid extends Vue {
    @messageManage.State statusOption; //状态
    @messageManage.State noticeTypeOption; //通知类型
    @messageManage.State messageList;
    @messageManage.Action queryMsgList;
    @messageManage.State loading;
    @messageManage.State saveSearch;
    @messageManage.Action querySend;

    // 发送
    onSend(row) {
        this.querySend({ noticeId: row.noticeId }).then((res) => {
            this.$message({ type: "success", message: res });
            this.queryMsgList(this.saveSearch);
        });
    }

    changePageFn(val) {
        let parame = {
            ...this.saveSearch,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };

        this.queryMsgList(parame);
    }
    handleTranslate(code, keyword) {
        let target = this[keyword].find((item) => item.dictCode === code);
        return target ? target.dictName : "-";
    }
}
</script>

<style scoped lang="scss">
</style>
