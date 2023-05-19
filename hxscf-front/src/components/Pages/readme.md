<!--
 * @Author: zhiqiang.qiao
 * @Date: 2020-05-25 11:38:33
 * @lastEditors: mingliang.zhu
 * @lastEditTime: Do not edit
 * @description: 
--> 
# 组件介绍

对 element-ui/el-pagination 组件进行二次封装

# 参数介绍

```javascript
/**
 * @param {string} flag - 分页器的唯一标识，当一个页面有多个表格需要分页时，可用来做传参
 * @param {number} pageNum - 当前页码 默认值1
 * @param {number} pageSize - 每页显示条数 默认值10
 * @param {number} total - 总数据条数 默认值0
 * @param {array} pageSizeList - 每页显示个数选择器的选项设置 - 默认 [10, 20, 30, 50, 100]
 * @param {boolean} isShowSizeList - 是否显示每页显示个数选择器 - 默认显示
 * @param {boolean} hideOnSinglePage - 当前数据只有一页是否隐藏分页组件 默认否
 * @param {boolean} isHaveBackground - 是否为分页按钮添加背景色 默认否
 * @param {boolean} disabled - 是否禁用分页 默认否
 * @param {string} prevText - 替代图标显示的上一页文字 默认为空 显示 <
 * @param {string} nextText - 替代图标显示的下一页文字 默认为空 显示 >
 */
```

# 使用方式

1. 引入
   import { Pages } from "@/components";

2. 注册
   @Component({
    components: {
        Pages
    }
   })

3. 模板调用

```html
<Pages 
    :pageNum="list.pageNum"
    :pageSize="list.pageSize"
    :total="list.total"
    @changePage="changePageFn"
    prevText="上一页"
    nextText="下一页"
/>
```

