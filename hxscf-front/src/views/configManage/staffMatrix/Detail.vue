<template>
    <el-dialog title="详情" :visible.sync="visible" width="40%" class="br-dialog resetTable">
        <el-form :inline="true" :model="addForm" size="small" v-loading="loading">
            <el-form-item class="br-form-item-label" label="组织名称" prop="orgName">
                <span style="font-size:12px">{{addForm.orgName}}</span>
            </el-form-item>
            <el-table stripe :data="addForm.list" class="br-table" style="width: 100%">
                <el-table-column label="业务部门" prop="orgName" width="150px" fixed="left">
                    <template slot-scope="scope">
                        {{scope.row.orgName}}
                    </template>
                </el-table-column>
                <el-table-column v-for="(item,index) in tbcolumns" :key="index" :prop="item.prop" :label="item.label" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row[item.prop]?scope.row[item.prop].join("，"):"---"}}
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button class="br-btn-large" @click="onCancel">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const staffMatrix = namespace("staffMatrix");
import { ColumnTable } from "@/components";

@Component({
    components: {
        ColumnTable,
    },
})
export default class Dialog extends Vue {
    @staffMatrix.State deptTree;
    @staffMatrix.Action queryUserTree;
    @staffMatrix.Action queryList;
    @staffMatrix.State searchData;
    @staffMatrix.Action queryDetail;

    public loading: boolean = false;

    public tbcolumns: any = [];

    public visible: boolean = false;

    public addForm: any = {
        orgName: "",
        list: [],
    };

    init(row) {
        this.$set(this.addForm, "orgName", row.orgName);

        this.loading = true;

        this.queryDetail({ orgCode: row.orgCode })
            .then((res) => {
                let list: any = [];
                res.forEach((item, index) => {
                    let rowItem: any = {
                        orgName: item.orgName,
                    };

                    let newSet = new Set();
                    item.nodeList.forEach((sub) => {
                        // 获取动态表格表头
                        newSet.add({
                            label: sub.nodeName,
                            prop: "key" + newSet.size,
                        });

                        // 获取动态表格值
                        let cache: any = [];

                        sub.userList.forEach((ssb) => {
                            cache.push(ssb.realName);
                        });

                        rowItem["key" + (newSet.size - 1)] = cache;
                    });

                    this.tbcolumns = Array.from(newSet);

                    list.push(rowItem);
                });

                this.$set(this.addForm, "list", list);
            })
            .finally(() => (this.loading = false));
        this.visible = true;
    }

    onCancel() {
        this.visible = false;
    }
}
</script>
<style scope lang="scss">
.resetTable {
    .el-table thead tr:first-of-type th:first-of-type:before {
        content: "审批节点";
        text-align: center;
        position: absolute;
        width: 152px;
        height: 1px;
        top: 10px;
        right: -45px;
    }

    .el-table thead tr:first-of-type th:first-of-type:after {
        content: "业务部门";
        text-align: center;
        position: absolute;
        width: 138px;
        bottom: 10px;
        left: -40px;
    }
    .el-table thead tr:first-of-type th:first-of-type .cell {
        position: absolute;
        top: 0;
        left: 0;
        width: 204px;
        height: 1px;
        background-color: #dcdfe6;
        display: block;
        text-align: center;
        transform: rotate(17.3deg);
        transform-origin: top left;
        -ms-transform: rotate(17.3deg);
        -ms-transform-origin: top left;
        -webkit-transform: rotate(17.3deg);
        -webkit-transform-origin: top left;
    }

    .el-table td,
    .el-table th.is-leaf {
        border-right: 1px solid #dcdfe6;
    }
}
</style>