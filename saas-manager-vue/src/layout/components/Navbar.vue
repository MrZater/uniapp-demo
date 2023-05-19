<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-tooltip
          content="消息"
          effect="dark"
          placement="bottom"
        >
          <router-link
            to="/messages/inform"
            class="right-menu-item hover-effect"
          >
            <el-badge
              :is-dot="$store.getters.unReadMessage"
              class="item"
            >
              <svg-icon
                class="svgicon"
                icon-class="inform"
              />
            </el-badge>
          </router-link>
        </el-tooltip>
        <el-tooltip
          content="帮助中心"
          effect="dark"
          placement="bottom"
          class="help-center"
        >
          <ruoyi-doc
            id="ruoyi-doc"
            class="right-menu-item hover-effect"
          />
        </el-tooltip>

        <el-dropdown
          v-if="$store.state.user.roles[0] !== 'MEDIA'"
          class="right-menu-item hover-effect"
          trigger="hover"
          style="margin-right: 5px"
        >
          <span
            class="dropdown"
            style="font-size: 13px"
          >接入中心<i
            style="margin-left: 3px; font-size: 13px"
            class="el-icon-caret-bottom"
          /></span>
          <el-dropdown-menu slot="dropdown">
            <!-- Medpro版本 -->
            <el-dropdown-item
              v-if="$store.state.user.roles[0] === 'SUPER_ADMIN'"
              :class="{
                bottomline: true,
                active: path == '/Accesscenter/VersionAdmin',
              }"
            >
              <router-link
                to="/Accesscenter/VersionAdmin"
              >
                {{ $store.getters.title }}版本
              </router-link>
            </el-dropdown-item>
            <!-- 广告原版本 -->
            <el-dropdown-item
              v-if="$store.state.user.roles[0] === 'SUPER_ADMIN'"
              :class="{
                bottomline: true,
                active: path == '/Accesscenter/advertVersionAdmin',
              }"
            >
              <router-link
                to="/Accesscenter/advertVersionAdmin"
              >
                广告源版本
              </router-link>
            </el-dropdown-item>
            <!-- SDK下载 -->
            <el-dropdown-item
              :class="{
                bottomline: true,
                active: path == '/Accesscenter/SDKupload',
              }"
            >
              <router-link
                to="/Accesscenter/SDKupload"
              >
                SDK下载
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="hover"
      >
        <span
          class="dropdown"
          style="font-size: 13px"
        >
          <svg-icon
            icon-class="user"
            style="margin-right: 5px"
          />{{
            $store.state.user.username
          }}<i
            style="margin-left: 3px; font-size: 14px"
            class="el-icon-caret-bottom"
          /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-if="
              $store.getters.roles[0] === 'SUPER_ADMIN' ||
                $store.getters.roles[0] === 'ADMIN' ||
                $store.getters.roles[0] == 'MANAGEMENT' ||
                $store.getters.roles[0] == 'OPERATOR_DIRECTOR' ||
                $store.getters.roles[0] == 'BUSINESS_DIRECTOR' ||
                $store.getters.roles[0] == 'TECHNOLOGY' ||
                $store.getters.roles[0] == 'BUSINESS'
            "
            :class="{
              bottomline: true,
              active: path == '/advanced/sonAccount',
            }"
          >
            <router-link to="/advanced/sonAccount">
              账户管理
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item
            :class="{
              bottomline: true,
              active: path == '/advanced/loginMsg',
            }"
          >
            <router-link to="/advanced/loginMsg">
              用户信息
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item
            class="bottomline"
            @click.native="logout"
          >
            <span style="display: block; margin-left: 12px">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import RuoyiDoc from '@/components/RuoYi/Doc'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    RuoyiDoc
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    path() {
      return this.$route.path
    }
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/logout').then(() => {
            // location.href = '/#/login';
            this.$router.push({
              path: '/login'
            })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.navbar .el-badge__content.is-fixed {
  top: 22px;
  left: 5px;
}
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }
    .help-center{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      // .message {
      //   line-height: 30px;
      // }
      .svgicon {
        font-size: 20px;
      }
    }

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 14px;
        }
      }
    }
  }
}
.dropdown {
  display: inline-block;
  height: 100%;
  // line-height: 100%;
}
.bottomline {
  font-size: 13px;
  // border: 1px solid #f40;
  &.active {
    border-right: 3px solid #3185fc;
    background-color:  #F4F9FF;
  }
}
</style>
