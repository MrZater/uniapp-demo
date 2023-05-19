<template>
  <div class="add-abtest-container">
    <el-dialog
      v-if="showTestDialog"
      :title="addAbtest ? '添加A/B分组' : 'A/B分组编辑'"
      :visible.sync="showTestDialog"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="closeTestDialog"
    >
      <el-form
        ref="testdialog"
        :model="testquery"
        label-width="150px"
        :rules="testRules"
      >
        <el-form-item label="应用:">
          <span>{{ appName }}</span>
        </el-form-item>
        <el-form-item label="广告位:">
          <span>{{ placeName }}</span>
        </el-form-item>
        <el-form-item label="流量分组:">
          <span>{{ group.name }}</span>
        </el-form-item>
        <el-form-item
          label="A/B测试名称:"
          prop="testName"
        >
          <el-input
            v-model="testquery.testName"
            style="width: 20rem"
            placeholder="请输入A/B测试名称"
          />
        </el-form-item>
        <el-form-item
          label="流量划分形式"
          prop="type"
        >
          <el-radio-group
            v-model="testquery.type"
            :disabled="!addAbtest"
          >
            <el-radio :label="0">
              请求
            </el-radio>
            <el-radio :label="1">
              用户
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建分组:">
          <el-button
            type="primary"
            size="mini"
            @click="handleAddTest"
          >
            添加分组
          </el-button>
        </el-form-item>
        <el-table
          border
          style="width: 42rem; margin-left: 3rem"
          :data="
            testquery.abTestList.filter((item) => {
              return item.testId !== 'default';
            })
          "
          fit
          highlight-current-row
        >
          <!-- 分组名称 -->
          <el-table-column
            label="分组名称"
            fixed
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'abTestList.' + scope.$index + '.groupName'"
                :rules="{
                  required: true,
                  message: '分组名称不能为空',
                  trigger: 'blur',
                }"
                label-width="0"
              >
                <el-input
                  v-model="scope.row.groupName"
                  size="mini"
                  style="width: 10rem"
                  :required="true"
                  placeholder="请填写分组名称"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="testquery.type == 1"
            label="比例"
            fixed
            align="center"
            width="80px"
          >
            <template slot-scope="scope">
              {{ getProportion(scope.$index) + "%" }}
            </template>
          </el-table-column>
          <!-- 比例 -->
          <el-table-column
            :label="testquery.type == 0 ? '比例' : '用户区间'"
            fixed
            prop="proportion"
            align="center"
            width="250px"
            :render-header="testrenderHeader"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.intervalList }} -->

              <el-form-item
                v-if="testquery.type == 0"
                label-width="0"
                :prop="'abTestList.' + scope.$index + '.proportion'"
                :rules="[
                  {
                    required: true,
                    message: '比例不能为空',
                    trigger: 'blur',
                  },
                  ,
                  {
                    required: true,
                    trigger: 'blur',
                    validator: proportionValidator,
                  },
                ]"
              >
                <el-input
                  v-model.number="scope.row.proportion"
                  size="mini"
                  style="width: 200px"
                  prop="proportion"
                  placeholder="请填写比例"
                >
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
              <div v-if="testquery.type == 1">
                <template v-for="(item, index) in scope.row.intervalList">
                  <div
                    :key="index"
                    style="display: flex"
                  >
                    <el-form-item
                      label-width="0px"
                      label=""
                      :prop="
                        'abTestList.' +
                          scope.$index +
                          '.intervalList[' +
                          index +
                          '][0]'
                      "
                      :rules="[
                        {
                          required: true,
                          trigger: 'blur',
                          validator: intervalListValidator,
                        },
                      ]"
                    >
                      <el-input-number
                        v-model.number="scope.row.intervalList[index][0]"
                        size="mini"
                        :max="100"
                        :min="1"
                        style="width: 100px; margin-left: 5px"
                        placeholder=""
                      />
                    </el-form-item>
                    <el-form-item
                      label-width="0px"
                      label=""
                      :prop="
                        'abTestList.' +
                          scope.$index +
                          '.intervalList[' +
                          index +
                          '][1]'
                      "
                      :rules="[
                        {
                          required: true,
                          trigger: 'blur',
                          validator: intervalListValidator,
                        },
                      ]"
                    >
                      <el-input-number
                        v-model.number="scope.row.intervalList[index][1]"
                        size="mini"
                        :max="100"
                        :min="1"
                        style="width: 100px; margin-left: 5px"
                        placeholder=""
                      />
                    </el-form-item>
                    <span
                      v-if="
                        testquery.abTestList[scope.$index]['intervalList']
                          .length > 1
                      "
                      style="
                        line-height: 35px;
                        color: red;
                        cursor: pointer;
                        margin-left: 5px;
                      "
                      class="closeIcon el-icon-circle-close"
                      @click="closeintervalList(scope.$index, index)"
                    />
                  </div>
                </template>
                <el-button
                  type="primary"
                  @click="handleAddintervalList(scope.$index)"
                >
                  添加区间
                </el-button>
              </div>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            width="100"
            label="操作"
            fixed
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-if="
                  !scope.row.testId &&
                    scope.$index !== 0 &&
                    testquery.abTestList.length > 2
                "
                type="danger"
                size="mini"
                @click="closeTest(scope.$index)"
              >
                删除
              </el-button>
              <el-switch
                v-if="
                  scope.row.testId && (testDisabled || scope.row.sts !== 'A')
                "
                v-model="scope.row.sts"
                style="height: 20px"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="'A'"
                :inactive-value="'S'"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span
        v-if="allowOperate"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="closeTestDialog"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleSubmitTestForm"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tips from "@/components/tips/HelpHint/HelpHint.vue";

import { addABTest, updateABTest } from "@/api/aggregate";

export default {
  name: "AddABTestDialog",
  components: { tips },
  props: {
    showTestDialogTemp: {
      type: Boolean,
      default: false,
    },
    addAbtest: {
      type: Boolean,
      default: false,
    },
    testqueryTemp: {
      type: Object,
      default: {
        placeId: "",
        groupId: "",
        testName: "",
        type: 0,
        abTestList: [
          {
            groupName: "A组",
            proportion: 50,
            testId: "",
            sts: "A",
            intervalList: [[1, 1]],
          },
          {
            groupName: "B组",
            proportion: 50,
            testId: "",
            sts: "A",
            intervalList: [[1, 1]],
          },
        ],
      },
    },
    appName: {
      default: "",
    },
    placeName: {
      default: "",
    },
    group: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      testRules: {
        testName: [
          { required: true, message: "请填写测试名称", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择区分形式", trigger: "blur" }],
      },
      testquery: {},
      showTestDialog: false,
      testDisabled: false,
    };
  },

  computed: {
    allowOperate() {
      return this.$store.getters.allowOperate;
    },
  },
  watch: {
    testqueryTemp: {
      handler(val) {
        this.testquery = JSON.parse(JSON.stringify(val));
      },
      deep: true,
    },
    showTestDialogTemp: {
      handler(val) {
        this.showTestDialog = val;
      },
    },
    testquery: {
      handler(val) {
        let num = 0;
        val.abTestList.forEach((item) => {
          if (item.sts === "A") {
            num++;
          }
        });
        if (num > 2) {
          this.testDisabled = true;
        } else {
          this.testDisabled = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    getProportion(index) {
      let proportion = 0;
      this.testquery.abTestList[index].intervalList.forEach((item) => {
        let p = item[1] - item[0] + 1;
        proportion += p;
      });
      return proportion;
    },
    handleAddintervalList(index) {
      this.testquery.abTestList[index].intervalList.push([1, 1]);
    },
    closeintervalList(index, i) {
      this.testquery.abTestList[index].intervalList.splice(i, 1);
    },
    closeTestDialog() {
      this.$emit("closeTestDialog");
    },
    // 点击添加分组
    handleAddTest() {
      if (!this.addAbtest) {
        let len = this.testquery.abTestList.length;
        this.testquery.abTestList.splice(len - 1, 0, {
          groupName: "",
          proportion: 0,
          sts: "A",
          intervalList: [[1, 1]],
        });
      } else {
        this.testquery.abTestList.push({
          groupName: "",
          proportion: 0,
          sts: "A",
          intervalList: [[1, 1]],
        });
      }
    },
    // 点击删除分组
    closeTest(index) {
      this.testquery.abTestList.splice(index, 1);
    },
    // ab测试弹框确定按钮
    async handleSubmitTestForm() {
      this.$refs.testdialog.validate(async (val) => {
        if (!val) return;
        // 验证比例总和
        let num = 0;
        let testquery = JSON.parse(JSON.stringify(this.testquery));
        testquery.abTestList.forEach((item) => {
          if (item.sts === "A") {
            console.log(item.proportion);
            let proportion = +item.proportion;
            num = +num + proportion;
          }
        });
        if (testquery.type == 1) {
          let arr = [];
          let sum = 0;
          let arrNum = 0;

          testquery.abTestList.forEach((item, index) => {
            if (item.sts === "A") {
              if (item.intervalList) {
                item.intervalList.forEach((child, c) => {
                  arrNum++;
                  arr.push(child[0]);
                  arr.push(child[1]);
                  sum = sum + (child[1] - child[0]);
                });
              } else {
              }
            } else {
              if (item.intervalList) {
              }
            }
          });
          arr = arr.sort((a, b) => {
            return a - b;
          });
          console.log(arr);
          let len = arr.length;
          if (this.addAbtest) {
            if (sum + arrNum != 100 || arr[0] != 1 || arr[len - 1] != 100) {
              console.log(sum + arrNum, arr[0], arr[len - 1]);
              return this.$message.error("输入区间有误！");
            }
          }
        } else {
          if (num !== 100) {
            return this.$message.error("比例总和必须为100");
          }
        }

        // 判断模式
        if (this.addAbtest) {
          let resp = await addABTest(testquery);
          if (resp.code === 200) {
            this.$message.success("添加成功！");
            this.$emit("editSuccess");
          }
        } else {
          let resp = await updateABTest(testquery);
          if (resp.code === 200) {
            this.$message.success("配置成功！");
            this.$emit("editSuccess");
          }
        }
      });
    },

    proportionValidator(rule, value, callback) {
      if (+value < 0) {
        callback(new Error("比例不能为负数！"));
      } else if (typeof +value !== "number") {
        callback(new Error("比例必须为数字！"));
      } else {
        callback();
      }
    },
    intervalListValidator(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入区间值！"));
      } else {
        return callback();
      }
    },
    testrenderHeader(h, { column, $index }) {
      if (this.testquery.type == 0) {
        return this.$createElement("span", "比例");
      } else if (this.testquery.type == 1) {
        return this.$createElement("tips", {
          props: {
            content:
              "对用户进行分组，每个分组配置一个数值区间，各分组数值区间不可以交叉。",
            title: "用户区间",
            isShow: true,
          },
        });
      }
    },
  },
};
</script>
