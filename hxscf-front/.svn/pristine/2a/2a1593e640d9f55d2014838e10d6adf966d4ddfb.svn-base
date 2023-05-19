# 组件介绍

对 element-ui/el-dialog 组件进行二次封装

# 参数介绍

```javascript
/**
 * @param {string} title - Dialog的标题
 * @param {boolean} visible - 是否显示Dialog
 * @param {string} width - Dialog的宽度
 * @param {boolean} show-close - 是否显示关闭按钮
 * @param {boolean} append-to-body - Dialog自身是否插入至body元素上,嵌套的Dialog必须设置为true
 * @param {function} close - Dialog关闭的回调
 * @param {null} v-dialogDrag - 拖拽
 * @param {null} v-dialogDragWidth - 拖拽+缩放+双击标题全屏
 */
```

# 使用方式

1. 引入
   import { BDialog } from "@/components";

2. 注册
   @Component({
   components: {
   BDialog
   }
   })

3. 模板调用

```html
<B-dialog
  :title="dialogType=='add'?'新增':'编辑'"
  :visible="dialogVisible"
  width="460px"
  @close="handleCancel"
  v-dialogDrag
>
  <div>弹窗内容</div>

  <template slot="footer">
    <el-button
      type="primary"
      class="br-btn-large"
      @click="handleSubmit"
      :loading="btnloading"
      >保存</el-button
    >
    <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
  </template>
</B-dialog>
```

4. Slot
   name：footer
   说明：Dialog 按钮操作区的内容 <template slot="footer"></template>
