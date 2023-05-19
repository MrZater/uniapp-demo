<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                菜单列表
            </template>
            <template slot="extra-btn">
                <renderBtn code="plate_permission_manager_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <zk-table ref="table" index-text="#" :stripe="props.stripe" :border="props.border" :show-header="props.showHeader" :show-summary="props.showSummary"
                    :show-row-hover="props.showRowHover" :show-index="props.showIndex" :tree-type="props.treeType" :is-fold="props.isFold" :expand-type="props.expandType"
                    :selection-type="props.selectionType" :data="allResourceList" :columns="columns" @checkbox-click="handleClick" v-loading="loading">
                    <template slot="icon" slot-scope="scope">
                        <i :class="`${getClass(scope.row.icon)}`"></i>
                    </template>
                    <template slot="resType" slot-scope="scope">
                        {{$code('resType',scope.row.resType)}}
                    </template>
                    <template slot="resOperType" slot-scope="scope">
                        {{$code('resOperType',scope.row.resOperType)}}
                    </template>
                    <template slot="radio" slot-scope="scope">
                        <renderBtn code="plate_permission_manager_upd">
                            <el-button @click="handleClick('2',scope.row)" type="text" size="mini">编辑</el-button>
                        </renderBtn>

                        <renderBtn code="plate_permission_manager_del">
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="handleRemove(scope)">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </renderBtn>
                    </template>
                </zk-table>
                <child-dialog :dialogData="dialogData" ref="dialog" class="common-dialog" :dialogType="dialogType" :authorityListArry="authorityListArry" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";
const authorityManage = namespace("authorityManage");
@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
    },
})
export default class Grid extends Vue {
    @authorityManage.State allResourceList;
    @authorityManage.State authorityListArry;
    @authorityManage.Action queryAllResource;
    @authorityManage.Action queryDeleteAuthority;
    @authorityManage.State loading;

    dialogData = {};
    dialogType = "1";
    props = {
        stripe: false, //是否显示间隔斑马纹
        border: false, //是否显示纵向边框
        showHeader: true, //是否显示表头
        showSummary: false, //是否显示表尾合计行
        showRowHover: true, //鼠标悬停时，是否高亮当前行
        showIndex: false, //是否显示数据索引
        treeType: true, //是否为树形表格
        isFold: true, //树形表格中父级是否默认折叠
        expandType: false, //是否为展开行类型表格（为 True 时，需要新增作用域插槽, 它可以获取到 row, rowIndex)
        selectionType: false, //是否显示间隔斑马纹
    };
    columns = [
        {
            label: "菜单名称",
            prop: "resName",
            width: "250",
        },
        {
            label: "父节点名称",
            prop: "resPname",
            width: "150",
        },
        {
            label: "图标",
            prop: "resIcon",
            type: "template",
            template: "icon",
        },
        // {
        //     label: "类型",
        //     type: "template",
        //     template: "resType",
        // },
        {
            label: "使用类型",
            type: "template",
            template: "resOperType",
        },
        {
            label: "访问Url",
            prop: "resUrl",
            width: "350",
        },
        {
            label: "排序号",
            prop: "orders",
        },
        {
            label: "操作",
            type: "template",
            template: "radio",
            width: "150",
        },
    ];
    getClass(iconType) {
        let [type, icon] = iconType ? iconType.split("/") : ["", ""];
        switch (type) {
            case "built-facet":
            case "built-linear":
                return `el-icon-${icon} `;
                break;
            case "user-defined":
                return `iconfont ${icon}`;
                break;
            default:
                return;
                break;
        }
    }
    //新增
    handleAdd() {
        let dialogData = {
            resOperType: "1",
            resType: "",
            resName: "",
            orders: "",
            icon: "",
            resPcode: "",
            resUrl: "",
        };
        this.dialogType = "1";
        this.dialogData = dialogData;
        let $els = this.$refs["dialog"];
        $els["open"]();
    }
    //编辑
    handleClick(str, row) {
        this.dialogType = str;
        this.dialogData = row;
        let $ele = this.$refs["dialog"];
        $ele["open"]();
    }

    //删除
    handleRemove(scope) {
        this.queryDeleteAuthority({
            resCode: scope.row.resCode,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryAllResource();
        });
    }
}
</script>

<style lang="scss">
</style>
