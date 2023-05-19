<template>
  <div class="media-report-contianer">
    <div class="search">
      <el-row>
        <el-col
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <el-date-picker
            v-model="date"
            :clearable="false"
            style="width: 90%"
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
          v-if="$store.state.user.roles[0] !== 'MEDIA'"
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <el-select
            v-model="query.mediaIds"
            style="width: 90%"
            multiple
            collapse-tags
            placeholder="请选择媒体"
          >
            <el-option
              v-for="item in mediaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <CustSelectApp
            style="width: 90%"
            :word="'应用'"
            :width="450"
            :all-data="appList"
            search-by-id
            @selectListhandle="selectappListhandleApp"
          />
        </el-col>
        <el-col
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <CustSelectApp
            style="width: 90%"
            :word="'广告位'"
            :width="450"
            :all-data="adplaceLsit"
            search-by-id
            @selectListhandle="selectappListhandlePlace"
          />
        </el-col>

        <el-col
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <el-select
            v-model="query.positionIdList"
            style="width: 90%"
            multiple
            collapse-tags
            placeholder="广告样式"
          >
            <el-option
              v-for="item in positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <el-select
            v-model="query.osIdList[0]"
            style="width: 90%"
            collapse-tags
            placeholder="操作系统"
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
          :lg="6"
          style="width: 25%; height: 40px; margin-top: 10px"
        >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <div class="group_box">
        <div class="left">
          <h2 style="display: inline-block">
            数据维度
          </h2>
          <div style="display: inline-block; margin-left: 30px">
            <el-checkbox
              v-if="$store.state.user.roles[0] !== 'MEDIA'"
              v-model="showTable.media"
              medium
            >
              <h3>媒体账户</h3>
            </el-checkbox>
            <el-checkbox
              v-model="showTable.app"
              medium
            >
              <h3>应用</h3>
            </el-checkbox>

            <el-checkbox
              v-model="showTable.place"
              medium
            >
              <h3>广告位</h3>
            </el-checkbox>
            <el-checkbox
              v-model="showTable.position"
              medium
            >
              <h3>广告样式</h3>
            </el-checkbox>
            <el-checkbox
              v-model="showTable.os"
              medium
            >
              <h3>操作系统</h3>
            </el-checkbox>
          </div>
        </div>

        <div class="right_btn">
          <div v-if="$store.getters.roles[0] == 'ADMIN'">
            <span style="font-weight: bold; line-height: 30px">
              报表审核权限
            </span>
            <el-switch
              v-model="audit"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeAudit"
            />
          </div>

          <el-button
            :disabled="!allowDownload"
            type="primary"
            size="mini"
            :loading="downLoading"
            @click="downloadReport"
          >
            数据导出
          </el-button>
        </div>
      </div>

      <div
        v-if="tableList.length > 1"
        class="table_box"
      >
        <el-table
          :key="tableKey"
          v-loading="isLoading"
          stripe
          :data="tableList"
          :header-cell-style="{ background: '#f7f8fa', color: '#000' }"
          @sort-change="sortChange"
        >
          <!-- 日期 -->
          <el-table-column
            sortable="custom"
            align="center"
            fixed
            prop="date"
            label="日期"
          />
          <!-- 媒体账户 -->
          <el-table-column
            v-if="showTable.media && $store.state.user.roles[0] !== 'MEDIA'"
            align="center"
            fixed
            prop="userName"
            label="媒体账户"
          />
          <!-- 应用 -->
          <el-table-column
            v-if="showTable.app"
            align="center"
            fixed
            prop="appName"
            label="应用"
          />
          <!-- 广告位 -->
          <el-table-column
            v-if="showTable.place"
            width="200px"
            align="center"
            fixed
            prop="name"
            label="广告位"
          />
          <!-- 广告样式 -->
          <el-table-column
            v-if="showTable.position"
            align="center"
            fixed
            prop="positionName"
            label="广告样式"
          />
          <!-- 操作系统 -->
          <el-table-column
            v-if="showTable.os"
            align="center"
            fixed
            prop="os"
            label="操作系统"
            width="60"
          >
            <template slot-scope="{ row }">
              {{ row.os === 1 ? "Android" : row.os === 0 ? "IOS" : "-" }}
            </template>
          </el-table-column>
          <!-- 收益 -->
          <el-table-column
            v-if="$store.state.user.roles[0] !== 'MEDIA'"
            sortable="custom"
            align="center"
            prop="unitRevenue"
            label="收益"
          >
            <template slot-scope="{ row }">
              {{ row.unitRevenue.toFixed(2) }}
            </template>
          </el-table-column>
          <!-- 分成比例 -->
          <!-- <el-table-column
            v-if="$store.state.user.roles[0] !== 'MEDIA'"
            align="center"
            prop="divideIntoProportions"
            label="分成比例"
          >
            <template slot-scope="{ row }">
              {{ row.divideIntoProportions + "%" }}
            </template>
          </el-table-column> -->
          <!-- 分成比例 -->
          <el-table-column
            v-if="$store.state.user.roles[0] !== 'MEDIA'"
            align="center"
            label="分成比例"
            width="120"
          >
            <template slot-scope="{ row }">
              <p v-if="!showTable.place">
                {{ row.divideIntoProportions + "%" }}
              </p>
              <p v-if="showTable.place && row.date === '汇总'">
                {{ row.divideIntoProportions + "%" }}
              </p>
              <el-input
                v-if="showTable.place && row.date !== '汇总'"
                v-model.number="row.divideIntoProportions"
                type="number"
                min="0"
                style="width: 80px"
                @blur="handleUpdateDivideIntoProportions(row, $event)"
                @keydown.enter='handleUpdateDivideIntoProportions(row, $event)'
              />
              <span v-if="showTable.place && row.date !== '汇总'">%</span>
            </template>
          </el-table-column>
          <!-- 媒体收益 -->
          <el-table-column
            sortable="custom"
            align="center"
            prop="mediaUnitRevenue"
            label="媒体收益"
          >
            <template slot-scope="{ row }">
              {{ row.mediaUnitRevenue.toFixed(2) }}
            </template>
          </el-table-column>
          <!-- 展示 -->
          <el-table-column
            align="center"
            prop="impress"
            label="展示"
          />
          <!-- eCPM -->
          <el-table-column
            sortable="custom"
            align="center"
            prop="ecpm"
            label="eCPM"
          />
          <!-- 点击 -->
          <el-table-column
            align="center"
            prop="click"
            label="点击"
          />
          <!-- 点击率 -->
          <el-table-column
            align="center"
            prop="clickRate"
            label="点击率"
          >
            <template slot-scope="{ row }">
              {{ row.clickRate + "%" }}
            </template>
          </el-table-column>
          <!-- 审核状态 -->
          <el-table-column
            v-if="
              $store.getters.roles[0] !== 'MEDIA' &&
                $store.getters.audit == 1 &&
                (showTable.app || showTable.place)
            "
            align="center"
            prop="auditSts"
            label="审核状态"
          >
            <template slot-scope="{ row }">
              <el-switch
                v-if="row.auditSts === '1' || row.auditSts === '0'"
                v-model="row.auditSts"
                active-value="1"
                inactive-value="0"
                @change="handleUpdateAuditSts(row, $event)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 30px 0 0 0"
          :current-page="query.page"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="query.limit"
          layout="total,sizes,prev,pager,next,jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <Empty
        v-else
        class="empty_box"
        :style-obj="{
          fontSize: '20px',
        }"
      />
    </div>
  </div>
</template>

<script>
import CustSelectApp from "@/components/CustSelectApp";
// import { getPlaceList, getPlaceListByAppId } from "@/api/place";
import { getPositionList, getRoleList } from "@/api/common";
import {
  getMediaReport,
  appToAdvert,
  updateMediaReportInfo,
} from "@/api/synthReport";
import Empty from "@/components/empty";
import { getAppListByAdminId, getMediaAppList, getAppList } from "@/api/app";
import request from "@/utils/request";
import excel from "@/utils/1";

export default {
  name: "MediaReport",
  components: { CustSelectApp, Empty },
  data() {
    return {
      audit: 1, // 媒体审核权限
      tableKey: "" + new Date(),
      // 搜索参数
      query: {
        appIdList: [], // 应用id
        dateEnd: "", // 结束时间
        dateStart: "", // 开始时间
        placeIdList: [], // 广告位id
        positionIdList: [], // 广告样式id
        osIdList: [], //  操作系统
        groupByList: [],
        limit: 10, // 页容量
        page: 1, // 页码
        mediaIds: [],
        sortOrder: 1, // 排序规则 0 为正序  1 为倒序
        sortBy: "date",
      },
      isLoading: false,
      tableList: [],
      total: 0,
      appList: [], // 应用列表
      adplaceLsit: [], // 广告位列表
      positionList: [], // 广告样式列表
      mediaList: [], // 媒体列表
      // 维度显示
      showTable: {
        app: false,
        place: false,
        position: false,
        os: false,
        media: false,
      },
      // 时间获取
      date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < 1633017600000;
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      adplaceSelectAll: false,
      downLoading: false,

      //  修改媒体报表审核状态
      updateAuditSts: {
        id: "",
        auditSts: "",
        date: "",
      },
      //  修改媒体报表分成比例
      updateDivideIntoProportions: {
        id: "",
        divideIntoProportions: "",
        date: "",
      },
    };
  },
  computed: {
    allowDownload() {
      return this.$store.getters.allowDownload;
    },
  },
  watch: {
    "showTable.media": {
      handler() {
        this.query.page = 1;

        this.getMediaReport();
      },
    },
    "showTable.app": {
      handler() {
        this.query.page = 1;

        this.getMediaReport();
      },
    },
    "showTable.position": {
      handler() {
        this.query.page = 1;

        this.getMediaReport();
      },
    },
    "showTable.place": {
      handler() {
        this.query.page = 1;
        this.getMediaReport();
      },
    },
    "showTable.os": {
      handler() {
        this.query.page = 1;
        this.getMediaReport();
      },
    },
    "query.mediaIds": {
      async handler(val) {
        if (val.length > 0) {
          let arr = [];
          for (let i = 0; i < val.length; i++) {
            let resp = await getAppListByAdminId({ id: val[i] });
            if (resp.code !== 200) return;
            arr = [...arr, ...resp.data];
          }
          this.appList = arr;
          arr = arr.map((item) => {
            return item.id;
          });
          if (arr.length == 0) {
            this.adplaceLsit = [];
            return;
          }
          appToAdvert(arr).then((resp) => {
            if (resp.code !== 200) return;
            this.adplaceLsit = resp.data;
          });
        } else {
          if (this.mediaList.length === 0) {
            this.appList = [];
            this.adplaceLsit = [];
          } else {
            this.getAppList();
            this.getPlaceList();
          }
        }
      },
    },
    "query.appIdList": {
      handler(val) {
        if (val.length > 0) {
          if (this.appList.length === 0) {
            this.adplaceLsit = [];
          } else {
            this.getPlaceListByappid();
          }
        } else {
          this.adplaceLsit = [];
        }
      },
    },
  },
  async created() {
    await this.initDate();
    await this.getAppList();
    await this.getPlaceList();
    await this.getPositionList();
    await this.getMediaList();
    await this.getMediaReport();
  },
  mounted() {
    this.audit = this.$store.getters.audit;
  },
  methods: {
    async changeAudit(val) {
      let resp = await updateMediaReportInfo({
        audit: this.audit,
      });
      this.$store.dispatch("user/getInfo");
    },
    async downloadReport() {
      this.downLoading = true;
      let codeList = [
        "date",
        "userName",
        "appName",
        "name",
        "positionName",
        "os",
        "unitRevenue",
        "divideIntoProportions",
        "mediaUnitRevenue",
        "impress",
        "ecpm",
        "click",
        "clickRate",
        "auditSts",
      ];
      let nameList = [
        "日期",
        "媒体账户",
        "应用",
        "广告位",
        "广告样式",
        "操作系统",
        "收益",
        "分成比例",
        "媒体收益",
        "展示",
        "eCPM",
        "点击",
        "点击率",
        "审核状态",
      ];
      if (
        this.$store.getters.audit != 1 ||
        this.$store.state.user.roles[0] === "MEDIA"
      ) {
        codeList = codeList.filter((item) => item !== "auditSts");
        nameList = nameList.filter((item) => item !== "审核状态");
      }
      if (this.$store.state.user.roles[0] === "MEDIA") {
        codeList = codeList.filter((item) => item !== "userName");
        nameList = nameList.filter((item) => item !== "媒体账户");
        codeList = codeList.filter((item) => item !== "unitRevenue");
        nameList = nameList.filter((item) => item !== "收益");
        codeList = codeList.filter((item) => item !== "divideIntoProportions");
        nameList = nameList.filter((item) => item !== "分成比例");
        codeList = codeList.filter((item) => item !== "auditSts");
        nameList = nameList.filter((item) => item !== "审核状态");
      }
      if (!this.showTable.media) {
        codeList = codeList.filter((item) => item !== "userName");
        nameList = nameList.filter((item) => item !== "媒体账户");
      }
      if (!this.showTable.app) {
        codeList = codeList.filter((item) => item !== "appName");
        nameList = nameList.filter((item) => item !== "应用");
      }
      if (!this.showTable.place) {
        codeList = codeList.filter((item) => item !== "name");
        nameList = nameList.filter((item) => item !== "广告位");
      }
      if (!this.showTable.position) {
        codeList = codeList.filter((item) => item !== "positionName");
        nameList = nameList.filter((item) => item !== "广告样式");
      }
      if (!this.showTable.os) {
        codeList = codeList.filter((item) => item !== "os");
        nameList = nameList.filter((item) => item !== "操作系统");
      }
      if (!this.showTable.app && !this.showTable.place) {
        codeList = codeList.filter((item) => item !== "auditSts");
        nameList = nameList.filter((item) => item !== "审核状态");
      }

      this.query.codeList = codeList;
      this.query.nameList = nameList;
      try {
        const res = await this.exportToExcel();

        await excel(res, `mediaReport.xlsx`);
      } catch (e) {
        console.log(e, "导出excel错误信息");
      }
      this.downLoading = false;
    },

    // 媒体报表数据导出
    exportToExcel() {
      return request.post("/report/downloadMediaReport", this.query, {
        responseType: "blob",
      });
    },
    // 初始化时间
    initDate() {
      let time = new Date().getTime() - 1000 * 60 * 60 * 24;
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      let day = new Date(time).getDate();

      let str = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
      this.date = [str, str];
      this.query.dateEnd = str;
      this.query.dateStart = str;
    },
    // 时间改变事件
    getSTime(val) {
      this.query.dateStart = val[0];
      this.query.dateEnd = val[1];
    },
    // 获取媒体账户列表
    async getMediaList() {
      let resp = await getRoleList({ role: 7 });
      if (resp.code !== 200) return;
      this.mediaList = resp.data;
    },
    // 选择appId事件
    selectappListhandleApp(val) {
      this.query.appIdList = [...val];
    },
    selectappListhandlePlace(val) {
      this.query.placeIdList = [...val];
    },
    // 获取app列表
    async getAppList() {
      let resp = {};
      if (this.$store.state.user.roles[0] === "MEDIA") {
        resp = await getAppList();
      } else {
        resp = await getMediaAppList();
      }
      if (resp.code !== 200) return;
      this.appList = resp.data;
    },
    // 获取广告位列表
    async getPlaceList() {
      let arr = this.appList.map((item) => {
        return item.id;
      });
      if (arr.length === 0) {
        this.adplaceLsit = [];
      } else {
        let resp = await appToAdvert(arr);
        if (resp.code !== 200) return;
        if (!resp.data) {
          this.adplaceLsit = [];
          return;
        }
        this.adplaceLsit = resp.data;
      }
    },
    // 选择广告位事件
    adplaceIdchange(val) {
      this.query.placeIdList = val;
    },
    // 获取广告样式列表
    async getPositionList() {
      let resp = await getPositionList();
      if (resp.code !== 200) return;
      this.positionList = resp.data;
    },
    // 搜索按钮
    handleSearch() {
      this.query.page = 1;
      this.getMediaReport();
    },
    async getMediaReport() {
      this.isLoading = true;
      this.query.groupByList = [];
      this.query.groupByList.push("a.date");
      if (this.query.mediaIds.length > 0 || this.showTable.media) {
        this.query.groupByList.push("sual.user_id");
      }
      if (this.query.appIdList.length > 0 || this.showTable.app) {
        this.query.groupByList.push("a.app_id");
      }
      if (this.query.placeIdList.length > 0 || this.showTable.place) {
        this.query.groupByList.push("a.place_id");
      }
      if (this.query.positionIdList.length > 0 || this.showTable.position) {
        this.query.groupByList.push("a.position_id");
      }
      if (this.query.osIdList.length > 0 || this.showTable.os) {
        this.query.groupByList.push("app.os");
      }
      if (this.query.osIdList[0] === "") {
        this.query.osIdList = [];
      }
      let resp = await getMediaReport(this.query);
      if (resp.code !== 200) return;
      if (!resp.data || resp.data.items.length === 0) {
        this.tableList = [];
        return;
      }
      this.tableList = resp.data.items;

      this.tableList[0].os = "-";
      this.total = resp.data.total;
      this.$bus.$emit("totop");
      this.isLoading = false;
      this.tableKey = "" + new Date();
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.getMediaReport();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getMediaReport();
    },
    async getPlaceListByappid() {
      if (this.query.appIdList.length === 0) {
        this.adplaceLsit = [];
      }
      let resp = await appToAdvert(this.query.appIdList);
      if (resp.code !== 200) return;
      this.adplaceLsit = resp.data;
    },
    sortChange({ column, prop, order }) {
      this.query.sortBy = prop;
      this.query.sortOrder = order == "ascending" ? 0 : 1;

      this.getMediaReport();
    },

    async updateMediaReportInfo(row) {
      let resp = await updateMediaReportInfo(row);
      this.getMediaReport();
      if (resp.code !== 200) return this.$message.error("操作失败");
      return this.$message.success("操作成功");
    },
    // 审核状态状态按钮点击事件
    handleUpdateAuditSts(row, auditSts) {
      if (this.showTable.place) {
        this.updateAuditSts.id = row.id;
        this.updateAuditSts.appId = "";
      } else if (this.showTable.app) {
        this.updateAuditSts.appId = row.appId;
        this.updateAuditSts.id = "";
      }
      this.updateAuditSts.auditSts = auditSts;
      this.updateAuditSts.date = row.date;
      this.updateMediaReportInfo(this.updateAuditSts);
    },
    // 分成比例输入框 失去焦点或者回车事件
    handleUpdateDivideIntoProportions(row, divideIntoProportions) {
      this.updateDivideIntoProportions.id = row.id;
      this.updateDivideIntoProportions.divideIntoProportions =
        divideIntoProportions;
      this.updateDivideIntoProportions.date = row.date;

      this.updateMediaReportInfo(this.updateDivideIntoProportions);
    },
  },
};
</script>

<style lang="scss" scoped>
.media-report-contianer {
  position: relative;
  width: 100%;
  .search {
    background-color: #fff;
    padding: 30px 40px 40px 30px;
    // height: 100px;
    width: 100%;
  }
}
.right_btn {
  display: flex;
  line-height: 30px;
  div {
    margin-right: 10px;
  }
}
.table {
  margin-top: 10px;
  position: relative;
  width: 100%;
  // border: 1px solid #000;
  padding: 30px;
  background-color: #fff;
  .group_box {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 13px;
    h3 {
      font-size: 13px;
    }
  }
  .empty_box {
    margin-top: 50px;
    width: 100%;
    height: 300px;
  }
}
</style>
