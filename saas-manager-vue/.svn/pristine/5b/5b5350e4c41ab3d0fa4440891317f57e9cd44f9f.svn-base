<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-date-picker
            v-model="time"
            :clearable="true"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="DateChange"
          />
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="customPackageForm.packageId"
            clearable
            placeholder="请选择素材包"
          >
            <el-option
              v-for="item in advertOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="customPackageForm.auditUser"
            clearable
            placeholder="请选择审核人员"
          >
            <el-option
              v-for="item in auditPeopleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="searchBtn"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        class="code_row"
      >
        <el-col :span="2">
          数据维度
        </el-col>
        <el-col :span="15">
          <el-checkbox
            v-model="customPackageForm.isGroupByPackage"
            label="name"
            @change="handleCkecked"
          >
            素材包
          </el-checkbox>
          <el-checkbox
            v-model="customPackageForm.isGroupByUser"
            label="userId"
            @change="handleCkecked"
          >
            审核人员
          </el-checkbox>
        </el-col>
      </el-row>

      <div
        v-loading="tableLoading"
        class="tablebox"
      >
        <el-table
          v-if="reportTable.length > 0"
          :header-cell-style="{ background: '#f7f8fa' }"
          :data="reportTable"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
            align="center"
          />
          <el-table-column
            v-if="customPackageForm.isGroupByPackage"
            prop="name"
            label="素材包"
            align="center"
          />
          <el-table-column
            v-if="customPackageForm.isGroupByUser"
            prop="userId"
            label="审核人员"
            align="center"
          />
          <el-table-column
            prop="totalNum"
            label="送审量"
            align="center"
          />
          <el-table-column
            prop="auditNum"
            label="完审量"
            align="center"
          />
          <el-table-column
            label="完审率"
            align="center"
          >
            <template slot-scope="{ row }">
              <div>{{ row.auditRatio }}%</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="passNum"
            label="通过量"
            align="center"
          />
          <el-table-column
            label="通过率"
            align="center"
          >
            <template slot-scope="{ row }">
              <div>{{ row.passRatio }}%</div>
            </template>
          </el-table-column>
        </el-table>
        <Empty v-else />
      </div>
      <el-pagination
        :current-page="CustomPackageForm.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="CustomPackageForm.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
// import { auditPeople, creativeSelect, auditReport } from '@/libs/api'
import Empty from '@/components/empty'
import { auto } from '@/utils/toTimer'

export default {
  components: {
    Empty
  },
  data() {
    return {
      time: [],
      customPackageForm: {
        page: 1,
        limit: 10,
        packageId: '',
        auditUser: '',
        beginDate: '',
        endDate: '',
        isGroupByPackage: true,
        isGroupByUser: true
      },
      CustomPackageForm: {
        page: 1,
        limit: 10,
        packageId: '',
        auditUser: '',
        beginDate: '',
        endDate: '',
        isGroupByPackage: true,
        isGroupByUser: true
      },
      tableLoading: false,
      total: 0,
      advertOptions: [],
      auditPeopleOptions: [],
      dimensionList: [],
      reportTable: [],
      pickerOptions: auto()
    }
  },
  mounted() {
    // this.getAuditPeople();
    // this.getCreativeSelect();
    // this.getAuditReport();
  },
  methods: {
    // 审核人员下拉
    async getAuditPeople() {
      const res = await auditPeople()
      if (res.code != 200) return
      this.auditPeopleOptions = res.data
    },
    async getCreativeSelect() {
      const res = await creativeSelect()
      if (res.code != 200) return
      res.data.forEach((e, i) => {
        if (!e) res.data.splice(i, 1)
      })
      this.advertOptions = res.data
    },
    async getAuditReport() {
      this.tableLoading = true
      const res = await auditReport(this.CustomPackageForm)
      if (res.code != 200) return this.$message.error(res.msg)
      setTimeout(() => {
        this.tableLoading = false
      }, 400)
      this.reportTable = res.data.items
      this.total = res.data.total
    },
    handleCkecked() {
      this.getAuditReport()
    },
    handleSizeChange(val) {
      this.CustomPackageForm.limit = val
      this.getAuditReport()
    },
    handleCurrentChange(val) {
      this.CustomPackageForm.page = val
      this.getAuditReport()
    },
    searchBtn() {
      this.CustomPackageForm = Object.assign({}, this.customPackageForm)
      this.getAuditReport()
    },
    DateChange() {
      if (this.time) {
        this.customPackageForm.beginDate = this.time[0]
        this.customPackageForm.endDate = this.time[1]
      } else {
        this.customPackageForm.beginDate = ''
        this.customPackageForm.endDate = ''
        this.time = []
      }
    }
  }
}
</script>
<style scoped>
.code_row {
  margin: 50px 0;
}
</style>
