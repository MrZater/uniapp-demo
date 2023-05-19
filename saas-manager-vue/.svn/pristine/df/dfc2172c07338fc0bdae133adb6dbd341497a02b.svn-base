<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import dashboardAdmin from './admin'
import dashboardUser from './user'
export default {
  name: 'Dashboard',
  components: { dashboardAdmin, dashboardUser },
  data() {
    return {
      currentRole: 'dashboardAdmin'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.currentRole = 'dashboardAdmin'
  }
}
</script>

<style scoped>

</style>
