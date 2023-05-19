<template>
  <div class="add-custplat-container">
    <el-dialog
      :title="isAdd ? '添加' : '编辑' + '自定义广告源'"
      width="600px"
      :visible.sync="dialogFlag"
      @close="closeDiolag"
    >
      <el-form
        ref="form"
        :model="query"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="广告源名称"
          prop="platName"
        >
          <el-input
            v-model="query.platName"
            style="width: 50%"
            :disabled="!isAdd"
            placeholder="请填写广告源名称"
            :max-length="10"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-form-item
          v-if="isAdd"
          label="账户名称"
          prop="plactAccountName"
        >
          <el-input
            v-model="query.plactAccountName"
            style="width: 50%"
            placeholder="请填写账户名称"
            :max-length="30"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-form-item
          v-if="!isAdd"
          label="账户名称"
          prop="name"
        >
          <el-input
            v-model="query.name"
            style="width: 50%"
            placeholder="请填写账户名称"
            :max-length="30"
            :show-word-limit="true"
          />
        </el-form-item>
        <div class="package_name">
          <span>
            Adapter类名<tips
              :content="`Adapter由开发者自定义，为各个广告样式配置相应的Adapter类名。${title} SDK将根据此Adapter类名反射调用相应的Adapter。`"
              :title="''"
              :is-show="true"
            /></span>
        </div>
        <div class="package_box">
          <div class="Android">
            <span class="package_title">Android</span>
            <el-form-item
              label="开屏"
              prop="androidKp"
            >
              <el-input
                v-model="query.androidKp"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
            <el-form-item
              label="插屏"
              prop="androidCp"
            >
              <el-input
                v-model="query.androidCp"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
            <el-form-item
              label="激励视频"
              prop="androidJlsp"
            >
              <el-input
                v-model="query.androidJlsp"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
            <el-form-item
              label="原生模板"
              prop="androidYsmb"
            >
              <el-input
                v-model="query.androidYsmb"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
            <el-form-item
              label="原生自渲染"
              prop="androidYszxr"
            >
              <el-input
                v-model="query.androidYszxr"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
            <el-form-item
              label="横幅"
              prop="androidHf"
            >
              <el-input
                v-model="query.androidHf"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
            <el-form-item
              label="全屏视频"
              prop="androidQpsp"
            >
              <el-input
                v-model="query.androidQpsp"
                style="width: 80%"
                placeholder="示例：com.mob.unit.ad.CustomAdapter"
              />
            </el-form-item>
          </div>
          <div class="os">
            <span class="package_title">IOS</span>
            <el-form-item
              label="开屏"
              prop="iosKp"
            >
              <el-input
                v-model="query.iosKp"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
            <el-form-item
              label="插屏"
              prop="iosCp"
            >
              <el-input
                v-model="query.iosCp"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
            <el-form-item
              label="激励视频"
              prop="iosJlsp"
            >
              <el-input
                v-model="query.iosJlsp"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
            <el-form-item
              label="原生模板"
              prop="iosYsmb"
            >
              <el-input
                v-model="query.iosYsmb"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
            <el-form-item
              label="原生自渲染"
              prop="iosYszxr"
            >
              <el-input
                v-model="query.iosYszxr"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
            <el-form-item
              label="横幅"
              prop="iosHf"
            >
              <el-input
                v-model="query.iosHf"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
            <el-form-item
              label="全屏视频"
              prop="iosQpsp"
            >
              <el-input
                v-model="query.iosQpsp"
                style="width: 80%"
                placeholder="示例：customAdapterClassName"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="closeDiolag"
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="submitLoading"
          @click="handleOk"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addCustPlat, updatePlatform } from '@/api/plat'
import tips from '@/components/tips/HelpHint/HelpHint.vue'
export default {
  name: 'AddCustPlat',
  components: { tips },
  props: {
    form: {
      type: Object,
      default: {}
    },
    addCustPlatDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitLoading: false,
      query: {},
      rules: {},
      dialogFlag: false
    }
  },
  computed: {
    title() {
      return this.$store.getters.title
    }
  },
  watch: {
    form: {
      handler(val) {
        this.query = JSON.parse(JSON.stringify(val))
      }
    },
    addCustPlatDialog: {
      handler(val) {
        this.dialogFlag = val
      }
    }
  },
  methods: {
    closeDiolag() {
      this.$emit('closeDialog')
    },

    handleOk() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return
        this.submitLoading = true
        let resp = null
        if (this.isAdd) {
          resp = await addCustPlat(this.query)
        } else {
          resp = await updatePlatform(this.query)
        }

        let msg = this.isAdd ? '添加成功！' : '编辑成功！'
        if (resp.code == 200) {
          this.$message.success(msg)
          this.submitLoading = false
          this.$emit('addPlatSuccess')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-custplat-container {
  margin-left: 10px;
  .package_name {
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;

    font-size: 14px;
    font-weight: bold;
  }
  .package_box {
    width: 100%;
    display: flex;
    .Android,
    .os {
      border: 1px solid #ccc;
      padding: 10px;
      width: 50%;
      .package_title {
        display: inline-block;
        width: 100%;
        border-bottom: 1px solid #ccc;
        padding-left: 10px;
        font-weight: bold;
        margin-bottom: 10px;
        padding-bottom: 5px;
      }
    }
    .Android {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-right: none;
    }
    .os {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
