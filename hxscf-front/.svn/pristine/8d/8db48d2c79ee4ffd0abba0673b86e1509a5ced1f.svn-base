<!--*
 * @Author: jia.li 
 * @Date: 2020-08-17 10:26:25
 * @Last Modified by:   jia.li
 * @Last Modified time: 2020-08-17 14:30:45
 */
 -->
<template>
  <div class="edit-column-table">
    <el-table
      ref="table"
      class="br-table"
      v-loading="loading"
      :data="list"
      :border="border"
      :stripe="stripe"
      width="100%"
      :height="height"
    >
      <el-table-column type="selection" width="55" v-if="checkBox"></el-table-column>
      <el-table-column type="index" width="55" label="序号" v-if="index"></el-table-column>
      <el-table-column
        v-for="(column,index) in columns.filter(i=>i.checked)"
        :width="column.width ? column.width : ''"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable ? true : false"
        :show-overflow-tooltip="column.tip ? true : false"
      >
        <template slot-scope="scope">
          <span v-if="column.render">{{column.render(scope.row)}}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="handles.label" :width="handles.width" align="center" fixed="right">
        <template slot="header" slot-scope="scope">
          <div class="edit-column">
            <span>{{handles.label}}</span>
            <span @click="editColumn(scope)" class="edit-action">
              <i class="el-icon-s-tools"></i>
            </span>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in handles.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            @click="handleButton(item.methods,scope.row,scope.row)"
            size="mini"
          >{{item.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="自定义列，勾选需要显示的列，拖动列名进行排序"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="edit-column-box">
        <draggable v-model="tbcolumns">
          <div class="edit-column-item" v-for="(column) in tbcolumns" :key="column.prop">
            <div class="dir-item left-item">
              <el-checkbox v-model="column.checked" :disabled="column.required"></el-checkbox>
              <span class="column-label">{{column.label}}</span>
            </div>
            <div class="dir-item right-item">
              <span class="sign-span">{{column.required?"（必选）":""}}</span>
              <span class="width-span">宽度</span>
              <span>
                <el-input v-model="column.width" />
              </span>
              <span class="unit-span">px</span>
            </div>
          </div>
        </draggable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="editOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class index extends Vue {
  @Prop({ default: false, type: Boolean }) checkBox;
  @Prop({ default: false, type: Boolean }) index;
  @Prop({ default: "auto", type: String || Number }) height;
  @Prop({ default: false, type: Boolean }) border;
  @Prop({ default: false, type: Boolean }) stripe;
  @Prop({ default: false, type: Boolean }) loading;
  @Prop({ default: () => [], type: Array }) list;
  @Prop({ default: () => [], type: Array, required: true }) columns;
  @Prop({ default: () => ({}), type: Object }) handles;
  dialogTableVisible: Boolean = false;
  tbcolumns: any = [];

  @Watch("columns")
  reColumns(val) {
    this.tbcolumns = JSON.parse(JSON.stringify(val));
  }

  created() {
    this.tbcolumns = JSON.parse(JSON.stringify(this.columns))
  }

  handleButton(event, row) {
    this.$emit("handle", event, row);
  }
  editColumn(scope) {
    this.dialogTableVisible = true;
  }
  editOk(event) {
    this.dialogTableVisible = false;
    this.$emit("columnOk", this.tbcolumns);
  }
  editCancel() {
    this.tbcolumns = JSON.parse(JSON.stringify(this.columns));
    this.dialogTableVisible = false;
  }
}
</script>
<style lang="scss">
.edit-column-table {
  .edit-column {
    position: relative;
    .edit-action {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .edit-column-box {
    max-height: 450px;
    overflow: auto;
    border: 1px solid #dcdfe6;
    .edit-column-item {
      display: flex;
      align-content: center;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #dcdfe6;
      &:last-child {
        border-bottom: 0 none;
      }

      .dir-item {
        display: flex;
        align-content: center;
        align-items: center;
        .column-label {
          display: inline-block;
          margin-left: 10px;
          height: 35px;
          width: 75%;
          line-height: 35px;
          background: rgba(239, 239, 239, 0.3);
          padding-left: 10px;
        }
        .sign-span {
          display: inline-block;
          width: 50px;
        }
        .width-span {
          display: inline-block;
          width: 30px;
        }
        .unit-span {
          display: inline-block;
          width: 45px;
          text-align: center;
        }
        .el-input__inner {
          height: 25px;
          line-height: 25px;
          width: 80px;
        }
      }
      .left-item {
        width: 60%;
      }
      .right-item {
        width: 40%;
        justify-content: flex-end;
      }
    }
  }
}
</style>