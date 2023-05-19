<!--
 * @Author: mingliang.zhu
 * @Date: 2020-11-22 11:23:45
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-01-06 09:53:24
 * @Description: 
 -->
<template>
    <el-tree ref="tree" class="br-tree br-tree-line" :indent="0" :data="allResouse" :show-checkbox="true" node-key="id" accordion @check="handleCheck" :default-expand-all="false"
        :default-checked-keys="checkDataArry" :props="defaultProps">
    </el-tree>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class orgTree extends Vue {
    btnloading: boolean = false;
    defaultProps: object = {
        children: "children",
        label: "label",
    };
    isChecked: boolean = false;//供父组件使用
    submitID = [];
    @Prop() checkDataArry;
    @Prop() allResouse;
    @Prop() disabledFlag;
    @Watch("allResouse")
    onchange(val) {
        if (this.disabledFlag == "see") {
            return this.R((i) => {
                if (i._disabled === undefined) {
                    i._disabled = i.disabled === undefined ? false : i.disabled;
                }
                i.disabled = true;
            }, val);
        }
    }

    handleCheck(a, b) {
        this.isChecked = true;
        var tempArry: any = [];
        // 处理选中的数据
        for (let i = 0; i < b.halfCheckedNodes.length; i++) {
            tempArry.push(b.halfCheckedNodes[i].id);
        }
        let submit = tempArry.concat(b.checkedKeys);
        this.updateSelectData(submit);
    }
    updateSelectData(arry) {
        this.submitID = arry;
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
    // 清空值，供父组件使用
    reset() {
        this.submitID = [];
        (this.$refs["tree"] as any).setCheckedKeys([]);
    }
}
</script>
<style lang="scss">
</style>
