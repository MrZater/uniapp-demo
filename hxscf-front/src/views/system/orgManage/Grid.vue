<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-10 09:38:27
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-17 11:03:03
 * @Description: 
-->
<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                机构管理列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="organization_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleClick('1',{})">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <zk-table ref="table" index-text="#" :stripe="props.stripe" :border="props.border" :show-header="props.showHeader" :show-summary="props.showSummary"
                    :show-row-hover="props.showRowHover" :show-index="props.showIndex" :tree-type="props.treeType" :is-fold="props.isFold" :expand-type="props.expandType"
                    :selection-type="props.selectionType" :data="orgList" :columns="columns" v-loading="loading">
                    <template slot="createTime" slot-scope="scope">
                        {{scope.row.createTime | time}}
                    </template>
                    <template slot="orgFlag" slot-scope="scope">
                        {{ $code("orgTypes",scope.row.orgFlag)}}
                    </template>
                    <template slot="isDel" slot-scope="scope">
                        <el-tag size="mini" :type="scope.row.isDel | statusFilter">{{ $code("costStatus",scope.row.isDel ) }}</el-tag>
                    </template>
                    <template slot="radio" slot-scope="scope">
                        <renderBtn code="organization_manage_add">
                            <el-button @click="handleClick('3',scope.row)" type="text" size="mini">新增</el-button>
                        </renderBtn>
                        <renderBtn code="organization_manage_upd">
                            <el-button @click="handleClick('2',scope.row)" type="text" size="mini">编辑</el-button>
                        </renderBtn>
                        <renderBtn code="organization_manage_use">
                            <el-button :disabled="!(scope.row.isDel == '0')" @click="handleFlag(scope.row)" type="text" size="mini">
                                启用
                            </el-button>
                        </renderBtn>
                        <renderBtn code="organization_manage_stop">
                            <el-button :disabled="!(scope.row.isDel == '1')" @click="handleFlag(scope.row)" type="text" size="mini">
                                停用
                            </el-button>
                        </renderBtn>
                        <renderBtn code="organization_manage_del">
                            <el-popconfirm title="确认删除吗？" @onConfirm="handleDel(scope.row)">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </renderBtn>
                    </template>
                </zk-table>
                <child-dialog ref="dialog" class="common-dialog" :dialogType="dialogType" :orgDialogData="orgDialogData" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./orgDialog.vue";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const organizationManage = namespace("orgManage");

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                "1": "success", // 启用
                "0": "danger", // 停用
            };
            return statusMap[status];
        },
    },
})
export default class Grid extends Vue {
    @organizationManage.Action saveSearchDataFN;
    @organizationManage.Action queryOrgList;
    @organizationManage.Action startOrganizationFN;
    @organizationManage.Action stopOrganizationFN;
    @organizationManage.Action queryDeleteOrg;
    @organizationManage.State orgList;
    @organizationManage.State loading;

    orgDialogData = {};
    dialogType = "1";
    props = {
        stripe: false, //是否显示间隔斑马纹
        border: false, //是否显示纵向边框
        showHeader: true, //是否显示表头
        showSummary: false, //是否显示表尾合计行
        showRowHover: true, //鼠标悬停时，是否高亮当前行
        showIndex: false, //是否显示数据索引
        treeType: true, //是否为树形表格
        isFold: false, //树形表格中父级是否默认折叠
        expandType: false, //是否为展开行类型表格（为 True 时，需要新增作用域插槽, 它可以获取到 row, rowIndex)
        selectionType: false, //是否显示间隔斑马纹
    };
    columns = [
        {
            label: "机构名称",
            prop: "label",
        },
        {
            label: "机构类型",
            prop: "orgFlag",
            type: "template",
            template: "orgFlag",
        },
        {
            label: "组织代码",
            prop: "orgNo",
        },
        {
            label: "排序",
            prop: "orgOrder",
        },
        {
            label: "创建时间",
            prop: "createTime",
            type: "template",
            template: "createTime",
        },
        {
            label: "状态",
            prop: "isDel",
            type: "template",
            template: "isDel",
        },
        {
            label: "操作",
            type: "template",
            template: "radio",
            width: "200",
        },
    ];

    //新建1 编辑2   当前机构名称下新建3
    handleClick(type, val) {
        if (type == "1") {
            let dialogData = {
                orgFlag: "", //机构类型
                orgName: "", //机构名称
                orgOrder: "", //显示顺序
                orgPcode: "", //上级机构
                orgNo: "", // 组织代码
                flag: "", // orgFlag== 1 部门  0 企业
            };
            this.orgDialogData = dialogData;
        } else if (type == "2") {
            let dialogData = {
                orgFlag: val.orgFlag, //机构类型
                orgName: val.label, //机构名称
                orgOrder: val.orgOrder, //显示顺序
                orgPcode: val.orgPcode, //上级机构
                orgNo: val.orgNo, // 组织代码
                orgCode: val.id,
                flag: val.orgFlag, // orgFlag== 1 部门  0 企业
            };
            this.orgDialogData = dialogData;
        } else if (type == "3") {
            // 在当前机构名称下新建
            let dialogData = {
                orgFlag: "", //机构类型
                orgName: "", //机构名称
                orgOrder: "", //显示顺序
                orgPcode: val.id, //上级机构
                orgNo: "", // 组织代码
                flag: val.orgFlag, // orgFlag== 1 部门  0 企业
            };
            this.orgDialogData = dialogData;
        }
        this.dialogType = type;
        let $ele = this.$refs["dialog"];
        $ele["open"]();
    }
    //启停用
    handleFlag(val) {
        let params = {
            orgCode: val.id,
        };
        // 0停用 掉启用接口   1启用 掉停用接口
        const formAPI =
            val.isDel == "0"
                ? this.startOrganizationFN
                : this.stopOrganizationFN;
        formAPI(params).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryOrgList({ flag: "1" });
        });
    }
    //取消按钮
    cancelPop(scope, index) {
        this.closePopver(scope, index);
    }
    //删除确定按钮
    handleDel(row) {
        this.queryDeleteOrg({ orgCode: row.id }).then((res) => {
            this.$message({
                type: "success",
                message: res,
            });
            this.queryOrgList({ flag: "1" });
        });
    }
    // 关闭安popver
    closePopver(scope, index) {
        scope._self.$refs[index].doClose();
    }
}
</script>
<style scoped lang="scss">
</style>