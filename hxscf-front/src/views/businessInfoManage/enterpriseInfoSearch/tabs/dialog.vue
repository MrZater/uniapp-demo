<template>
    <B-dialog title="详情" :visible="dialogVisible" width="600px" @close="close" :append-to-body="true">
        <div class="container">
            <span v-if="content">{{content}}</span>
            <Empty v-else></Empty>
        </div>

        <template slot="footer">
            <el-button class="br-btn-large" @click="close">关 闭</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

import { BDialog, Empty } from "@/components";

@Component({
    components: {
        BDialog,
        Empty,
    },
})
export default class Dialog extends Vue {
    @Prop(String) dialogData;
    public content: string = "";
    dialogVisible: boolean = false;

    @Watch("dialogVisible")
    onChanged(val, oldVal) {
        if (val) {
            this.content = this.dialogData;
        }
    }

    open() {
        this.dialogVisible = true;
    }

    close() {
        this.dialogVisible = false;
    }
}
</script>
<style lang="scss">
.container {
    text-align: justify;
    color: #333;
    font-size: 12px;
    line-height: 20px;
}
</style>
