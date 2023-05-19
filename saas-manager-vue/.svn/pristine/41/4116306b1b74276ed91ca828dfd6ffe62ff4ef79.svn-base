<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="!collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="isMedPro"
          draggable="false"
          :src="origin + '/dynamic_logo.png'"
          class="sidebar-logo-isM"
        >
        <div
          v-else-if="!isMedPro"
          class="logo_box"
        >
          <img
            v-if="logo"
            draggable="false"
            :src="logo"
            class="sidebar-logo"
          >
          <h1 class="sidebar-title">
            {{ title }}
          </h1>
        </div>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="isMedPro"
          draggable="false"
          :src="origin+'/dynamic_logo.png'"
          class="sidebar-logo sidebar-logo-iscooapse"
        >
        <img
          v-else-if="logo"
          draggable="false"
          :src="logo"
          class="sidebar-logo"
        >
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo.png'
import variables from '@/styles/variables.scss'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: logoImg
    }
  },
  computed: {
    variables() {
      return variables
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme
    }
  },
  computed: {
    origin() {
      return this.$store.getters.origin
    },
    isMedPro() {
      return this.$store.getters.isMedPro
    },
    title() {
      return this.$store.getters.title
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #fff;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo-isM {
      width: 80%;
      height: 30px;
      vertical-align: middle;
      margin-right: 10px;
    }
    & .sidebar-logo {
      width: 28px;
      height: 30px;
      vertical-align: middle;
      margin-right: 10px;
      &.sidebar-logo-iscooapse{
        padding-left: 10px;
        width: 170px;
        height: 32px;

      }
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #031e39;
      font-weight: 600;
      line-height: 50px;
      font-size: 26px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
