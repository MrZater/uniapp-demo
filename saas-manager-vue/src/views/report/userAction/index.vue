<template>
  <div class="user-action-container">
    <div class="search-container">
      <el-row :gutter="20">
        <el-col
          :span="6"
          class="search_item"
        >
          <!-- 日期 -->
          <el-date-picker
            v-model="time"
            style="width: 95%"
            :clearable="false"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="与"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="getSTime"
          />
        </el-col>
        <el-col
          :span="6"
          class="search_item"
        >
          <!-- 应用 -->
          <CustSelectOne
            style="width: 95%"
            :model="query.appId"
            :all-data="appList"
            :width="275"
            word="应用"
            :clear="true"
            @handleSelect="handleSelectApp"
          />
        </el-col>
        <el-col
          :span="6"
          class="search_item"
        >
          <!-- 广告位 -->
          <CustSelectOne
            style="width: 95%"
            :model="query.adPlaceId"
            :all-data="placeList"
            :width="275"
            word="广告位"
            :clear="true"
            @handleSelect="handleSelectPlace"
          />
        </el-col>
        <el-col
          :span="6"
          class="search_item"
        >
          <!-- 广告样式 -->
          <CustSelectOne
            style="width: 95%"
            :model="query.position"
            :all-data="positionList"
            :width="275"
            word="广告样式"
            :clear="true"
            @handleSelect="handleSelectPosition"
          />
        </el-col>
        <el-col
          :span="6"
          class="search_item"
        >
          <!-- 操作系统 -->
          <el-select
            v-model="query.os"
            style="width: 95%"
            placeholder="请选择操作系统"
            clearable
          >
            <el-option
              :label="'Android'"
              :value="1"
            />
            <el-option
              :label="'IOS'"
              :value="0"
            />
          </el-select>
        </el-col>
        <el-col
          :offset="12"
          :span="6"
          class="search_item btn"
        >
          <el-button
            type="primary"
            class="searchBtn"
            icon="el-icon-search"
            @click="handleSearch"
          >
            搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
    <charts :query="chartQuery" />
    <div
      v-if="tableList.length > 0"
      class="table-container"
    >
      <el-table
        v-loading="tableLoading"
        :header-cell-style="{ background: '#f7f8fa', color: '#000' }"
        :data="tableList"
        stripe
      >
        <el-table-column
          prop="date"
          label="日期"
          align="center"
        />
        <el-table-column
          prop="dau"
          width="140"
          label="DAU"
          align="center"
        />
        <el-table-column
          prop="deu"
          width="140"
          label="DEU"
          align="center"
        />
        <el-table-column
          prop="permeability"
          width="140"
          label="渗透率"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.permeability }}%
          </template>
        </el-table-column>
        <el-table-column
          prop="aipau"
          width="140"
          label="展示 / DAU"
          align="center"
        />
        <el-table-column
          prop="aipu"
          width="140"
          label="展示 / DEU"
          align="center"
        />
        <el-table-column
          prop="arpu"
          width="140"
          label="ARPDAU"
          align="center"
        />
        <el-table-column
          prop="arpDeu"
          width="140"
          label="ARPDEU"
          align="center"
        />
      </el-table>
      <el-pagination
        :current-page="query.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Empty
      v-else
      class="empty"
    />
  </div>
</template>

<script>
import { toDate } from '@/utils/toTimer'
import CustSelectOne from '@/components/CustSelectOne'
import CustSelectApp from '@/components/CustSelectApp'
import { getAppList } from '@/api/app'
import { getPlaceList, getPlaceListByAppId } from '@/api/place'
import { getPositionList } from '@/api/common'
import { userActionReport } from '@/api/synthReport'
import Empty from '@/components/empty'
import charts from './charts'

export default {
  name: 'UserAction',
  components: { CustSelectOne, CustSelectApp, Empty, charts },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < 1633017600000
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近14天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      time: [],
      query: {
        dateStart: '',
        dateEnd: '',
        appId: '',
        adPlaceId: '',
        position: '',
        os: '',
        page: 1,
        limit: 10
      },
      chartQuery: {},
      tableLoading: false,
      total: 0,
      appList: [],
      placeList: [],
      positionList: [],

      tableList: [{}]
    }
  },
  watch: {
    'query.appId': {
      async handler(newVal, oldVal) {
        if (!newVal) {
          this.getPlaceList()
        } else if (newVal && newVal != oldVal) {
          let resp = await getPlaceListByAppId(this.query.appId)
          this.placeList = resp.data ? resp.data : []
        }
      }
    }
  },
  mounted() {
    this.getDate()
    this.getAppList()
    this.getPlaceList()
    this.getPositionList()
    this.getTableData()
    this.chartQuery = JSON.parse(JSON.stringify(this.query))
  },
  methods: {
    // 初始化时间
    getDate() {
      // 昨天
      let today = toDate(Date.now())
      // 7天前
      let before7day = toDate(Date.now() - 6 * 24 * 60 * 60 * 1000)
      this.time = [before7day, today]
      this.query.dateStart = this.time[0]
      this.query.dateEnd = this.time[1]
    },
    // 选择时间
    getSTime() {
      this.query.dateStart = this.time[0]
      this.query.dateEnd = this.time[1]
    },
    // 应用
    getAppList() {
      getAppList().then((res) => {
        this.appList = res.data
      })
    },
    // 选择应用
    handleSelectApp(val) {
      this.query.appId = val
    },
    // 广告位
    getPlaceList() {
      getPlaceList().then((res) => {
        this.placeList = res.data
      })
    },
    // 选择广告位
    handleSelectPlace(val) {
      this.query.adPlaceId = val
    },
    // 广告样式
    getPositionList() {
      getPositionList().then((res) => {
        res.data.forEach((item) => {
          item.id = '' + item.id
        })
        this.positionList = res.data
      })
    },
    // 选择广告样式
    handleSelectPosition(val) {
      this.query.position = val
    },
    // 点击搜索按钮
    handleSearch() {
      this.query.page = 1
      this.getTableData()
      this.chartQuery = JSON.parse(JSON.stringify(this.query))
    },
    // 获取table数据
    async getTableData() {
      this.tableLoading = true
      let resp = await userActionReport(this.query)
      this.tableList = resp.data.items ? resp.data.items : []
      this.total = resp.data.total
      this.tableLoading = false
    },
    // 改变limit
    handleSizeChange(val) {
      this.query.limit = val
      this.getTableData()
    },
    // 改变page
    handleCurrentChange(val) {
      this.query.page = val
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-action-container {
  width: 100%;

  .search-container {
    background-color: #fff;
    padding: 15px;
    .search_item {
      margin-top: 10px;
      &.btn {
        display: flex;
        flex-direction: row-reverse;
        .el-button {
          margin-right: 15px;
        }
      }
    }
  }
  .table-container,
  .empty {
    margin-top: 15px;
    padding: 15px;
    background-color: #fff;
  }
}
// 自定义单选框缩进
::v-deep.user-action-container
  .search-container
  .cust-select-container
  .osicon {
  display: none;
}
</style>
