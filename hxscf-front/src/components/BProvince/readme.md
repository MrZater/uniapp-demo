<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-06-22 16:50:36
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-06-23 11:54:57
--> 
### 组件介绍

对element-ui的省市区级联选择进行封装 

#### 主要封装项

  进行省市区级联封装, 根据后端要求不同返回地址不同格式

#### 参数介绍

``` javascript
/**
 * @param {string} returnType - 当returnType: 地址返回类型  若为array 将返回 省市区数组 ; 为string 返回地址字符串 
```

#### 组件内部设置属性


#### 使用方式

1. 引入

import Bprovince from "@/components/BProvince/index.vue";

2. 注册

    @Component({
        components: {
            'Area-form-item':Bprovince
        }
    })

3. 模板调用

``` html
    <el-form label-position="right" label-width="150px" >
        <!-- returnType: 地址返回类型  若为array 将返回 省市区数组 ; 为string 返回地址字符串 -->
        <el-form-item label='地址(数组)：'>
            <Area-form-item returnType='array' @getAddress='getAddressArray'></Area-form-item>
        </el-form-item>
        <el-form-item label='地址(字符串)：'>
            <Area-form-item returnType='string' @getAddress='getAddressString'></Area-form-item>
        </el-form-item>
    </el-form>
```
