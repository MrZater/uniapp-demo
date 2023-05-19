<template>
  <div class="warning-report-container">
    <el-tabs
      v-if="
        $store.getters.roles[0] == 'ADMIN' ||
          $store.getters.roles[0] == 'SUPER_ADMIN'
      "
      v-model="activeName"
      class="tabs"
    >
      <el-tab-pane
        lazy
        label="预警报表"
        name="report"
      >
        <Report v-if="activeName == 'report'" />
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="预警规则"
        name="rules"
      >
        <Rules v-if="activeName == 'rules'" />
      </el-tab-pane>
    </el-tabs>
    <Report
      v-if="
        $store.getters.roles[0] &&
          $store.getters.roles[0] != 'ADMIN' &&
          $store.getters.roles[0] != 'SUPER_ADMIN'
      "
    />
  </div>
</template>

<script>
import Rules from './rules'
import Report from './report'
export default {
  name: 'WarningReport',
  components: { Rules, Report },
  data() {
    return {
      activeName: 'report'
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.query) {
      this.activeName = 'rules'
    }
  }
}
</script>

<style lang="scss" scoped>
.warning-report-container {
  background-color: #fff;
  padding: 15px;
}
</style>
