<template>
  <div class="batch-copy-config-container">
    <div class="button">
      <el-button
        size="small"
        :disabled="selectData.length == 0"
        type="primary"
        @click="handleCopyConfig"
      >
        批量复制代码位配置
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog
        title="批量复制代码位配置"
        width="600px"
        :visible.sync="visible"
      >
        <div
          v-if="
            query.targetData.length > 1 ||
              (query.targetData.length == 1 &&
                query.targetData[0].testList.length > 1)
          "
          class="check_box"
        >
          <template v-for="(item, index) in query.targetData">
            <div
              :key="index"
              class="group_box"
            >
              <el-checkbox
                v-model="item.isCheck"
                class="group_check"
              >
                <p class="groupname">
                  {{ item.groupName }}
                </p>
              </el-checkbox>
              <el-checkbox-group
                v-if="item.isCheck"
                v-model="item.testIds"
                :class="{ test_checkgroup: item.testList.length > 1 }"
              >
                <template v-for="(child, c) in item.testList">
                  <el-checkbox
                    v-if="child.testId != 'default'"
                    :key="c"
                    :label="child.testId"
                  >
                    {{ child.testName }}
                  </el-checkbox>
                </template>
              </el-checkbox-group>
            </div>
          </template>
        </div>
        <span
          v-else
          class="warning"
        >暂无其他流量分组，请创建新流量分组后再操作！</span>

        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="small"
            @click="visible = false"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            :disabled="
              !(
                query.targetData.length > 1 ||
                (query.targetData.length == 1 &&
                  query.targetData[0].testList.length > 1)
              )
            "
            @click="handleOk"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { batchReplicationConfig } from '@/api/aggregate'
export default {
  name: 'CopyConfig',
  props: {
    groups: Array,
    selectData: Array,
    testId: String,
    groupId: String
  },
  data() {
    return {
      visible: false,
      query: {
        sourceData: [],
        targetData: []
      }
    }
  },

  methods: {
    handleGroups() {
      this.query.targetData = []
      this.groups.forEach((item, i) => {
        this.query.targetData.push({
          groupId: item.id,
          groupName: item.name,
          isCheck: false,
          testIds: [],
          testName: '',
          testList: []
        })
        item.abTests.forEach((child) => {
          this.query.targetData[i].testList.push({
            testId: child.testId,
            testName: child.groupName
          })
        })
        if (this.query.targetData[i].testList.length <= 1) {
          this.query.targetData[i].testIds.push('default')
        }
      })
    },
    handleSelectData() {
      this.query.sourceData = []
      this.selectData.forEach((item, i) => {
        this.query.sourceData.push({
          id: item.id,
          placeId: item.placeId,
          groupId: this.groupId,
          testId: this.testId ? this.testId : 'default'
        })
      })
    },
    handleCopyConfig() {
      this.handleGroups()
      this.handleSelectData()
      this.visible = true
    },
    async handleOk() {
      let query = JSON.parse(JSON.stringify(this.query))
      query.targetData = this.query.targetData.filter((item) => {
        return item.isCheck && item.testIds.length > 0
      })
      if (query.targetData.length == 0) {
        return this.$message.error('请选择你要复制到的流量分组或A/B测试分组!')
      }
      let resp = await batchReplicationConfig(query)
      if (resp.code == 200) {
        this.$message.success('操作成功！')
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.batch-copy-config-container {
  display: inline-block;
  .dialog {
    .check_box {
      .group_box {
        width: 100%;
        margin-bottom: 20px;
        .group_check {
          width: 7rem;
          line-height: 30px;
          .groupname {
            color: #000;
            font-weight: 600;
          }
        }
        .test_checkgroup {
          line-height: 20px;
          padding-top: 5px;
          width: calc(100% - 7rem);
          border: 1px solid #ccc;
          border-radius: 5px;
          padding-left: 10px;
          padding-right: 10px;
          margin-left: 30px;
        }
      }
    }
    .warning {
      color: red;
    }
  }
}
</style>
