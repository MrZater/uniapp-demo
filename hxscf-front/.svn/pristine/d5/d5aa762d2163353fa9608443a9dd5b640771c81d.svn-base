<template>
    <B-dialog title="详情" :visible="dialogVisible" width="460px" @close="close">
        测试111
    </B-dialog>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BDialog } from "@/components";

@Component({
    components: {
        BDialog,
    },
})
export default class Dialog extends Vue {
    dialogVisible: boolean = false;

    open() {
        this.dialogVisible = true;
    }

    close() {
        this.dialogVisible = false;
    }
}
</script>

<style lang="scss" scoped>
</style>
