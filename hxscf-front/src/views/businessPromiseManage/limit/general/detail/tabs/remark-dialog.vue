<template>
    <B-dialog title="备注" :visible="visible" width="460px">
        <div class="container">
            <span v-if="remark">{{remark}}</span>
            <Empty v-else></Empty>
        </div>

        <template slot="footer">
            <el-button class="br-btn-large" @click="close">关 闭</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BDialog, Empty } from "@/components";
@Component({
    components: {
        BDialog,
        Empty,
    },
})
export default class Dialog extends Vue {
    public remark: string = "";
    public visible: boolean = false;

    init(row) {
        this.remark = row.remark || "";
        this.visible = true;
    }

    close() {
        this.visible = false;
    }
}
</script>

<style lang="scss" scoped>
.container {
    text-align: justify;
    color: #333;
    font-size: 12px;
    line-height: 20px;
}
</style>