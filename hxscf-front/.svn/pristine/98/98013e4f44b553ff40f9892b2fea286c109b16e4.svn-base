<template>
    <div class="template-container">
        <el-form :model="formData" :rules="rules" ref="forms" size="small">
            <div>
                <div class="sub-title">业务开展组织<el-button type="primary" class="br-btn" @click="onAdd(formData.list)">新增</el-button>
                </div>
                <el-table stripe border :data="formData.list" class="br-table">
                    <el-table-column label="组织名称" prop="orgPname">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.orgPname' " class="br-form-item-label" :rules="rules.orgPname">
                                <el-select v-model="scope.row.orgPname" popper-class="tree-select" class="br-select" :popper-append-to-body="true" :ref="'treeSelect'+scope.$index"
                                    placeholder="请选择组织名称">
                                    <el-option value="null">
                                        <el-tree :data="orgNameList" @node-click="(data)=>onLeavesClick(data,scope.row,scope.$index)" node-key="id" :props="defaultProps">
                                        </el-tree>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="组织代码" prop="orgNo"></el-table-column>
                    <el-table-column label="可使用额度上限" prop="quotaMax">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.quotaMax' " class="br-form-item-label" :rules="rules.quotaMax">
                                <el-input-number v-model.trim="scope.row.quotaMax" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="150" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.list)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
        <remark-dialog ref="remark"></remark-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const configManage = namespace("configManage");
const general = namespace("general");
import RemarkDialog from "./remark-dialog.vue";
@Component({
    components: {
        "remark-dialog": RemarkDialog,
    },
})
export default class creditWay extends Vue {
    @Prop({ default: () => {}, type: Array }) propData;
    @Watch("propData", { deep: true })
    onPropData(val) {
        if (val) {
            this.$set(this.formData, "list", val);
        }
    }
    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList; //组织机构
    @general.Action queryLoginUserOrg;
    public formData: any = {
        list: [],
    };

    public rules = {
        orgPname: [{ required: true, message: "请选择", trigger: "change" }],
        quotaMax: [{ required: true, message: "请输入", trigger: "blur" }],
    };

    defaultProps = {
        children: "children",
        label: "label",
    };

    mounted() {
        this.queryOrgNameList({ flag: "4" });
        if (this.$route.query.handleType === "add") {
            this.queryLoginUserOrg({}).then((res) => {
                let data = {
                    orgPname: res.orgName,
                    orgPcode: res.orgCode,
                    orgNo: res.orgNo,
                    quotaMax: 0,
                };
                this.$set(this.formData.list, "0", data);
            });
        }
    }

    onLeavesClick(data, row, index) {
        this.$set(row, "orgPname", data.label);
        this.$set(row, "orgPcode", data.id);
        this.$set(row, "orgNo", data.orgNo);
        this.$refs["treeSelect" + index]["handleClose"]();
    }

    // 添加
    onAdd(list) {
        list.push({});
    }

    // 备注
    onRemark(row) {
        let $el: any = this.$refs["remark"];
        $el.init(row);
    }

    // 供父组件使用
    handleParams() {
        return this.formData.list;
    }

    // 删除
    onDelete(index, rows) {
        rows.splice(index, 1);
    }
}
</script>

<style scoped lang="scss">
.br-btn {
    position: absolute;
    right: 0px;
    top: -5px;
}
</style>