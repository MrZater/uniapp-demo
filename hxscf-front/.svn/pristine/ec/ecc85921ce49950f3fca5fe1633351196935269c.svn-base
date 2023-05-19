# 组件介绍

对 element-ui/el-table 组件进行二次封装

# 参数介绍

```javascript
/**
 * @param {boolean} checkBox - 是否允许选择多行数据 默认false
 * @param {boolean} index - 是否显示序号 默认false
 * @param {string || number} height - table的高度 默认auto
 * @param {boolean} border - 是否显示边框 默认false
 * @param {boolean} loading - 是否显示loading 默认false
 * @param {array} list - table的数据
 * @param {array} columns - table的表头
 * @param {object} handles - table的方法
 */
```

# 使用方式

1. 引入
   import BTable from './BTable.vue';

2. 注册
   @Component({
   components: {
   BTable
   }
   })

3. 模板调用

```html
<b-table
  :list="list"
  :columns="columns"
  :handles="handles"
  index
  checkBox
  @handle="onHandle"
  border
></b-table>
```

```js
import { Vue, Component, Prop } from "vue-property-decorator";
import BTable from "./BTable.vue";
@Component({
  components: { BTable },
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
      zip: 200333,
    },
    {
      date: 1591184295251,
      name: "王小虎",
      sex: "2",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333,
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      sex: "1",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333,
    },
    {
      date: 1590481291251,
      name: "王小虎",
      sex: "0",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄,上海市普陀区金沙江路 1518 弄",
      zip: 200333,
    },
  ];
  columns: any[] = [
    {
      label: "日期",
      prop: "date",
      sortable: true,
      render: (row) => {
        return this.$moment(row.date).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    { label: "姓名", prop: "name" },
    {
      label: "性别",
      prop: "sex",
      render: (row) => {
        if (row.sex == 1) {
          return "男";
        } else if (row.sex == 2) {
          return "女";
        } else {
          return "未知";
        }
      },
    },
    { label: "省份", prop: "province", sortable: true },
    { label: "市区", prop: "city" },
    { label: "地址", prop: "address", tip: true },
    { label: "邮编", prop: "zip" },
  ];
  handles: object = {
    label: "操作",
    width: "300",
    options: [
      {
        label: "编辑",
        type: "primary",
        icon: "el-icon-edit",
        methods: "edit",
      },
      {
        label: "预览",
        type: "primary",
        icon: "el-icon-view",
        methods: "preview",
      },
      {
        label: "删除",
        type: "danger",
        icon: "el-icon-delete",
        methods: "delete",
      },
    ],
  };
  onHandle(event, row) {
    console.log(event, row);
  }
}
```
