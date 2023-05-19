<template>
  <el-drawer title="设置中心" size="300px" :visible.sync="show" :with-header="false" @close="closeDrawer">
    <slot />
  </el-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class rightPanel extends Vue {
  @Prop(Boolean) showPannel;

  get show() {
    return this.showPannel;
  }
  set show(val) {
    this.$emit("close", val);
  }
  closeDrawer() {
    this.$emit("close", false);
  }
}
</script>


<style lang="scss" scoped>
</style>
