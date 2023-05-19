<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <span class="item">选择素材包 </span>
          <el-select
            v-model="creativeListParams.packageId"
            placeholder="请选择素材包"
          >
            <el-option
              v-for="item in materialsPackage"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col
          v-if="roles[0] === 'SUPER_ADMIN' || roles === 'ADMIN'"
          :span="7"
        >
          <span class="item">选择审核人员 </span>
          <el-select
            v-model="creativeListParams.auditUser"
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
        <el-col :span="6">
          <el-button
            type="primary"
            @click="searchBtn"
          >
            筛选
          </el-button>
        </el-col>
      </el-row>
      <div class="tabs_box">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="待审核" />
          <el-tab-pane label="已通过" />
          <el-tab-pane label="已拒绝" />
        </el-tabs>
        <el-row :gutter="24">
          <el-col :span="7">
            <span class="item">素材类型 </span>
            <el-select
              v-model="creativeListParams.type"
              clearable
              placeholder="请选择素材类型"
            >
              <el-option
                v-for="item in materialsType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="item">搜索</span>
            <el-input
              v-model="creativeListParams.keyWords"
              clearable
              style="width: 300px"
              placeholder="输入 关键词/落地页/素材ID/标签 搜索"
            />
          </el-col>
          <el-col :span="9">
            <span
              v-if="activeName == 0"
              class="item"
            >上传时间 </span>
            <span
              v-if="activeName == 1 || activeName == 2"
              class="item"
            >审核时间
            </span>
            <el-date-picker
              v-model="time"
              :clearable="true"
              type="daterange"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="DateChange"
            />
          </el-col>
        </el-row>
        <el-row class="two_row">
          <el-col class="two_col">
            <el-button
              type="primary"
              @click="searchBtn"
            >
              搜索
            </el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span
              v-if="activeName == 0"
              class="item"
            >待审核素材{{ total }}张
            </span>
            <span
              v-if="activeName == 1"
              class="item"
            >已通过素材{{ total }}张
            </span>
            <span
              v-if="activeName == 2"
              class="item"
            >已拒绝素材{{ total }}张
            </span>
          </el-col>
          <el-col :span="7">
            <el-button
              type="primary"
              size="mini"
              @click="allSubmit"
            >
              批量提交
            </el-button>
          </el-col>
        </el-row>
        <!-- 视频图片 -->
        <div
          v-loading="videoLoading"
          class="video_container"
        >
          <div
            v-if="CreativeList.length > 0"
            class="video_box"
          >
            <el-checkbox-group
              v-model="checkList"
              @change="checkLists"
            >
              <div
                v-for="(e, i) in CreativeList"
                :key="e.id"
                class="video_item"
              >
                <label
                  class="checkbox_label"
                  for="checkbox_item"
                >
                  <div class="video">
                    <el-checkbox
                      id="checkbox_item"
                      class="checkbox_item"
                      :label="e.id"
                    ><br></el-checkbox>
                    <div
                      class="expand"
                      @click="expandialog(e)"
                    >
                      <img
                        src="./img/expand.png"
                        alt=""
                      >
                    </div>
                    <video
                      v-if="e.type == 2"
                      ref="video"
                      controlsList="nodownload"
                      noremote
                      footbar
                      disablePictureInPicture
                      noremoteplayback
                      nofullscreen
                      :controls="true"
                      :autoplay="false"
                      :src="e.creativeUrl"
                      @mouseover="player(i)"
                      @mouseleave="pauser(i)"
                    />

                    <img
                      v-if="e.type == 1"
                      :src="e.creativeUrl"
                      alt=""
                    >
                  </div>
                </label>
                <p
                  v-if="activeName == 0"
                  class="up_time"
                >
                  上传时间：{{
                    e.uploadTime | updateTimer("YYYY-MM-DD hh:mm:ss")
                  }}
                </p>
                <p
                  v-if="activeName == 1 || activeName == 2"
                  class="up_time"
                >
                  审核时间：{{
                    e.auditTime | updateTimer("YYYY-MM-DD hh:mm:ss")
                  }}
                </p>
                <div class="grade">
                  <el-radio-group
                    v-model="e.level"
                    size="small"
                    @change="handlePass(e, i)"
                  >
                    <el-radio-button label="A">
                      A
                    </el-radio-button>
                    <el-radio-button label="B">
                      B
                    </el-radio-button>
                    <el-radio-button label="C">
                      C
                    </el-radio-button>
                    <el-radio-button label="D">
                      D
                    </el-radio-button>
                  </el-radio-group>
                </div>
                <div class="handle_pass">
                  <el-radio-group
                    v-model="e.auditSts"
                    @change="handlePass(e, i)"
                  >
                    <el-radio label="1">
                      通过
                    </el-radio>
                    <el-radio
                      id="current"
                      label="2"
                    >
                      拒绝
                    </el-radio>
                  </el-radio-group>
                  <span
                    class="video_detail"
                    @click="goDetail(e)"
                  >详情</span>
                </div>
              </div>
            </el-checkbox-group>
          </div>
          <Empty
            v-else
            :style-obj="styleObj"
          />
        </div>

        <div class="pages">
          <el-pagination
            :current-page="CreativeListParams.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="CreativeListParams.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <!-- <div class="footer_all">
          <div class="left">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            已选({{ checkList.length }})个
          </div>
          <div class="right">
            <el-button type="primary" size="mini">批量同意</el-button>
            <el-button type="primary" size="mini">批量拒绝</el-button>
          </div>
        </div> -->
      </div>
    </el-card>
    <div class="wrap">
      <el-dialog
        center
        :visible.sync="videoDialog"
        width="40%"
        @close="closeExpandDialog"
      >
        <div class="dialogbox">
          <video
            v-if="dialogData.type == 2"
            controls
            :src="dialogData.creativeUrl"
          />
          <img
            v-if="dialogData.type == 1"
            :src="dialogData.creativeUrl"
            alt=""
          >
        </div>
      </el-dialog>
    </div>
    <!-- 详情弹框 -->
    <el-dialog
      center
      :title="
        activeName == 0
          ? '待审核素材详情'
          : activeName == 1
            ? '已通过素材详情'
            : activeName == 2
              ? '已拒绝素材详情'
              : ''
      "
      :visible.sync="detailDialog"
      width="70%"
      @close="closeDetailDialog"
    >
      <div class="detail">
        <div class="left">
          <div class="img">
            <div
              class="expand"
              @click="expandialog(detailArr)"
            >
              <img
                src="./img/expand.png"
                alt=""
              >
            </div>
            <img
              v-if="detailArr.type == 1"
              :src="detailArr.creativeUrl"
              alt=""
            >
            <video
              v-if="detailArr.type == 2"
              :src="detailArr.creativeUrl"
            />
          </div>
        </div>
        <div class="right">
          <div class="title">
            基本信息
          </div>
          <p>素材ID: {{ detailArr.id }}</p>
          <p>素材描述: {{ detailArr.description }}</p>
          <p>落地页: {{ detailArr.landingPage }}</p>
          <div class="label">
            <p class="left">
              自定义标签 :
            </p>
            <div class="right">
              <div class="left_text">
                <el-input
                  v-model="detailArr.tags"
                  type="textarea"
                  :rows="8"
                  placeholder="多个标签以换行和逗号分隔开"
                  @blur="transfer"
                />
              </div>
              <!-- <div class="center_btn"><el-button type="primary" size="small" class="el-icon-d-arrow-right" @click="transfer">添加</el-button></div> -->
              <!-- <div class="right_text">
                <el-input type="textarea" :rows="8" placeholder="" v-model="detailArr.tags"> </el-input>
              </div> -->
            </div>
          </div>

          <div class="grades">
            <span class="grades_text">素材等级: </span>
            <div>
              <el-radio-group
                v-model="detailArr.level"
                size="small"
              >
                <el-radio-button label="A" />
                <el-radio-button label="B" />
                <el-radio-button label="C" />
                <el-radio-button label="D" />
              </el-radio-group>
            </div>
          </div>
          <div class="audit">
            <span class="audit_text">审核: </span>
            <div>
              <el-radio-group v-model="detailArr.auditSts">
                <el-radio label="1">
                  通过
                </el-radio>
                <el-radio label="2">
                  拒绝
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="plain"
          @click="detailDialog = false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleTags"
        >提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { creativeSelect, auditPeople, customTags, auditAll, creativeList } from '@/libs/api'
import Empty from '@/components/empty'
import { mapGetters } from 'vuex'
import { toDate, auto } from '@/utils/toTimer'
export default {
  components: {
    Empty
  },
  computed: {
    ...mapGetters(['roles'])
  },
  data() {
    return {
      materialsPackage: [],
      auditPeopleOptions: [],
      creativeListParams: {
        page: 1,
        limit: 30,
        packageId: 0,
        auditSts: '0',
        auditUser: '',
        type: '',
        keyWords: '',
        beginDate: '',
        endDate: ''
      },
      detailArr: {},
      styleObj: {
        fontSize: '14px'
      },

      dialogData: {},
      videoLoading: false,
      detailDialog: false,
      total: 0,
      CreativeList: [],
      CreativeListParams: {
        page: 1,
        limit: 30,
        packageId: 0,
        auditSts: '0',
        auditUser: '',
        type: '',
        keyWords: '',
        beginDate: '',
        endDate: ''
      },
      activeName: '0',
      checkList: [],
      checkAll: false,
      time: [],
      idArr: [],
      videoDialog: false,
      pickerOptions: auto(),
      materialsType: [
        { id: 1, name: '图片' },
        { id: 2, name: '视频' }
      ],
      resultArr: []
    }
  },
  mounted() {
    // this.getDate()
    // this.getCreativeSelect();
    // this.getAuditPeople();
    // this.getCreativeList();
  },
  methods: {
    getDate() {
      // // 昨天
      // let today = toDate(Date.now() - 24 * 60 * 60 * 1000)
      // // 7天前
      // let dayBefore = toDate(Date.now() - 7 * 24 * 60 * 60 * 1000)
      // this.time = [dayBefore, today]
      // this.CreativeListParams.beginDate = this.time[0]
      // this.CreativeListParams.endDate = this.time[1]
    },
    async getCreativeSelect() {
      const res = await creativeSelect()
      if (res.code != 200) return
      res.data.forEach((e, i) => {
        if (!e) res.data.splice(i, 1)
      })
      this.materialsPackage = res.data
    },
    // 审核人员下拉
    async getAuditPeople() {
      const res = await auditPeople()
      if (res.code != 200) return
      this.auditPeopleOptions = res.data
    },
    async getCreativeList() {
      this.checkList = []
      this.videoLoading = true
      const res = await creativeList(this.CreativeListParams)
      if (res.code != 200) return this.$message.error(res.msg)
      // if (res.data.items.length > 0) {
      //   res.data.items.forEach(e => {
      //     this.idArr.push(e.id)
      //   })
      // }
      setTimeout(() => {
        this.videoLoading = false
      }, 700)
      this.CreativeList = res.data.items
      this.total = res.data.total
    },
    DateChange() {
      if (this.time) {
        this.creativeListParams.beginDate = this.time[0]
        this.creativeListParams.endDate = this.time[1]
      } else {
        this.creativeListParams.beginDate = ''
        this.creativeListParams.endDate = ''
        this.time = []
      }
    },
    handleClick() {
      this.CreativeListParams.limit = 30
      this.CreativeListParams.page = 1
      this.checkList = []
      this.checkAll = false
      this.idArr = []
      if (this.activeName == 0) {
        this.CreativeListParams.auditSts = '0'
        this.creativeListParams.auditSts = '0'
        this.getCreativeList()
      }
      if (this.activeName == 1) {
        this.CreativeListParams.auditSts = '1'
        this.creativeListParams.auditSts = '1'
        this.getCreativeList()
      } else if (this.activeName == 2) {
        this.CreativeListParams.auditSts = '2'
        this.creativeListParams.auditSts = '2'
        this.getCreativeList()
      }
    },
    handlePass(e, i) {
      this.checkList.push(e.id)
      this.checkList = Array.from(new Set(this.checkList))
      this.checkLists()
      // this.checkList.forEach(e => {
      //   let index = this.CreativeList.findIndex(item => {
      //     return item.id === e
      //   })
      //   resultArr.push(this.CreativeList[index])
      // })
      // this.resultArr = resultArr
    },

    player(i) {
      // let arr = document.querySelector('.video_container').querySelector('vodeo')
      // // arr.play()
    },
    pauser(i) {
      // let arr = document.querySelector('.video_box').querySelectorAll('video')[i]
      // arr.load()
      // this.$nextTick(() => {
      //   arr.pause()
      // })
    },
    expandialog(e) {
      this.dialogData = e
      this.videoDialog = true
    },
    async transfer() {
      let obj = {
        id: this.detailArr.id,
        tags: this.detailArr.tags
      }
      const res = await customTags(obj)
      if (res.code != 200) return

      this.getCreativeList()
    },
    searchBtn() {
      this.CreativeListParams = Object.assign({}, this.creativeListParams)
      this.getCreativeList()
    },
    // 关闭详情弹框
    closeDetailDialog() {
      this.detailArr = {}
    },
    handleCheckAllChange() {},
    checkLists() {
      let resultArr = []
      this.checkList.forEach((e) => {
        let index = this.CreativeList.findIndex((item) => {
          return item.id === e
        })
        resultArr.push(this.CreativeList[index])
      })
      this.resultArr = resultArr

      // 当选触发全选
      // this.checkAll = val.length === this.idArr.length
    },
    // 批量审核
    async allSubmit() {
      if (this.checkList.length == 0) { return this.$message.warning('请选择审核素材') }
      let arr = []
      this.resultArr.forEach((e) => {
        let obj = {
          creativeId: e.id,
          level: e.level,
          auditSts: e.auditSts
        }
        arr.push(obj)
      })
      const res = await auditAll(arr)
      if (res.code != 200) return this.$message.error(res.msg)
      this.$message.success('操作成功！')
      this.getCreativeList()
    },
    goDetail(e) {
      e = JSON.parse(JSON.stringify(e))
      this.detailArr = e
      this.detailDialog = true
    },
    closeExpandDialog() {
      this.dialogData = {}
    },
    // 单个审核
    async handleTags() {
      let obj = [
        {
          creativeId: this.detailArr.id,
          level: this.detailArr.level,
          auditSts: this.detailArr.auditSts
        }
      ]
      const res = await auditAll(obj)
      if (res.code != 200) return this.$message.error(res.msg)
      this.getCreativeList()
      this.$message.success('操作成功！')
      this.detailDialog = false
    },
    // 全选
    handleCheckAllChange(val) {
      this.checkList = val ? this.idArr : []
    },
    handleSizeChange(val) {
      this.CreativeListParams.limit = val
      this.getCreativeList()
    },
    handleCurrentChange(val) {
      this.CreativeListParams.page = val
      this.getCreativeList()
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.tabs_box {
  width: 100%;
  /* height: 500px; */
  margin-top: 50px;
  /* background-color: chocolate; */
}
.two_row {
  margin-top: 20px;
}
.two_col {
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
}
.video_box {
  overflow: hidden;
  /* height: 500px; */
  background-color: #f5f7f9;
  margin-top: 30px;
  /* padding-bottom: 30px; */
}
.pages {
  margin-bottom: 30px;
}
.video_item {
  float: left;
  width: 220px;
  /* height: 500px; */
  background-color: #fff;
  margin: 0px 5px 10px 5px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid transparent;
}
.video_item:hover {
  border: 1px solid #ff513c;
}
.video {
  position: relative;
  width: 220px;
  height: 390px;
}
.video video {
  width: 220px;
  height: 390px;
}
.video img {
  width: 220px;
  height: 390px;
}
.up_time {
  color: #999;
  font-size: 13px;
  margin: 10px 5px;
  padding-left: 10px;
}

.el-radio__input.is-checked .el-radio__inner {
  background-color: red !important;
}
.handle_pass {
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
  padding: 0 10px;
}
.video_detail {
  margin-left: 20px;
  color: #ff513c;
  cursor: pointer;
  font-size: 14px;
}
.video_container {
  display: flex;
  align-items: center;
  min-height: 300px;
}
.player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
}
.foot_video {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  background: transparent;
}
.expand {
  z-index: 9;
  position: absolute;
  bottom: 38px;
  right: 60px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.expand img {
  width: 100%;
  height: 100%;
}
.dialogbox {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 390px; */
  /* background: crimson; */
}
.dialogbox video {
  width: 70%;
}
.dialogbox img {
  width: 70%;
}
video::-webkit-media-controls-fullscreen-button {
  display: none;
}
.wrap ::v-deep .el-dialog,
.el-pager li {
  background: transparent;
  box-shadow: 0 0px 0px transparent;
}
.wrap ::v-deep .el-dialog__headerbtn {
  font-size: 30px !important;
}
.wrap ::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #fff !important;
}
.checkbox_item {
  position: absolute;
  top: 10px;
  right: 15px;
}
.right p {
  /* font-size: 16px; */
  margin: 10px;
}
.footer_all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: fixed;
  bottom: 0; */
  width: 100%;
  height: 60px;
  /* background: chartreuse; */
}
#current ::v-deep .el-radio__input.is-checked .el-radio__inner {
  background: #ff4906;
  border-color: #ff4906;
}
#current ::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #ff4906;
}
.title {
  font-size: 17px;
  margin-bottom: 20px;
}
.grade {
  width: 100%;
  margin: 0 auto;
  padding-left: 10px;
}
/*video默认aduio音量按钮*/
.video video::-webkit-media-controls-mute-button {
  display: none !important;
}
.el-checkbox ::v-deep .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.el-checkbox ::v-deep .el-checkbox__inner:after {
  /* width: 20px; */
  height: 12px;
  font-weight: 700;
  border-width: 2px;
  left: 6px;
  top: 0px;
}
.checkbox_label {
  display: block;
}
.detail {
  display: flex;
  width: 100%;
}
.detail .left {
  display: flex;
  justify-content: center;
  padding-right: 30px;
  /* width: 40%; */
}
.detail .left .img {
  position: relative;
  width: 220px;
  height: 390px;
  /* background: chocolate; */
}
.detail .left .img img {
  width: 100%;
  height: 100%;
}
.detail .left .img video {
  width: 100%;
  height: 100%;
}
.detail .right {
  flex: 1;
  /* background: rgb(11, 146, 45); */
}
.detail .right .label {
  display: flex;
}
.detail .right .label .left {
  margin-right: 20px;
}
.detail .right .label .right {
  display: flex;
  align-items: center;
  flex: 1;
  /* background: red; */
}
.center_btn {
  margin: 0 20px;
}
.item {
  font-size: 14px;
  color: #1f1f1f;
}
.grades,
.audit {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.audit_text,
.grades_text {
  margin-right: 20px;
}
.active {
  border: 2px solid #409eff;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin: 30px auto;
}
</style>
