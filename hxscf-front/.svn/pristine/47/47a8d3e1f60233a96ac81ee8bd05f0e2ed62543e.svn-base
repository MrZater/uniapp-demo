<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-06-19 15:19:15
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-06-24 18:13:04
--> 
# 组件介绍

对 element-ui/el-Select 组件进行二次封装

# 参数介绍

```javascript
/**
 * @param {Array} selectData -- 下拉数据
 * @param {string} OptionKey -- option的key
 * @param {string} label -- option的label
 * @param {string} placeholder - select提示
 * @param {boolean} isShowAll - 是否显示全部
 * @param {boolean} getLabel - 是否返回label / 默认只返回value
 * @param {boolean} multiple-- 是否多选
 * @param {number} multipleLimit-- 多选个数
 * @param {boolean} disabled - 是否禁用
 * @param {boolean} isGroup - 是否分组
 * @param {string} returnType - 多选时返回数据的格式
 * @param {function} change  --获取返回值
 * @param {boolean} popperAppendToBody -- select自身是否插入至body元素上,嵌套的Dialog必须设置为true
 */
```

# 使用方式

1. 引入
   import { BSelect } from "@/components";

2. 注册
   @Component({
      components: {
         BSelect
      }
   })

3. 模板调用

```html
<el-form label-position="right" label-width="150px" v-model='formData'>
   <el-row>
      <el-col :span='12'>
         <!-- selectData：下拉框数据 OptionKey: option下key值 label: option下label值  value: 绑定的返回值-->
         <el-form-item label='普通select'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' placeholder='请选择客群类型'></Bselect>
         </el-form-item>
      </el-col>
      <el-col :span='12'>
         <el-form-item label='不展示全部'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :isShowAll='false' ></Bselect>
         </el-form-item>
      </el-col>
   </el-row>
   <el-row>
      <el-col :span='12'>
         <el-form-item label='获取value&label'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :getLabel='true' @change='change'></Bselect>
         </el-form-item>
      </el-col>
      <el-col :span='12'>
         <el-form-item label='有icon的select'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :isShowAll='false'>
            <template slot="prefix"><i class='el-icon-edit'></i></template>
            </Bselect>
         </el-form-item>
      </el-col>
   </el-row>
   <el-row>
      <el-col :span='12'>
         <el-form-item label='有禁选select'>
            <Bselect :selectData='guestGroupDisable' OptionKey='dictName' label='desc'></Bselect>
         </el-form-item>
      </el-col>
      <el-col :span='12'>
         <el-form-item label='禁用状态'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :disabled='true'></Bselect>
         </el-form-item>
      </el-col>
   </el-row>
   <el-row>
      <el-col :span='12'>
         <el-form-item label='分组'>
            <Bselect :selectData='options' OptionKey='dictName' label='desc' :isGroup='true'></Bselect>
         </el-form-item>
      </el-col>
      <el-col :span='12'>
         <el-form-item label='多选(限制长度)'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :isShowAll='false' :multiple='multiple' :multipleLimit='2'></Bselect>
         </el-form-item>
      </el-col>
   </el-row>
   <el-row>
      <el-col :span='12'>
         <el-form-item label='多选(数组)'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :isShowAll='false' :multiple='multiple' @change='change' returnType='array'></Bselect>
         </el-form-item>
      </el-col>
      <el-col :span='12'>
         <el-form-item label='多选(字符串)'>
            <Bselect :selectData='guestGroup' OptionKey='dictName' label='desc' :isShowAll='false' :multiple='multiple' @change='change' returnType=','></Bselect>
         </el-form-item>
      </el-col>
   </el-row>
</el-form>
```

4. Slot
   name：prefix
   说明：Select 带有icon <template slot="prefix"></template>
