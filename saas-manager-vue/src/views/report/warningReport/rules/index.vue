<template>
  <div class="rules-container">
    <div class="search">
      <div class="item">
        <el-input
          v-model="query.name"
          placeholder="请输入预警名称"
        />
      </div>
      <div class="item">
        <el-select
          v-model="query.target"
          placeholder="请选择预警对象"
          clearable
        >
          <el-option
            :label="'应用'"
            :value="1"
          />
          <el-option
            :label="'广告位'"
            :value="2"
          />
        </el-select>
      </div>
      <div class="item">
        <el-select
          v-model="query.sts"
          placeholder="请选择预警状态"
          clearable
        >
          <el-option
            :label="'开启'"
            :value="'A'"
          />
          <el-option
            :label="'关闭'"
            :value="'S'"
          />
        </el-select>
      </div>
      <div
        v-if="$store.getters.roles[0] == 'SUPER_ADMIN'"
        class="item"
      >
        <!-- <el-select v-model="query.company" placeholder="请选择账户" clearable>
          <el-option
            v-for="(item, index) in adminList"
            :key="index"
            :value="item.id"
            :label="item.company"
          ></el-option>
        </el-select> -->
        <CustSelectOne
          class="filter-item"
          :model="query.company"
          :all-data="adminList"
          :width="240"
          word="账号"
          :clear="true"
          @handleSelect="handleSelectAdmin"
        />
      </div>
      <div class="btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >
          查询
        </el-button>
      </div>
    </div>
    <div class="add_btn">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd"
      >
        预警规则
      </el-button>
    </div>
    <div
      v-if="tableList.length > 0"
      class="table"
    >
      <el-table
        v-loading="loading"
        :header-cell-style="{ 'background-color': '#f7f8fa', color: '#000' }"
        stripe
        :data="tableList"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          fixed
          prop="name"
          label="预警名称"
        />

        <el-table-column
          v-if="$store.getters.roles[0] == 'SUPER_ADMIN'"
          align="center"
          fixed
          prop="company"
          label="创建账户"
        />
        <el-table-column
          align="center"
          fixed
          prop="noticeDate"
          label="最近预警时间"
        >
          <template slot-scope="{ row }">
            {{ row.noticeDate ? row.noticeDate : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          fixed
          prop="target"
          label="预警对象"
        >
          <template slot-scope="{ row }">
            {{ row.target == 1 ? "应用" : row.target == 2 ? "广告位" : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          fixed
          prop="frequency"
          label="预警频率"
        >
          <template slot-scope="{ row }">
            {{
              row.frequency == 1 ? "天级" : row.frequency == 2 ? "小时级" : "-"
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="150px"
          fixed
          prop="noticeType"
          label="预警方式"
        >
          <template slot-scope="{ row }">
            {{
              row.noticeType == 1
                ? "站内信"
                : row.noticeType == 2
                  ? "邮箱"
                  : row.noticeType == 3
                    ? "站内信 + 邮箱"
                    : "-"
            }}
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          fixed
          prop="sts"
          label="预警状态"
        >
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.sts"
              active-value="A"
              inactive-value="S"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changTableSts($event, row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="120px"
          align="center"
          fixed
          label="操作"
        >
          <template slot-scope="{ row }">
            <el-tooltip
              content="编辑"
              placement="top"
              effect="light"
            >
              <div
                class="doicon"
                @click="handleUpdate(row)"
              >
                <svg-icon
                  style="color: #3685df"
                  class="svgicon"
                  icon-class="edit"
                />
              </div>
            </el-tooltip>

            <el-tooltip
              content="删除"
              placement="top"
              effect="light"
            >
              <div
                class="doicon"
                @click="handleDelete(row)"
              >
                <svg-icon
                  style="color: red; margin-right: 10px"
                  class="svgicon"
                  icon-class="delete"
                />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin: 30px 0 0 0"
        :current-page="query.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="query.limit"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Empty v-else />
  </div>
</template>

<script>
import { getadminList } from '@/api/app.js'
import { getWarningPage, updateWarning, deleteWarning } from '@/api/warning.js'

import Empty from '@/components/empty'
import CustSelectOne from '@/components/CustSelectOne'

export default {
  components: { Empty, CustSelectOne },
  data() {
    return {
      query: {
        limit: 10,
        page: 1,
        name: '',
        target: '',
        sts: '',
        company: ''
      },
      total: 0,
      adminList: [],
      tableList: [],
      loading: false
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.query) {
      this.query = JSON.parse(JSON.stringify(this.$route.params.query))
    }
    this.getadminList()
    this.getTableData()
  },
  methods: {
    async getadminList() {
      let resp = await getadminList()
      resp.data.forEach((item) => {
        item.id = '' + item.id
        item.name = item.company
      })
      this.adminList = resp.data ? resp.data : []
    },
    handleSelectAdmin(val) {
      this.query.company = val
    },
    handleSearch() {
      this.query.page = 1
      this.getTableData()
    },
    async getTableData() {
      this.loading = true
      let resp = await getWarningPage(this.query)
      this.total = resp.data ? resp.data.total : 0
      this.tableList = resp.data ? resp.data.items : []
      this.loading = false
      this.$bus.$emit('totop')
    },
    async changTableSts(val, row) {
      let resp = await updateWarning(row)
      if (resp.code != 200) return
      this.$message.success('修改成功！')
      this.getTableData()
    },
    handleSizeChange(val) {
      this.query.page = 1
      this.query.limit = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getTableData()
    },
    handleUpdate(row) {
      this.$router.push({
        name: 'updateRules',
        path: 'updateRules',
        params: { ...row, query: this.query, isAdd: false }
      })
    },
    async handleDelete(row) {
      this.$confirm('确定删除该预警吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteWarning({ id: row.id })
          this.$message.success('删除成功！')
          this.query.page = 1
          this.getTableData()
        })
        .catch(() => {})
    },
    handleAdd() {
      this.$router.push({
        name: 'updateRules',
        path: 'updateRules',
        params: {
          name: '',
          target: '',
          appIdList: [],
          placeIdList: [],
          frequency: 1,
          triggerCondition: 0,
          earlyWarningRuleList: [
            {
              ruleId: '',
              ruleType: 1,
              dateType: 0,
              value: ''
            }
          ],
          noticeType: 1,
          userIdList: [],
          emailList: [],
          query: this.query,
          isAdd: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rules-container {
  .search {
    display: flex;
    .item,
    .btn {
      width: 20%;
      margin: 15px;
      .el-select {
        width: 100%;
      }
    }
  }
  .add_btn {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
  }
  .table {
    .doicon {
      display: inline-block;
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>
