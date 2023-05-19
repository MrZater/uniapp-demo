本文档主要记录需要讨论的问题

权限拦截 1. 前端如何做资源拦截，即用户通过地址栏访问菜单，如果不在权限内如果处理
全局 loading 1. 讨论全局 loading 如何做

跨域代理

    1.讨论是否加进去。个人建议加进去

打包 1. 增加版本号，清除服务器缓存 2. 增加打包文件夹名称修改 3. 增加打包文件自动生成压缩包，默认.zip 4. 清空打包文件夹内容再打包

全局变量配置
讨论全局变量是否有必填提出到公用配置页面 1. 成功响应码 2. 接口请求超时时间 3. logo 地址 4. 公司名称 5. 浏览器图标地址 6. 浏览器 title 7. 登录失效码值 8. 技术支持

menu 菜单处理、角色授权(提取公用方法，建议后端返回格式固定)

### 2020-08-12 min.liu
此次修改内容如下：
- 增加store自动引入modules
- 增加自动生成列表模块，需要执行npx plop generator
- 将登录、登录后左侧标题提取到配置文件种配置
- 增加打包时自动部署到服务器
<!--
 * @Author: min.liu
 * @Date: 2020-04-28 13:36:00
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-06-01 10:07:34
 * @Description:
 -->

# 百融云创-平台创新部前端基础框架

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 2020-04-28

```
增加基础配置，参考根目录下的baseConfig.js;
--打包时包名称可从baseConfig定义,默认basicProject,打包后自动生成Zip包;
--将请求响应码值、登录失效码值提取公共变量;
```
<!--
 * @Author: weiwei.xue
 * @Date: 2020-05-21 13:36:00
 -->
### 详情组件封装 参考配置  @/components/ViewContent/index.vue
###  示例 views/commponents/detail-demo.vue

props:
    属性          说明                                        类型          默认值  
    data:       表单数据对象                                    Object         空
    labels:	    表单配置项。对象数组，具体配置见labels配置。      Array          []
    showColumn:	展示列数( 1: 1列; 2: 2列; 3: 3列 )              Number         1

labels配置:
    属性	       说明	                                                                                   类型

    column	    对应表单域 data 里的字段	                                                                 string
    label	    标签文本	                                                                                string
    type	    文本类型,默认为text                                                                          string
                可选值： date(日期),  format("YYYY-MM-DD")
                        time(时间)   format("YYYY-MM-DD HH:mm:ss")
                        money(金额)  eg: 21,235.56
                        option( 将码值转为文本的下拉框，搭配options使用), 
                        custom(type==custom,自定义展示，搭配transform函数) 
                        alreadyData(用于将返回的码值转为汉字，数据为已经存在的数据，
                       格式 {type: 'alreadyData',alreadyType: '已存在的数据名称'})                                                                                   
    options	    type为option时，用于转换的json格式，格式{label,value，label,value}                           object
    long	    true值表明该项占满全行	                                                                    boolean
    transform	type为custom时，可通过函数配置返回值。函数参数为表单数据对象(data).	                 function (model)=>{}
    render	    可自定义render内容	                                             function (data)=>{ return `<a></a>`}
    labelWidth	加长label宽度到10个字。默认6个字	                                                        boolean


