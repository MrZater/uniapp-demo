<template>
  <div class="saas-button-group">
    <div>
      <template v-for="(platform, index) in platforms">
        <button
          v-show="(disabled && platform.active) || !disabled"
          :key="index"
          type="button"
          class="saas-button"
          @click="dealClick(platform)"
        >
          <div
            class="plat"
            :class="{ active: platform.active }"
          >
            <div class="icon">
              <el-image
                v-if="platform.accessType && platform.accessType != 2"
                :class="index == 5 ? 'current' : ''"
                :src="platform.icon"
              />
              <div
                v-else
                class="name"
              >
                {{ platform.name }}
              </div>
            </div>
          </div>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { platformLinkList } from '@/api/app'
export default {
  name: 'AppPlatform',
  props: {
    isBatch: {
      type: Boolean,
      required: false
    },
    appId: {
      type: String,
      required: true
    },
    linkedShow: {
      type: Boolean,
      required: true,
      default: true
    },
    active: {
      type: Number,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      expend: false,
      platId: null,
      platforms: [],
      dialogPlatLinkVisible: false,
      link: {},
      platTemp: {},
      accountTemp: {},
      accountOptionsAll: [],
      accountOptions: [],
      dialogAccountVisible: false
    }
  },

  computed: {
    unUseNum() {
      let num = 0
      this.platforms.forEach((item) => {
        if (item.isUsed == 0) {
          num++
        }
      })
      return num
    },
    useNum() {
      let num = 0
      this.platforms.forEach((item) => {
        if (item.isUsed == 1) {
          num++
        }
      })
      return num
    }
  },
  watch: {
    appId: {
      handler(newValue) {
        this.appId = newValue
        this.getAppPlatform()
      }
    },
    platforms: {
      handler(newValue) {
        this.platforms = newValue
      },
      deep: true
    },
    active: {
      handler(newValue) {
        this.freshPlatActive()
      },
      deep: true
    }
  },
  mounted() {
    this.getAppPlatform()
  },
  methods: {
    freshPlatActive() {
      this.platforms.map((v) => {
        if (this.active) {
          v.active = v.id === this.active
          // this.$set(v, 'active', v.id === this.active)
          if (this.active == v.id) {
            // 编辑回显
            this.$emit('platAppId', v.platAppId)
            this.$emit('accessType', v.accessType)
            this.$emit('settleType', v.settleType)
            this.$emit('getplatrow', v)
            this.$emit('id', v.id)
          }
        } else {
          v.active = false
          // this.$set(v, 'active', false)
        }
      })
      this.$forceUpdate()
    },
    getAppPlatform() {
      platformLinkList(this.appId).then((res) => {
        res.data.map((v) => {
          if (this.active) {
            v.active = v.id === this.active
          }
        })
        if (this.isBatch) {
          res.data = res.data.filter((item) => {
            return item.accessType == '0'
          })
        }
        this.platforms = res.data
        this.freshPlatActive()
      })
    },

    dealClick(plat) {
      // 用户在弹框中显示 平台对应得appid
      this.$emit('platAppId', plat.platAppId)
      this.$emit('accessType', plat.accessType)
      this.$emit('settleType', plat.settleType)
      this.$emit('getplatrow', plat)
      this.$emit('id', plat.id)

      if (!this.disabled) {
        this.platforms.map((v) => {
          v.active = false
          return v
        })
        plat.active = true
        this.$forceUpdate()
        this.$emit('selectPlatId', plat.id)
      } else {
        this.platforms.forEach((item) => (item.active = false))
        this.platforms.forEach((item) => {
          if (item.id == plat.id) {
            item.active = true
          }
        })
        this.$forceUpdate()
        this.$emit('selectPlatId', plat.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.saas-button-group {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  .title {
    color: #338aff;
    margin-bottom: 20px;
  }
  .saas-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin: 0 10px 10px 0;
    border: 0px solid #fff;
    border-radius: 4px;
    width: 80px;
    height: 35px;
    text-align: center;
    cursor: pointer;
    .plat {
      // position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      border-radius: 3px;
      // padding-top: 1px;
      .el-image {
        vertical-align: bottom;
        width: 80px;
        height: 35px;
      }
      .name {
        padding: 0 5px 0 5px;
        display: inline-block;
        width: 80px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // .current {
      //   width: 100% !important;
      // }
      .plat-cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 100%;
        height: 35px;
        border-radius: 2px;
        padding-top: 1px;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        div {
          line-height: 35px;
          color: #ddd;
          font-size: 13px;
        }
      }
    }
  }
}
.active {
  background-color: #ebf3ff;
  box-shadow: 4px 4px 5px #f40;
}
.unuse {
  width: 100%;
  .expendBtn {
    height: 40px;
    line-height: 40px;
    width: 100%;
    display: flex;
    // justify-content: space-between;
    padding-right: 30px;
  }
}

.text-a {
  color: #338aff;
}
</style>
