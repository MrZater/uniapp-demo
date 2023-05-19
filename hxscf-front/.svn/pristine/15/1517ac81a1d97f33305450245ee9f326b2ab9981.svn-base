/*
 * @Author: mingliang.zhu 
 * @Date: 2021-02-22 17:46:18 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 19:56:09
 * @Description: 推送人员树
 */
<template>
    <el-dialog class="br-dialog" title="推送人员" :visible.sync="visible" width="550px" @close="reset" :append-to-body="true" :close-on-click-modal="false">
        <el-tree ref="tree" class="br-tree br-tree-line" :indent="0" show-checkbox node-key="userCode" :data="list" :props="treeProps" @check="onCheck" :default-checked-keys="checkDataArry"
            :expand-on-click-node="false" :default-expand-all="true" :highlight-current="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="data.userCode">
                    <i class="el-icon-user" style="margin-right:5px"></i>{{ node.label }}
                </span>
                <span v-else>
                    <i class="el-icon-folder-opened" style="margin-right:5px"></i>{{ node.label }}
                </span>
            </span>
        </el-tree>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="onSubmit" :loading="btnLoading">保存</el-button>
            <el-button class="br-btn-large" @click="visible = false">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
const noticeManage = namespace("noticeManage");
const userManage = namespace("userManage");
@Component({})
export default class Dialog extends Vue {
    @Prop({ default: () => [], type: Array }) noticeUsers;
    @noticeManage.State noticeTypeOption; //通知类型
    @noticeManage.Action queryNoticeUserList; // 通知人员列表
    @userManage.Action queryList;
    @userManage.State list;
    @Watch("list")
    onchange(val) {
        return this.R((i) => {
            if (i && !i.userCode && !i.children.length) i.disabled = true;
        }, val);
    }
    public isChecked: boolean = false;
    public checkDataArry: any = [];
    public submitID: any = [];
    public treeProps: any = {
        label: "name",
        children: "children",
    };
    visible: boolean = false;
    btnLoading: boolean = false;

    mounted() {
        this.queryList({
            pageNum: 1,
            pageSize: 10,
        });
    }

    onCheck(a, b) {
        this.isChecked = true;
        let submit: any = [];
        // 处理选中的数据
        b.checkedNodes.forEach((item) => {
            item.userCode ? submit.push(item.userCode) : "";
        });

        this.submitID = [...new Set(submit.concat(b.checkedKeys))].filter(
            (item) => item
        );
    }

    init(arr) {
        let ids = arr.map((item) => item.userCode);
        this.checkDataArry = [...ids];
        this.visible = true;
    }

    // 清空值，供父组件使用
    reset() {
        this.submitID = [];
        (this.$refs["tree"] as any).setCheckedKeys([]);
    }

    // 封装函数
    R = (f, s) => {
        s.map(
            (i) => (
                f(i),
                i.children && i.children != undefined
                    ? this.R(f, i.children)
                    : 0,
                i
            )
        );
    };

    // 提交
    onSubmit() {
        let params = {
            userCodeList: this.isChecked
                ? [...this.submitID]
                : this.checkDataArry,
        };

        this.btnLoading = true;
        this.queryNoticeUserList(params)
            .then((res) => {
                this.$emit("update:noticeUsers", res || []);
                this.visible = false;
            })
            .finally(() => (this.btnLoading = false));
    }
}
</script>

<style lang="scss">
</style>
