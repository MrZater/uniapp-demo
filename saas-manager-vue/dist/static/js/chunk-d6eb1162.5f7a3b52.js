(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d6eb1162"],{"21f2":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var s=r("24e5"),o=r.n(s),a="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOfRWRy4W0URnPurEe18T+Vs9xjlyGPeb6MLfcgoTCMK46OkC3IdQ53Gt6cRFAbk/OvoJ4cQWZMd8GYSxaN4oUUCAwEAAQ==";function n(e){var t=new o.a;return t.setPublicKey(a),t.encrypt(e)}},"94c3":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-tabs",{attrs:{type:"border-card"}},[r("el-tab-pane",{attrs:{label:"修改信息"}},[r("el-card",[r("div",{staticClass:"title"},[r("h3",[e._v("登录用户信息")])]),r("el-form",{ref:"ruleForm",attrs:{"label-position":"right",model:e.loginMsgForm,rules:e.loginMsgRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"账号名称:",prop:"name"}},[r("el-input",{model:{value:e.loginMsgForm.name,callback:function(t){e.$set(e.loginMsgForm,"name",t)},expression:"loginMsgForm.name"}})],1),r("el-form-item",{attrs:{label:"注册邮箱:"}},[r("span",[e._v(e._s(e.loginMsgForm.loginId))])]),r("el-form-item",{attrs:{label:"角色:"}},[r("span",[e._v(e._s(e.loginMsgForm.role))])]),r("el-form-item",{attrs:{label:"公司名称:",prop:"company"}},[r("el-input",{model:{value:e.loginMsgForm.company,callback:function(t){e.$set(e.loginMsgForm,"company",t)},expression:"loginMsgForm.company"}})],1),r("el-form-item",{attrs:{label:"联系人:",prop:"contact"}},[r("el-input",{model:{value:e.loginMsgForm.contact,callback:function(t){e.$set(e.loginMsgForm,"contact",t)},expression:"loginMsgForm.contact"}})],1),r("el-form-item",{attrs:{label:"手机号码:",prop:"mobile"}},[r("el-input",{model:{value:e.loginMsgForm.mobile,callback:function(t){e.$set(e.loginMsgForm,"mobile",t)},expression:"loginMsgForm.mobile"}})],1),r("el-form-item",{attrs:{label:"主营应用:",prop:"mainApp"}},[r("el-input",{model:{value:e.loginMsgForm.mainApp,callback:function(t){e.$set(e.loginMsgForm,"mainApp",t)},expression:"loginMsgForm.mainApp"}})],1),r("el-form-item",{attrs:{label:"了解途径:",prop:"learnWay"}},[r("el-select",{staticStyle:{width:"80%"},attrs:{clearable:"",placeholder:"请选择了解途径"},model:{value:e.loginMsgForm.learnWay,callback:function(t){e.$set(e.loginMsgForm,"learnWay",t)},expression:"loginMsgForm.learnWay"}},[r("el-option",{attrs:{value:1,label:e.title+"官网"}}),r("el-option",{attrs:{value:2,label:e.title+"公众号"}}),r("el-option",{attrs:{value:3,label:e.title+"商务"}}),r("el-option",{attrs:{value:4,label:"朋友推荐"}}),r("el-option",{attrs:{value:5,label:"网络文章"}}),r("el-option",{attrs:{value:6,label:"其他"}})],1)],1)],1),r("el-button",{staticStyle:{"margin-left":"48%"},attrs:{type:"primary"},on:{click:e.handlEditMsg}},[e._v(" 修改 ")])],1)],1),r("el-tab-pane",{attrs:{label:"修改密码"}},[r("el-card",[r("div",{staticClass:"reset"},[r("el-form",{ref:"resetForm",staticClass:"login-form",attrs:{model:e.resetForm,rules:e.resetRules,"label-position":"right","label-width":"300px"}},[r("el-form-item",{attrs:{label:"注册邮箱:"}},[r("span",[e._v(e._s(e.resetForm.email))])]),r("el-form-item",{attrs:{label:"密码:",prop:"password"}},[r("el-input",{key:e.passwordType1,ref:"password",staticStyle:{width:"20rem"},attrs:{type:e.passwordType1,placeholder:"密码",name:"password"},model:{value:e.resetForm.password,callback:function(t){e.$set(e.resetForm,"password",t)},expression:"resetForm.password"}},[r("span",{staticClass:"svg-container",attrs:{slot:"prefix"},slot:"prefix"},[r("svg-icon",{attrs:{"icon-class":"password"}})],1),r("span",{staticClass:"show-pwd",attrs:{slot:"suffix"},on:{click:function(t){return e.showPwd(1)}},slot:"suffix"},[r("svg-icon",{attrs:{"icon-class":"password"===e.passwordType1?"eye":"eye-open"}})],1)])],1),r("el-form-item",{attrs:{label:"确认密码:",prop:"confirmPassword"}},[r("el-input",{key:e.passwordType2,ref:"confirmPassword",staticStyle:{width:"20rem"},attrs:{placeholder:"确认密码",type:e.passwordType2,name:"confirmPassword"},model:{value:e.resetForm.confirmPassword,callback:function(t){e.$set(e.resetForm,"confirmPassword",t)},expression:"resetForm.confirmPassword"}},[r("span",{staticClass:"svg-container",attrs:{slot:"prefix"},slot:"prefix"},[r("svg-icon",{attrs:{"icon-class":"password"}})],1),r("span",{staticClass:"show-pwd",attrs:{slot:"suffix"},on:{click:function(t){return e.showPwd(2)}},slot:"suffix"},[r("svg-icon",{attrs:{"icon-class":"password"===e.passwordType2?"eye":"eye-open"}})],1)])],1),r("el-form-item",{attrs:{prop:"code"}},[r("el-input",{staticStyle:{width:"10rem",display:"inline-block"},attrs:{placeholder:"请输入验证码"},model:{value:e.resetForm.code,callback:function(t){e.$set(e.resetForm,"code",t)},expression:"resetForm.code"}}),r("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.waittime,expression:"!waittime"}],staticStyle:{display:"inline-block"},attrs:{size:"medium",type:"primary ",loading:e.waittime},on:{click:e.postMsg}},[e._v(" 获取验证码 ")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:e.waittime,expression:"waittime"}],staticStyle:{display:"inline-block"},attrs:{type:"primary ",size:"medium",disabled:""}},[e._v(" "+e._s(e.count)+"s后再获取 ")])],1),r("el-form-item",{attrs:{"label-width":"380px"}},[r("el-button",{staticStyle:{"margin-bottom":"30px"},attrs:{type:"primary",loading:e.loading},nativeOn:{click:function(t){return t.preventDefault(),e.handleReset(t)}}},[e._v(" 修改 ")])],1)],1)],1)])],1)],1)],1)},o=[],a=r("1da1"),n=(r("96cf"),r("ac1f"),r("00b4"),r("b0c0"),r("e9c4"),r("b0b8")),i=r("c24f"),l=r("21f2"),c={data:function(){var e=this,t=/(?=.*[\d])/,r=/(?=.*[a-z])/,s=/(?=.*[A-Z])/,o=/(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])/,a=function(e,t,r){""===t?r(new Error("请输入验证码！")):r()},n=function(e,a,n){""===a?n(new Error("新密码不能为空！请重新输入")):a.length>16?n(new Error("密码长度不超过16个字符。")):a.length<8?n(new Error("密码不低于8位，包含大小字母、数字、特殊符号")):/^[a-zA-Z\d]{1}/.test(a)?t.test(a)&&r.test(a)&&s.test(a)&&o.test(a)?n():n(new Error("密码不低于8位，包含大小字母、数字、特殊符号!")):n(new Error("密码必须以英文大小写字母或数字开头！"))},i=function(t,r,s){0===r.length?s(new Error("请确认密码")):e.resetForm.password!==r?s(new Error("确认密码错误！")):s()};return{loginMsgForm:{name:"",loginId:"",role:"",sts:"",company:"",contact:"",mobile:"",mainApp:"",learnWay:""},loginMsgRules:{name:[{required:!0,message:"请输入账号名称",trigger:"blur"}],company:[{required:!0,message:"请输入公司名称",trigger:"blur"}],contact:[{required:!0,message:"请输入联系人",trigger:"blur"}],mobile:[{required:!0,message:"请填写手机号",trigger:"blur"},{message:"手机号无效",trigger:"blur",pattern:/^(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}$/}]},resetForm:{code:"",email:this.$store.state.user.loginId,password:"",confirmPassword:""},passwordType1:"password",passwordType2:"password",loading:!1,waittime:!1,count:60,timer:null,resetRules:{code:[{required:!0,trigger:"blur",validator:a}],password:[{required:!0,trigger:"blur",validator:n}],confirmPassword:[{required:!0,trigger:"blur",validator:i}],email:[{required:!0,message:"请填写邮箱",trigger:"blur"},{message:"邮箱无效",pattern:/^[\w\.]+@[a-z0-9]+[\.a-z]+\.[a-z]{2,3}[\.]?$/,trigger:"blur"}]}}},computed:{title:function(){return this.$store.getters.title}},mounted:function(){this.getUserMsg()},methods:{getUserMsg:function(){var e=this.$store.state.user.roles[0];"SUPER_ADMIN"===e?e="超级管理员":"ADMIN"===e?e="管理员":"OPERATOR"===e?e="运营":"VIEWER"===e?e="报表":"AUDITOR"===e?e="审核员":"BUSINESS"===e?e="商务":"MEDIA"===e?e="媒体":"BUSINESS_DIRECTOR"===e?e="商务总监":"OPERATOR_DIRECTOR"===e?e="运营总监":"TECHNOLOGY"===e?e="技术":"FINANCIAL"===e?e="财务":"MANAGEMENT"===e?e="管理层":"ADVANCED_OPERATOR"===e&&(e="高级运营"),this.loginMsgForm.loginId=this.$store.state.user.loginId,this.loginMsgForm.name=this.$store.state.user.username,this.loginMsgForm.company=this.$store.state.user.company,this.loginMsgForm.contact=this.$store.state.user.contact,this.loginMsgForm.mobile=this.$store.state.user.mobile,this.loginMsgForm.mainApp=this.$store.state.user.mainApp,this.loginMsgForm.learnWay=0==this.$store.state.user.learnWay?"":this.$store.state.user.learnWay,this.loginMsgForm.role=e},handlEditMsg:function(){var e=this;this.$refs["ruleForm"].validate(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(r){var s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return s=JSON.parse(JSON.stringify(e.loginMsgForm)),"超级管理员"===s.role?s.role=1:"管理员"===s.role?s.role=2:"运营"===s.role?s.role=3:"报表"===s.role?s.role=4:"审核员"===s.role?s.role=5:"商务"===s.role?s.role=6:"媒体"===s.role&&(s.role=7),t.next=6,Object(n["h"])(s);case 6:if(o=t.sent,200==o.code){t.next=9;break}return t.abrupt("return",e.$message.error(o.msg));case 9:return t.next=11,e.$store.dispatch("user/getInfo");case 11:e.getUserMsg(),e.$message.success("操作成功！");case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},postCodeMES:function(){},showPwd:function(e){var t=this;1===e?("password"===this.passwordType1?this.passwordType1="":this.passwordType1="password",this.$nextTick((function(){t.$refs.password.focus()}))):2===e&&("password"===this.passwordType2?this.passwordType2="":this.passwordType2="password",this.$nextTick((function(){t.$refs.confirmPassword.focus()})))},postMsg:function(){var e=this;Object(i["g"])(this.$store.state.user.loginId).then((function(t){if(200===t.code){var r=60;e.waittime=!0,e.timer=setInterval((function(){e.count>0&&e.count<=r?e.count--:(e.waittime=!1,clearInterval(e.timer),e.timer=null)}),1e3)}}))},tologin:function(){this.$emit("tologin")},handleReset:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.resetForm.password===e.resetForm.confirmPassword){t.next=3;break}return e.$message.error("确认密码不正确"),t.abrupt("return");case 3:e.$refs.resetForm.validate((function(t){if(!t)return!1;var r=Object(l["a"])(e.resetForm.password),s=Object(l["a"])(e.resetForm.confirmPassword),o=JSON.parse(JSON.stringify(e.resetForm));o.password=r,o.confirmPassword=s,Object(i["f"])(o).then((function(t){200===t.code&&(e.$message.success("修改成功！"),e.$store.dispatch("user/logout").then((function(){e.$router.push({path:"/login"})})),e.tologin())}))}));case 4:case"end":return t.stop()}}),t)})))()}}},u=c,m=(r("c94a"),r("2877")),p=Object(m["a"])(u,s,o,!1,null,"4db40223",null);t["default"]=p.exports},b0b8:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"g",(function(){return a})),r.d(t,"f",(function(){return n})),r.d(t,"c",(function(){return i})),r.d(t,"h",(function(){return l})),r.d(t,"b",(function(){return c})),r.d(t,"e",(function(){return u})),r.d(t,"d",(function(){return m}));var s=r("b775");function o(e){return Object(s["a"])({url:"/user/subAccountPager",method:"post",data:e})}function a(e){return Object(s["a"])({url:"/user/updateSubAccount",method:"post",data:e})}function n(e){return Object(s["a"])({url:"/user/bindPlat",method:"post",data:e})}function i(e){return Object(s["a"])({url:"/user/".concat(e.id),method:"Delete"})}function l(e){return Object(s["a"])({url:"/user/updateAccountInfo",method:"post",data:e})}function c(e){return Object(s["a"])({url:"/user/addSubAccount",method:"post",data:e})}function u(){return Object(s["a"])({url:"/user/businessUserList",method:"get"})}function m(e){return Object(s["a"])({url:"/user/filterAccount",method:"post",data:e})}},c94a:function(e,t,r){"use strict";r("f351")},f351:function(e,t,r){}}]);