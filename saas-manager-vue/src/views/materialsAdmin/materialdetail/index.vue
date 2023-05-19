<template>
  <div>
    <el-card>
      <h3>待审核素材详情</h3>
      <div class="detail">
        <div class="left">
          <div class="img">
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
          <div>基本信息</div>
          <p>素材ID: {{ detailArr.id }}</p>
          <p>素材描述: {{ detailArr.description }}</p>
          <p>落地页: {{ detailArr.landingPage }}</p>
          <div class="label">
            <div class="left">
              自定义标签 :
            </div>
            <div class="right">
              <div class="left_text">
                <el-input
                  v-model="leftVal"
                  type="textarea"
                  :rows="8"
                  placeholder="多个标签以换行和逗号分隔开"
                />
              </div>
              <div class="center_btn">
                <el-button
                  type="primary"
                  size="small"
                  class="el-icon-d-arrow-right"
                  @click="transfer"
                >
                  添加
                </el-button>
              </div>
              <div class="right_text">
                <el-input
                  v-model="detailArr.tags"
                  type="textarea"
                  :rows="8"
                  placeholder=""
                />
              </div>
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
      <div class="footer">
        <el-button type="plain">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleTags"
        >
          提交
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
// import { customTags,auditAll } from '@/libs/api'
export default {
  data() {
    return {
      radio3: '',
      leftVal: '',
      rightVal: '',
      radio: '',
      detailArr: {}
    }
  },
  mounted() {
    let params = JSON.parse(this.$route.query.e)
    this.detailArr = params
  },
  methods: {
    async transfer() {
      this.detailArr.tags = this.leftVal
      this.leftVal = ''
      let obj = {
        id: this.detailArr.id,
        tags: this.detailArr.tags
      }

      const res = await customTags(obj)
      if (res.code != 200) return
    },
    // 单个审核
    async handleTags() {
      let obj = [{
        creativeId: this.detailArr.id,
        level: this.detailArr.level,
        auditSts: this.detailArr.auditSts
      }]
      const res = await auditAll(obj)
      if (res.code != 200) return this.$message.error(res.msg)
      this.$message.success('操作成功！')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.el-card {
  width: 80%;
  /* height: 500px; */
  /* background: chartreuse; */
  margin: 0 auto;
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
.footer {
  display: flex;
  justify-content: flex-end;
  margin: 30px auto;
}
</style>
