<template>
  <div class="batch-add-container">
    <div class="header">
      <span
        class="goback"
        @click="goback"
      ><i class="el-icon-back">返回</i></span>
      <h3>批量添加代码位</h3>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <!-- 表头标题 -->
      <div class="title">
        <div class="title_app">
          <div class="image">
            <el-image
              :src="iconUrl ? getCreativeUrl(iconUrl) : '/images/app-none.png'"
              :fit="'fill'"
            />
          </div>
          <div class="titlebox">
            <p class="name">
              <span class="label">
                <svg-icon
                  :icon-class="os === 1 ? 'android' : os === 0 ? 'ios' : ''"
                />{{ appName }}</span>
            </p>
            <p class="id">
              <span class="label" />{{ appId }}
            </p>
          </div>
        </div>
        <div class="title_place">
          <div class="titlebox">
            <p class="name">
              <span class="label">{{ placeName }}</span>
            </p>
            <p class="id">
              <span class="label">{{ placeId }}</span>
            </p>
          </div>
        </div>
        <div class="title_position">
          <div class="titlebox">
            <p class="name position">
              <span class="label">{{ positionName }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 广告源 -->
      <div
        v-if="appId"
        class="platform"
      >
        <div class="label">
          广告源：
        </div>
        <div class="platformbox">
          <AppPlatform
            class="appplatform"
            :is-batch="true"
            :app-id="appId"
            :linked-show="false"
            :active="null"
            :disabled="false"
            :is-edit="false"
            @getplatrow="getplatrow"
          />
        </div>
      </div>
      <div class="control">
        <el-button
          icon="el-icon-plus"
          size="mini"
          type="primary"
          @click="addMore"
        >
          代码位
        </el-button>
        <el-button
          :disabled="selectData.length == 0"
          type="warning "
          size="mini"
          @click="deleteData"
        >
          批量删除
        </el-button>
      </div>
      <div class="table">
        <el-form
          ref="batchform"
          :model="query"
        >
          <el-table
            :key="tableKey"
            :data="query.sourceData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <!-- 选择栏 -->
            <el-table-column
              align="center"
              type="selection"
              fixed
            />
            <!-- 广告源名称 -->
            <el-table-column
              align="center"
              label="广告源"
              fixed
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  prop=""
                >
                  {{ scope.row.platName }}
                </el-form-item>
              </template>
            </el-table-column>

            <!-- AppId -->
            <el-table-column
              align="center"
              label="AppId"
              fixed
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].platAppId'"
                  :rules="{
                    required: true,
                    message: 'AppId不能为空',
                    trigger: 'blur',
                  }"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.platAppId"
                    size="mini"
                    placeholder="请输入AppId"
                  />
                </el-form-item>
              </template>
            </el-table-column>

            <!-- AppKey -->
            <el-table-column
              v-if="platId == 7 || platId == 11"
              align="center"
              label="AppKey"
              fixed
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].appKey'"
                  :rules="{
                    required: true,
                    message: 'AppKey不能为空',
                    trigger: 'blur',
                  }"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.appKey"
                    size="mini"
                    placeholder="请输入AppKey"
                  />
                </el-form-item>
              </template>
            </el-table-column>

            <!-- 广告版位ID -->
            <el-table-column
              v-if="platId == 11"
              align="center"
              label="广告版位ID"
              fixed
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].slotId'"
                  :rules="{
                    required: true,
                    message: '广告版位ID不能为空',
                    trigger: 'blur',
                  }"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.slotId"
                    size="mini"
                    placeholder="请输入广告版位ID"
                  />
                </el-form-item>
              </template>
            </el-table-column>

            <!-- 代码位ID -->
            <el-table-column
              align="center"
              label="代码位ID"
              fixed
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].platPlaceId'"
                  :rules="{
                    required: true,
                    message: '代码位ID不能为空',
                    trigger: 'blur',
                  }"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.platPlaceId"
                    size="mini"
                    placeholder="请输入代码位ID"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 代码位名称 -->
            <el-table-column
              align="center"
              label="代码位名称"
              fixed
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].name'"
                  :rules="{
                    required: true,
                    message: '代码位名称不能为空',
                    trigger: 'blur',
                  }"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.name"
                    size="mini"
                    placeholder="请输入代码位名称"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 价格类型 -->
            <el-table-column
              align="center"
              label="价格类型"
              fixed
              width="140px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].settleType'"
                  :rules="{
                    required: true,
                    message: '请选择价格类型',
                    trigger: 'change',
                  }"
                  label-width="0"
                >
                  <el-select
                    v-model="scope.row.settleType"
                    size="mini"
                    placeholder=""
                  >
                    <el-option
                      v-if="settleType == '1' || settleType == '3'"
                      :label="'服务端竞价'"
                      :value="1"
                    />
                    <el-option
                      v-if="settleType == '2' || settleType == '3'"
                      :label="'客户端竞价'"
                      :value="2"
                    />
                    <el-option
                      :label="'固价'"
                      :value="0"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 价格 -->
            <el-table-column
              align="center"
              label="价格"
              fixed
              width="150px"
            >
              <template slot-scope="scope">
                <div v-if="settleType == '1'">
                  <el-form-item
                    v-if="scope.row.settleType == '0'"
                    :prop="'sourceData[' + scope.$index + '].bidfloor'"
                    :rules="{
                      required: true,
                      message: '请输入底价',
                      trigger: 'blur',
                    }"
                    label-width="0"
                  >
                    <el-input
                      v-model="scope.row.bidfloor"
                      size="mini"
                      placeholder="请输入底价"
                    />
                  </el-form-item>
                  <span
                    v-else
                    class="bidding"
                  >{{
                    scope.row.settleType == 1
                      ? "服务端竞价"
                      : scope.row.settleType == 2
                        ? "客户端竞价"
                        : ""
                  }}</span>
                </div>

                <div v-else>
                  <el-form-item
                    :prop="'sourceData[' + scope.$index + '].bidfloor'"
                    :rules="{
                      required: true,
                      message: '请输入底价',
                      trigger: 'blur',
                    }"
                    label-width="0"
                  >
                    <span>
                      <el-input
                        v-model="scope.row.bidfloor"
                        size="mini"
                        placeholder="请输入底价"
                      /></span>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <!-- 代码位状态 -->
            <el-table-column
              align="center"
              label="状态"
              fixed
              width="60px"
            >
              <template slot-scope="scope">
                <el-form-item :prop="'sourceData[' + scope.$index + '].sts'">
                  <el-switch
                    v-model="scope.row.sts"
                    active-value="A"
                    inactive-value="S"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 请求上限 -->
            <el-table-column
              align="center"
              label="请求上限"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].requestFreq'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.requestFreq"
                    type="number"
                    min="0"
                    size="mini"
                    placeholder="请输入请求上限"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.requestFreq = 0)
                        : (scope.row.requestFreq = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 展示上限 -->
            <el-table-column
              align="center"
              label="展示上限"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].impressFreq'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.impressFreq"
                    min="0"
                    type="number"
                    size="mini"
                    placeholder="请输入展示上限"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.impressFreq = 0)
                        : (scope.row.impressFreq = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 点击上限 -->
            <el-table-column
              align="center"
              label="点击上限"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].clickFreq'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.clickFreq"
                    type="number"
                    min="0"
                    size="mini"
                    placeholder="请输入点击上限"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.clickFreq = 0)
                        : (scope.row.clickFreq = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 展示频次（天） -->
            <el-table-column
              align="center"
              label="展示频次（天）"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].impressFreqDay'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.impressFreqDay"
                    type="number"
                    min="0"
                    size="mini"
                    placeholder="请输入展示频次（天）"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.impressFreqDay = 0)
                        : (scope.row.impressFreqDay = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 展示频次（小时） -->
            <el-table-column
              align="center"
              label="展示频次（小时）"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].impressFreqHour'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.impressFreqHour"
                    type="number"
                    min="0"
                    size="mini"
                    placeholder="请输入展示频次（小时）"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.impressFreqHour = 0)
                        : (scope.row.impressFreqHour = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 展示间隔（秒） -->
            <el-table-column
              align="center"
              label="展示间隔（秒）"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].impressInterval'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.impressInterval"
                    type="number"
                    min="0"
                    size="mini"
                    placeholder="请输入展示间隔（秒）"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.impressInterval = 0)
                        : (scope.row.impressInterval = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 点击频次 -->
            <el-table-column
              align="center"
              label="点击频次"
              width="150px"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sourceData[' + scope.$index + '].clickInterval'"
                  label-width="0"
                >
                  <el-input
                    v-model="scope.row.clickInterval"
                    type="number"
                    min="0"
                    size="mini"
                    placeholder="请输入点击频次"
                    @keyup.native="proving($event)"
                    @input="
                      $event < 0
                        ? (scope.row.clickInterval = 0)
                        : (scope.row.clickInterval = +$event)
                    "
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="footer">
        <el-button
          :disabled="query.sourceData.length == 0"
          type="primary"
          @click="handleBatchAdd"
        >
          批量添加
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppPlatform from '@/components/Platform'
import { getAppInfoById, batchAddSource } from '@/api/aggregate'

export default {
  name: 'BatchAdd',
  components: {
    AppPlatform
  },
  data() {
    return {
      tableKey: '' + new Date(),
      query: { sourceData: [] },
      appId: '',
      appName: '',
      placeId: '',
      placeName: '',
      positionId: '',
      positionName: '',
      iconUrl: '',
      os: '',
      settleType: '',
      platName: '',
      platId: '',
      testId: '',
      groupId: '',
      selectData: []
    }
  },
  computed: {},
  mounted() {
    if (this.$route.query) {
      this.appId = this.$route.query.appId ? this.$route.query.appId : ''
      this.placeId = this.$route.query.placeId ? this.$route.query.placeId : ''
      this.groupId = this.$route.query.groupId ? this.$route.query.groupId : ''
      this.testId = this.$route.query.testId ? this.$route.query.testId : ''
    }
    this.getAppInfoById()
  },
  methods: {
    async getAppInfoById() {
      let resp = await getAppInfoById({
        id: this.appId,
        placeId: this.placeId
      })
      this.appName = resp.data[0] ? resp.data[0].name : ''
      this.placeName = resp.data[0] ? resp.data[0].placeName : ''
      this.positionId = resp.data[0] ? resp.data[0].position : ''
      this.positionName = resp.data[0] ? resp.data[0].positionName : ''
      this.iconUrl = resp.data[0] ? resp.data[0].iconUrl : ''
      this.os = resp.data[0] ? resp.data[0].os : ''
    },
    getCreativeUrl(url) {
      if (url) {
        return this.$store.getters.resourceUrl + url
      } else {
        return null
      }
    },
    addMore() {
      if (!this.platId) {
        this.$message.error('请选择广告源')
        return
      }
      this.tableKey = '' + new Date()
      this.query.sourceData.push({
        key: Math.random(),
        platName: this.platName,
        settleType:
          this.settleType == 0
            ? 0
            : this.settleType == 1
              ? 1
              : this.settleType == 2
                ? 2
                : this.settleType == 3
                  ? 0
                  : 0,
        sts: 'A',
        // 广告位id
        placeId: this.placeId,
        // 广告源id
        platId: this.platId,
        // 流量分组id
        groupId: this.groupId,
        // 测试分组id
        testId: this.testId,
        name:
          '' +
          this.appName +
          '-' +
          (this.os == 1 ? 'Android' : 'IOS') +
          '-' +
          this.positionName,
        platAppId: '',
        appKey: '',
        slotId: ''
      })
    },
    // 选中事件
    handleSelectionChange(list) {
      this.selectData = JSON.parse(JSON.stringify(list))
    },
    // 批量删除
    deleteData() {
      let indexArr = []
      this.selectData.forEach((child, c) => {
        this.query.sourceData.forEach((item, i) => {
          if (item.key == child.key) {
            indexArr.push(i)
          }
        })
      })
      indexArr.reverse().forEach((item) => {
        this.query.sourceData.splice(item, 1)
      })
    },

    getplatrow(row) {
      this.accessType = row.accessType
      this.query.sourceData = []
      this.platId = row.id
      this.platName = row.name
      this.settleType = row.settleType
    },
    goback() {
      this.$router.push({
        path: '/traffic/aggregate',
        query: { appId: this.appId, placeId: this.placeId }
      })
    },

    async batchAddSource() {
      let resp = await batchAddSource(this.query)
      if (resp.code == 200) {
        this.$message.success('操作成功！')
        this.$router.push({
          path: '/traffic/aggregate',
          query: { appId: this.appId, placeId: this.placeId }
        })
      }
    },
    async handleBatchAdd() {
      this.$refs.batchform.validate(async(val) => {
        if (!val) return
        this.batchAddSource()
      })
    },
    proving(e) {
      var val = e.target.value
      // 限制只能输入一个小数点
      if (val.indexOf('.') != -1) {
        var str = val.substr(val.indexOf('.') + 1)
        if (str.indexOf('.') != -1) {
          val = val.substr(0, val.indexOf('.') + str.indexOf('.') + 1)
        }
      }
      e.target.value = val.replace(/[^\d^\.]+/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.batch-add-container {
  width: 100%;
  background-color: #fff;
  .header {
    padding: 10px;
    display: flex;
    .goback {
      font-size: 16px;
      margin-right: 30px;
      cursor: pointer;
      h3 {
        font-size: 16px;
      }
      &:hover {
        color: blue;
      }
    }
  }
  .appplatform {
    margin-bottom: 20px;
  }
  .content {
    padding-left: 30px;
    width: 100%;
    .title {
      margin-top: 30px;
      width: 100%;
      display: flex;
      .title_app,
      .title_place {
        line-height: 50px;
        width: 320px;
        height: 50px;
        display: flex;
        align-items: center;
        .image {
          width: 40px;
          height: 40px;
          overflow: hidden;
          margin-right: 5px;
        }
      }
      .titlebox {
        .name {
          font-size: 14px;
          line-height: 30px;
        }
        .id {
          font-size: 13px;
          line-height: 20px;
        }
        .label {
        }
        .name.position {
          line-height: 50px;
        }
      }
    }
    .platform {
      margin-top: 40px;
      display: flex;
      .label {
        width: 6%;
        color: #666;
      }
      .platformbox {
        width: 90%;
      }
    }
    .control {
      margin-top: 30px;
      margin-bottom: 30px;
      width: 100%;
    }
    .table {
      width: 98%;
      .bidding {
        color: blue;
        // margin-top: -10px;
        position: absolute;
        top: 18px;
        left: 40%;
      }
    }
    .footer {
      margin-top: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
