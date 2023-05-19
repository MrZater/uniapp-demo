<template>
  <b-table :list="list" :columns="columns" :handles="handles" index checkBox @handle="onHandle" border></b-table>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { BTable } from "@/components";
@Component({
  components: { BTable }
})
export default class index extends Vue {
  list: any[] = [
    {
      date: 1590414295251,
      name: "王小虎",
      sex: "1",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: 1591184295251,
      name: "王小虎",
      sex: "2",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      sex: "1",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: 1590481291251,
      name: "王小虎",
      sex: "0",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333
    }
  ];
  columns: any[] = [
    {
      label: "日期",
      prop: "date",
      // sortable: true,
      render: row => {
        return this.$moment(row.date).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    { label: "姓名", prop: "name" },
    {
      label: "性别",
      prop: "sex",
      render: row => {
        if (row.sex == 1) {
          return "男";
        } else if (row.sex == 2) {
          return "女";
        } else {
          return "未知";
        }
      }
    },
    { label: "省份", prop: "province" },
    { label: "市区", prop: "city" },
    { label: "地址", prop: "address", tip: true },
    { label: "邮编", prop: "zip" }
  ];
  handles: object = {
    label: "操作",
    width: "300",
    options: [
      {
        label: "编辑",
        type: "primary",
        icon: "el-icon-edit",
        methods: "edit"
      },
      {
        label: "预览",
        type: "info",
        icon: "el-icon-view",
        methods: "preview"
      },
      {
        label: "删除",
        type: "danger",
        icon: "el-icon-delete",
        methods: "delete"
      }
    ]
  };
  onHandle(event, row) {
    console.log(event, row);
  }
}
</script>