<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                异常事件管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="log_manage_del">
                    <el-button class="br-btn" type="primary" @click="onAddOrUpdate">新建</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="messageList.list" class="br-table" v-loading="loading">
                    <el-table-column label="异常事件编号" prop="abnormalId" show-overflow-tooltip></el-table-column>
                    <el-table-column label="企业名称" prop="companyName" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-link type="primary" :underline="false">{{row.companyName}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="组织名称" prop="orgName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="异常事件主题" prop="abnormalTheme" show-overflow-tooltip></el-table-column>
                    <el-table-column label="异常类型" prop="abnormalType" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{handleType(row.abnormalType)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="abnormalStatus" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{$code("abnormalStatus",row.abnormalStatus)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createUser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改人" prop="modifyUser" show-overflow-tooltip></el-table-column>
                    <el-table-column label="修改时间" prop="modifyTime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.modifyTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="{row}">
                            <renderBtn code="industry_template_subcheck">
                                <el-button type="text" size="mini" @click="onDetail(row)">详情</el-button>
                            </renderBtn>
                        </template>
                    </el-table-column>
                </el-table>
                <Pages :pageNum="messageList.pageNum" :pageSize="messageList.pageSize" :total="messageList.total" @changePage="changePageFn" />
                <add-or-update ref="addOrUpdate" />
                <detail ref="detail" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const abnormalEvent = namespace("abnormalEvent");
import ContentWrapper from "@/components/ContentWrapper.vue";
import addOrUpdate from "./addOrUpdate.vue";
import Detail from "./detail.vue";
import { Pages } from "@/components";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
        addOrUpdate,
        Detail,
        Pages,
    },
})
export default class Grid extends Vue {
    @abnormalEvent.State eventTypeOption; //通知类型
    @abnormalEvent.State messageList;
    @abnormalEvent.Action queryNoticeList;
    @abnormalEvent.State loading;
    @abnormalEvent.State saveSearch;

    // 新增
    onAddOrUpdate() {
        let $els: any = this.$refs["addOrUpdate"];
        $els.init();
    }

    // 详情
    onDetail(row) {
        let $els: any = this.$refs["detail"];
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
    // 翻译异常类型
    handleType(code) {
        let target = this.eventTypeOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "-";
    }
}
</script>

<style scoped lang="scss">
</style>
