
<template>
  <div class="blog-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-date-picker
            v-model="date"
            style="width: 90%"
            class="filter-item"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="getSTime"
          />
        </el-col>
        <el-col
          v-if="$store.getters.roles[0] !== 'ADMIN'"
          :span="6"
        >
          <el-select
            v-model="query.operateAccount"
            style="width: 90%"
            placeholder="请选择账户"
            clearable
          >
            <el-option
              v-for="(item, index) in adminList"
              :key="index"
              :label="item.company"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="query.operateType"
            style="width: 90%"
            clearable
            placeholder="请选择操作类型"
          >
            <el-option
              label="应用"
              :value="1"
            />
            <el-option
              label="广告位"
              :value="2"
            />
            <el-option
              label="聚合瀑布流 "
              :value="3"
            />
            <el-option
              label="代码位"
              :value="9"
            />
            <el-option
              label="A/B测试"
              :value="10"
            />
            <el-option
              label="流量分组"
              :value="11"
            />
            <el-option
              label="账户"
              :value="12"
            />
            <el-option
              label="广告源"
              :value="4"
            />
            <el-option
              label="数据预警"
              :value="5"
            />
            <el-option
              label="账户信息"
              :value="6"
            />
            <el-option
              label="账户权限"
              :value="7"
            />
            <el-option
              label="接入中心"
              :value="8"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="query.operateObject"
            style="width: 90%"
            placeholder="请输入操作对象"
            clearable
          />
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="query.operateUser"
            style="width: 90%"
            placeholder="请输入操作人"
            clearable
          />
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="query.operateContent"
            style="width: 90%"
            placeholder="请输入操作内容"
            clearable
          />
        </el-col>
        <el-col
          :offset="6"
          :span="6"
          class="searchbtn"
        >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSeach"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="tableList.length > 0"
      class="table"
    >
      <el-table
        ref="box"
        v-loading="isLoading"
        :header-cell-style="{ 'background-color': '#f7f8fa', color: '#000' }"
        :data="tableList"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="operateTime"
          label="操作时间"
          width="180px"
        /><el-table-column
          v-if="$store.getters.roles[0] !== 'ADMIN'"
          align="center"
          prop="operateAccount"
          width="150px"
          label="所属账户"
        /><el-table-column
          align="center"
          prop="operateUser"
          width="120px"
          label="操作人"
        /><el-table-column
          align="center"
          prop="operateType"
          label="操作类型"
        >
          <template slot-scope="{ row }">
            <!-- 1 应用 2 广告位 3 聚合瀑布流 4 广告源 5 数据预警 6 账户信息 7 账户权限 8 接入中心 -->
            {{
              row.operateType == 1
                ? "应用"
                : row.operateType == 2
                  ? "广告位"
                  : row.operateType == 3
                    ? "聚合瀑布流"
                    : row.operateType == 4
                      ? "广告源"
                      : row.operateType == 5
                        ? "数据预警"
                        : row.operateType == 6
                          ? "账户信息"
                          : row.operateType == 7
                            ? "账户权限"
                            : row.operateType == 8
                              ? "接入中心"
                              : row.operateType == 9
                                ? "代码位"
                                : row.operateType == 10
                                  ? "A/B测试"
                                  : row.operateType == 11
                                    ? "流量分组"
                                    : row.operateType == 12
                                      ? "账户"
                                      : "-"
            }}
          </template>
        </el-table-column><el-table-column
          align="center"
          prop="operateObject"
          label="操作对象"
          width="160px"
        /><el-table-column
          align="center"
          prop="operateMotion"
          width="120px"
          label="操作动作"
        >
          <template slot-scope="{ row }">
            <!-- 0=未知,1=增，2=改，3=查，4=删,5=登录，6=退出 -->
            <el-tag
              v-if="row.operateMotion == 1"
              type="success"
            >
              新增
            </el-tag>
            <el-tag
              v-if="row.operateMotion == 2"
              type="warning"
            >
              修改
            </el-tag>
            <el-tag
              v-if="row.operateMotion == 4"
              type="danger"
            >
              删除
            </el-tag>
            <el-tag
              v-if="row.operateMotion == 5"
              type="success"
            >
              登录
            </el-tag>
            <el-tag
              v-if="row.operateMotion == 6"
              type="danger"
            >
              登出
            </el-tag>
          </template>
        </el-table-column><el-table-column
          align="center"
          prop="operateContentList"
          min-width="250px"
          label="操作内容"
        >
          <template slot-scope="{ row }">
            <div
              v-if="row.operateContentList.length > 0"
              class="contentbox"
            >
              <div class="content">
                <div
                  v-for="(item, index) in row.operateContentList"
                  :key="index"
                  class="cententItem"
                >
                  <span>{{ index + 1 }}.{{ item }}</span>
                </div>
              </div>
            </div>

            <div
              v-else
              class="info"
            >
              未修改任何内容
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        :current-page="query.page"
        :page-sizes="[5, 10, 20, 30]"
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
import { adminDateOption } from "@/utils/options";

import { getadminList } from "@/api/app";
import { getUlogReport } from "@/api/ulog";

import Empty from "@/components/empty";

export default {
  name: "Ulog",
  components: {
    Empty,
  },
  data() {
    return {
      date: [],
      pickerOptions: adminDateOption || [],
      query: {
        page: 1,
        limit: 10,
        startTime: "", // 开始时间
        endTime: "", // 结束时间
        operateAccount: "", // 账户
        operateType: "", // 操作类型
        operateObject: "", // 操作对象
        operateUser: "", // 操作者
        operateContent: "", // 操作内容
      },
      total: 0,
      adminList: [], // 账户列表
      isLoading: false,
      tableList: [],
    };
  },
  mounted() {
    this.initDate();
    this.getadminList();
    this.getTableData();
  },
  methods: {
    // 初始化时间
    initDate() {
      let time1 = new Date().getTime();
      let year1 = new Date(time1).getFullYear();
      let month1 = new Date(time1).getMonth() + 1;
      let day1 = new Date(time1).getDate();
      let time2 = new Date().getTime() - 1000 * 60 * 60 * 24 * 4;
      let year2 = new Date(time2).getFullYear();
      let month2 = new Date(time2).getMonth() + 1;
      let day2 = new Date(time2).getDate();
      let str1 = `${year1}-${month1 < 10 ? "0" + month1 : month1}-${
        day1 < 10 ? "0" + day1 : day1
      }`;
      let str2 = `${year2}-${month2 < 10 ? "0" + month2 : month2}-${
        day2 < 10 ? "0" + day2 : day2
      }`;
      this.date = [str2, str1];
      this.query.endTime = str1;
      this.query.startTime = str2;
    },
    // 获取时间
    getSTime(val) {
      this.query.startTime = val[0];
      this.query.endTime = val[1];
    },
    // 获取账户列表
    async getadminList() {
      let resp = await getadminList();
      if (resp.code == 200) {
        this.adminList = resp.data ? resp.data : [];
      } else {
        this.adminList = [];
      }
    },
    // 查询按钮
    handleSeach() {
      this.getTableData();
    },
    async getTableData() {
      this.isLoading = true;
      let resp = await getUlogReport(this.query);
      this.tableList = resp.data.items ? resp.data.items : [];
      this.total = resp.data.total ? resp.data.total : 0;
      this.tableList.forEach((item) => {
        if (
          item.operateContentList &&
          item.operateContentList.length > 0 &&
          item.operateContentList[0]
        ) {
          item.operateContentList = item.operateContentList[0].split(",");
        } else if (
          item.operateContentList &&
          item.operateContentList.length > 0 &&
          item.operateContentList[0] == null
        ) {
          item.operateContentList = [];
        }
      });
      this.isLoading = false;
      this.$bus.$emit("totop");
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getTableData();
    },
  },
};
</script>
<style lang="scss" scoped>
.blog-container {
  width: 100%;
  .search {
    width: 100%;
    background-color: #fff;
    padding: 15px;
    .el-col {
      margin-top: 10px;
    }
    .searchbtn {
      display: flex;
      flex-direction: row-reverse;
      .el-button {
        margin-right: 30px;
      }
    }
  }
  .table {
    background-color: #fff;
    margin-top: 15px;
    padding: 15px 15px 30px 15px;
    .contentbox {
      display: flex;
      flex-direction: row-reverse;
      .content {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .cententItem {
          width: 100%;
          text-align: left;
        }
      }
    }

    .info {
      color: #1890ff;
    }
  }
  .empty {
    margin-top: 15px;
    width: 100%;
    background-color: #fff;
    height: 400px;
  }
}
</style>
