<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                公告管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="log_manage_del">
                    <el-button class="br-btn" type="primary" @click="onAddOrUpdate">新建</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="messageList.list" class="br-table" v-loading="loading">
                    <el-table-column label="公告编号" prop="noticeId" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false" @click="onAddOrUpdate(row)">{{row.noticeId}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告类型" prop="noticeType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleType(row.noticeType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="公告主题" prop="noticeTitle" show-overflow-tooltip></el-table-column>
                    <el-table-column label="通知方式" prop="noticeMode" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleMode(row.noticeMode)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="发布人" prop="createUser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="发布时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="messageList.pageNum" :pageSize="messageList.pageSize" :total="messageList.total" @changePage="changePageFn" />
                <add-or-update ref="addOrUpdate" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const noticeManage = namespace("noticeManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import addOrUpdate from "./addOrUpdate.vue";
import { Pages } from "@/components";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
        addOrUpdate,
        Pages,
    },
})
export default class Grid extends Vue {
    @noticeManage.State noticeTypeOption; //通知类型
    @noticeManage.State messageList;
    @noticeManage.Action queryNoticeList;
    @noticeManage.State loading;
    @noticeManage.State saveSearch;

    //新增
    onAddOrUpdate(row) {
        let $els: any = this.$refs["addOrUpdate"];
        $els.init(row);
    }

    changePageFn(val) {
        let parame = {
            ...this.saveSearch,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };

        this.queryNoticeList(parame);
    }
    // 翻译公告类型
    handleType(code) {
        let target = this.noticeTypeOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "-";
    }
    // 翻译通知方式
    handleMode(row) {
        if (row && row instanceof Array) {
            let list: any = [];
            row.map((item) => {
                list.push(this.$code("noticeModeType", item));
            });
            return list.join("，");
        }
    }
}
</script>

<style scoped lang="scss">
</style>
