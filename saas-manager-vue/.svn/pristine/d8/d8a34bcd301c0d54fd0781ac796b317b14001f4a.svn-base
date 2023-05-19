<template>
  <div class="creative-review-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SuperAdminCreativeReview from './admin'
import UserCreativeReview from './user'

export default {
  name: 'Creative',
  components: { SuperAdminCreativeReview, UserCreativeReview },
  data() {
    return {
      currentRole: 'UserCreativeReview'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('super_admin')) {
      this.currentRole = 'UserCreativeReview'
    }
  }
}
</script>

<style scoped>

</style>
