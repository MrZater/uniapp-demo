(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bad4f3b2"],{"244d":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"d",(function(){return i})),r.d(t,"a",(function(){return o})),r.d(t,"e",(function(){return u})),r.d(t,"c",(function(){return s}));var a=r("b775");function n(){return Object(a["a"])({url:"/place/list",methods:"get"})}function i(e){return Object(a["a"])({url:"/place/pager",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/place/add",method:"post",data:e})}function u(e){return Object(a["a"])({url:"/place/update",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/place/listByAppId",method:"post",data:e})}},"4ba8":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"edit-rules-container"},[r("div",{staticClass:"goback"},[r("span",{staticClass:"goback",on:{click:e.goback}},[r("i",{staticClass:"el-icon-back"},[e._v("返回")])])]),r("div",{staticClass:"title"},[r("span",[e._v(e._s(e.isAdd?"添加":"编辑")+"预警规则")])]),r("div",{staticClass:"form"},[r("el-form",{ref:"form",attrs:{model:e.row,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"预警名称",prop:"name"}},[r("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写预警名称","max-length":20},model:{value:e.row.name,callback:function(t){e.$set(e.row,"name",t)},expression:"row.name"}})],1),r("el-form-item",{attrs:{label:"预警对象",prop:"target"}},[r("el-select",{attrs:{placeholder:"请选择预警对象"},on:{change:e.handleSelectTarget},model:{value:e.row.target,callback:function(t){e.$set(e.row,"target",t)},expression:"row.target"}},[r("el-option",{attrs:{label:"应用",value:"1"}}),r("el-option",{attrs:{label:"广告位",value:"2"}})],1)],1),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.row.target,expression:"row.target"}],attrs:{rules:{required:e.row.target,message:"请选择应用",trigger:"change"},label:"应用",prop:"appIdList"}},[r("CustSelectApp",{staticStyle:{width:"200px"},attrs:{word:"应用",width:450,model:e.row.appIdList,"all-data":e.appList,"search-by-id":""},on:{selectListhandle:e.selectListhandleApp}})],1),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:2==e.row.target&&e.row.appIdList.length>0,expression:"row.target == 2 && row.appIdList.length > 0"}],attrs:{label:"广告位",prop:"placeIdList",rules:{required:2==e.row.target,message:"请选择广告位",trigger:"change"}}},[r("CustSelectApp",{staticStyle:{width:"200px"},attrs:{word:"广告位",width:450,model:e.row.placeIdList,"all-data":e.placeList,"search-by-id":""},on:{selectListhandle:e.selectListhandlePlace}})],1),r("el-form-item",{attrs:{label:"预警频率",prop:"frequency"}},[r("el-radio-group",{on:{change:e.changeFrequency},model:{value:e.row.frequency,callback:function(t){e.$set(e.row,"frequency",t)},expression:"row.frequency"}},[r("el-radio",{attrs:{label:1}},[e._v(" 天级 ")]),r("el-radio",{attrs:{label:2}},[e._v(" 小时级 ")])],1)],1),r("el-form-item",{attrs:{"label-width":"200px",label:"预警条件（已添加"+e.ruleLen+"/5条）"}}),r("el-form-item",{attrs:{label:"",prop:"triggerCondition"}},[r("el-radio-group",{model:{value:e.row.triggerCondition,callback:function(t){e.$set(e.row,"triggerCondition",t)},expression:"row.triggerCondition"}},[r("el-radio",{attrs:{label:0}},[e._v(" 满足以下所有条件时触发 ")]),r("el-radio",{attrs:{label:1}},[e._v(" 满足以下任一条件时触发 ")])],1)],1),r("div",{staticClass:"rulesbox"},[e.ruleLen>1?r("div",{staticClass:"line"},[r("span",[e._v(e._s(0==e.row.triggerCondition?"且":"或"))])]):e._e(),e._l(e.row.earlyWarningRuleList,(function(t,a){return[r("div",{key:a,staticClass:"rulesItem"},[r("el-form-item",{attrs:{label:"",prop:"earlyWarningRuleList["+a+"].ruleId",rules:{required:!0,message:"请选择数据指标",trigger:"change"}}},[r("span",[r("el-tag",{staticStyle:{"margin-right":"15px"},attrs:{size:"medium",type:"info",effect:"plain"}},[e._v(" "+e._s(1==e.row.frequency?"昨天":"今天")+" ")])],1),r("el-select",{attrs:{size:"small",placeholder:"请选择数据指标"},model:{value:t.ruleId,callback:function(r){e.$set(t,"ruleId",r)},expression:"item.ruleId"}},[1==e.row.frequency&&1==e.row.target?r("el-option",{attrs:{label:"DAU",value:1}}):e._e(),1==e.row.frequency&&1==e.row.target?r("el-option",{attrs:{label:"ARPDAU",value:2}}):e._e(),r("el-option",{attrs:{label:"流量请求",value:3}}),r("el-option",{attrs:{label:"流量填充率",value:4}}),r("el-option",{attrs:{label:"展示",value:5}}),r("el-option",{attrs:{label:"预估收益",value:6}}),r("el-option",{attrs:{label:"展示率",value:7}}),2==e.row.target?r("el-option",{attrs:{label:"预估eCPM",value:8}}):e._e()],1)],1),r("el-form-item",{attrs:{label:"",prop:"earlyWarningRuleList["+a+"].ruleType","label-width":"20px"}},[r("el-select",{staticStyle:{width:"80px"},attrs:{size:"small",placeholder:"请选择规则类型"},model:{value:t.ruleType,callback:function(r){e.$set(t,"ruleType",r)},expression:"item.ruleType"}},[r("el-option",{attrs:{label:"≤",value:0}}),r("el-option",{attrs:{label:"≥",value:1}})],1)],1),r("el-form-item",{attrs:{label:"",prop:"earlyWarningRuleList["+a+"].dateType","label-width":"20px"}},[r("el-select",{staticStyle:{width:"100px"},attrs:{size:"small",placeholder:""},model:{value:t.dateType,callback:function(r){e.$set(t,"dateType",r)},expression:"item.dateType"}},[1==e.row.frequency?r("el-option",{attrs:{label:"前一天",value:0}}):e._e(),2==e.row.frequency?r("el-option",{attrs:{label:"昨天",value:1}}):e._e()],1)],1),r("el-form-item",{attrs:{label:"",prop:"earlyWarningRuleList["+a+"].value","label-width":"20px",rules:{required:!0,message:"请选择数据指标",trigger:"blur"}}},[r("el-input",{staticStyle:{width:"190px"},attrs:{placeholder:"最多支持输入两位小数 "},nativeOn:{keydown:function(t){return e.handleInputValue(t)}},model:{value:t.value,callback:function(r){e.$set(t,"value",r)},expression:"item.value"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("%")])])],1),1!=e.ruleLen?r("span",{staticClass:"deleteItem",on:{click:function(t){return e.delectItem(a)}}},[r("i",{staticClass:"el-icon-delete"})]):e._e()],1)]}))],2),e.ruleLen<5?r("div",{staticClass:"addRuleItem"},[r("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:e.handleAddItem}},[e._v(" 添加条件 ")])],1):e._e(),r("el-form-item",{attrs:{label:"预警通知"}},[1==e.row.frequency?r("span",[e._v('预警频率：预估"每天八点之前"发出预警')]):e._e(),2==e.row.frequency?r("span",[e._v("预警频率：“每一小时” 对比预警一次")]):e._e()]),r("el-form-item",{attrs:{label:"预警通知方式",prop:"noticeType"}},[r("el-radio-group",{model:{value:e.row.noticeType,callback:function(t){e.$set(e.row,"noticeType",t)},expression:"row.noticeType"}},[r("el-radio",{attrs:{label:1}},[e._v(" 站内信 ")]),r("el-radio",{attrs:{label:2}},[e._v(" 邮箱 ")]),r("el-radio",{attrs:{label:3}},[e._v(" 站内信+邮箱 ")])],1)],1),1==e.row.noticeType||3==e.row.noticeType?r("el-form-item",{attrs:{label:"站内信",prop:"userIdList"}},[r("el-select",{attrs:{multiple:"",placeholder:"请选择站内信","collapse-tags":""},model:{value:e.row.userIdList,callback:function(t){e.$set(e.row,"userIdList",t)},expression:"row.userIdList"}},e._l(e.subList,(function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:""+e.id}})})),1)],1):e._e(),2==e.row.noticeType||3==e.row.noticeType?r("el-form-item",{attrs:{label:"邮箱",prop:"emailstext"}},[r("el-input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:6,maxRows:6},resize:"none",placeholder:"多个邮箱请以英文逗号隔开"},model:{value:e.row.emailstext,callback:function(t){e.$set(e.row,"emailstext",t)},expression:"row.emailstext"}})],1):e._e()],1),r("div",{staticClass:"btn"},[r("el-button",{attrs:{type:""},on:{click:e.handleClear}},[e._v(" 重置 ")]),r("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmilt}},[e._v(" 确定 ")])],1)],1)])},n=[],i=r("1da1"),o=(r("96cf"),r("a15b"),r("d81d"),r("d3b7"),r("159b"),r("ac1f"),r("466d"),r("a434"),r("1276"),r("59c5")),u=r("b562"),s=r("244d"),l=r("ed5f"),c=r("c37d"),d={name:"EditRules",components:{CustSelectApp:o["a"]},data:function(){return{row:{},rules:{name:[{required:!0,message:"请输入预警名称",trigger:"blur"}],target:[{required:!0,message:"请选择预警对象",trigger:"change"}],appIdList:[{required:!0,message:"请选择应用",trigger:"change"}],frequency:[{required:!0,message:"请选择预警频率",trigger:"change"}],userIdList:[{required:!0,message:"请选择站内信",trigger:"change"}],emailstext:[{required:!0,message:"请输入邮箱",trigger:"blur"}]},appList:[],placeList:[],subList:[],isCreated:0}},computed:{isAdd:function(){return this.$route.params.isAdd},ruleLen:function(){return this.row.earlyWarningRuleList.length}},created:function(){this.row=this.$route.params,this.$set(this.row,"emailstext",""),this.row.emailList?this.row.emailstext=this.row.emailList.join(","):this.$set(this.row,"emailList",[]),this.query=this.$route.params?this.$route.params.query:{}},mounted:function(){var e=this,t=this.$route.params,r=t.appIdList,a=t.placeIdList;setTimeout((function(){e.row.appIdList=r,e.row.placeIdList=a}),500),this.getAppList(),this.getPlaceList(),this.getSubList()},methods:{goback:function(){this.$router.push({path:"warningReport",name:"warningReport",params:{query:this.query}})},getAppList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["c"])();case 2:r=t.sent,e.appList=r.data?r.data:[];case 4:case"end":return t.stop()}}),t)})))()},selectListhandleApp:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.row.appIdList=e,t.isCreated++,1!=t.row.target){r.next=4;break}return r.abrupt("return");case 4:if(!(t.isCreated<=2)){r.next=6;break}return r.abrupt("return");case 6:if(!(e.length>0)){r.next=14;break}return r.next=9,Object(c["e"])(e);case 9:a=r.sent,t.placeList=a.data?a.data:[],setTimeout((function(){t.row.placeIdList=t.placeList.map((function(e){return e.id}))}),0),r.next=15;break;case 14:t.getPlaceList();case 15:case"end":return r.stop()}}),r)})))()},getPlaceList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["b"])();case 2:r=t.sent,e.placeList=r.data?r.data:[];case 4:case"end":return t.stop()}}),t)})))()},selectListhandlePlace:function(e){this.row.placeIdList=e},handleSelectTarget:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(2!=e){r.next=7;break}return t.row.placeIdList=[],r.next=4,Object(c["e"])(t.row.appIdList);case 4:a=r.sent,t.placeList=a.data?a.data:[],setTimeout((function(){t.row.placeIdList=t.placeList.map((function(e){return e.id}))}),0);case 7:t.row.earlyWarningRuleList.forEach((function(e){e.ruleId=""}));case 8:case"end":return r.stop()}}),r)})))()},handleInputValue:function(e){e.target.value=e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]||null},delectItem:function(e){this.row.earlyWarningRuleList.splice(e,1)},handleAddItem:function(){5!=this.ruleLen&&this.row.earlyWarningRuleList.push({ruleId:"",ruleType:this.row.earlyWarningRuleList[0].ruleType,dateType:this.row.earlyWarningRuleList[0].dateType,value:""})},changeFrequency:function(e){this.row.earlyWarningRuleList.forEach((function(t){t.ruleId="",t.dateType=1==e?0:1}))},getSubList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["c"])();case 2:r=t.sent,e.subList=r.data?r.data:[];case 4:case"end":return t.stop()}}),t)})))()},handleSubmilt:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs["form"].validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=13;break}if(e.row.emailList=e.row.emailstext.split(","),!e.isAdd){t.next=9;break}return t.next=5,Object(l["a"])(e.row);case 5:a=t.sent,200==a.code&&(e.$message.success("添加成功！"),e.goback()),t.next=13;break;case 9:return t.next=11,Object(l["g"])(e.row);case 11:n=t.sent,200==n.code&&(e.$message.success("修改成功！"),e.goback());case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},handleClear:function(){this.row={name:"",target:"",appIdList:[],placeIdList:[],frequency:1,triggerCondition:0,earlyWarningRuleList:[{ruleId:"",ruleType:1,dateType:"",value:""}],noticeType:1,userIdList:[],emailList:[],query:this.row.query,isAdd:this.row.isAdd}}}},p=d,f=(r("f958"),r("2877")),g=Object(f["a"])(p,a,n,!1,null,"68742a7e",null);t["default"]=g.exports},"95fb":function(e,t,r){},a434:function(e,t,r){"use strict";var a=r("23e7"),n=r("23cb"),i=r("a691"),o=r("50c4"),u=r("7b0b"),s=r("65f0"),l=r("8418"),c=r("1dde"),d=r("ae40"),p=c("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,m=Math.min,h=9007199254740991,b="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!p||!f},{splice:function(e,t){var r,a,c,d,p,f,w=u(this),y=o(w.length),v=n(e,y),L=arguments.length;if(0===L?r=a=0:1===L?(r=0,a=y-v):(r=L-2,a=m(g(i(t),0),y-v)),y+r-a>h)throw TypeError(b);for(c=s(w,a),d=0;d<a;d++)p=v+d,p in w&&l(c,d,w[p]);if(c.length=a,r<a){for(d=v;d<y-a;d++)p=d+a,f=d+r,p in w?w[f]=w[p]:delete w[f];for(d=y;d>y-a+r;d--)delete w[d-1]}else if(r>a)for(d=y-a;d>v;d--)p=d+a-1,f=d+r-1,p in w?w[f]=w[p]:delete w[f];for(d=0;d<r;d++)w[d+v]=arguments[d+2];return w.length=y-a+r,c}})},b562:function(e,t,r){"use strict";r.d(t,"c",(function(){return n})),r.d(t,"e",(function(){return i})),r.d(t,"f",(function(){return o})),r.d(t,"a",(function(){return u})),r.d(t,"k",(function(){return s})),r.d(t,"j",(function(){return l})),r.d(t,"b",(function(){return c})),r.d(t,"d",(function(){return d})),r.d(t,"i",(function(){return p})),r.d(t,"h",(function(){return f})),r.d(t,"g",(function(){return g}));var a=r("b775");function n(){return Object(a["a"])({url:"/app/list",method:"get"})}function i(e){return Object(a["a"])({url:"/app/getAppListByRole",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/app/pager",method:"post",data:e})}function u(e){return Object(a["a"])({url:"/app/add",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/app/update",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/aggregate/platformList/"+e,method:"post"})}function c(e){return Object(a["a"])({url:"/dashboard/getAdminAndAppListByBusinessId",method:"post",data:e})}function d(e){return Object(a["a"])({url:"/dashboard/getAppListByAdminId",method:"post",data:e})}function p(){return Object(a["a"])({url:"/user/adminList",method:"get"})}function f(){return Object(a["a"])({url:"/app/getMediaAppList",method:"get"})}function g(e){return Object(a["a"])({url:"/app/getApplistByUserIdAndOs",method:"post",data:e})}},c37d:function(e,t,r){"use strict";r.d(t,"l",(function(){return n})),r.d(t,"b",(function(){return i})),r.d(t,"r",(function(){return o})),r.d(t,"i",(function(){return u})),r.d(t,"j",(function(){return s})),r.d(t,"h",(function(){return l})),r.d(t,"g",(function(){return c})),r.d(t,"e",(function(){return d})),r.d(t,"f",(function(){return p})),r.d(t,"c",(function(){return f})),r.d(t,"d",(function(){return g})),r.d(t,"t",(function(){return m})),r.d(t,"u",(function(){return h})),r.d(t,"n",(function(){return b})),r.d(t,"o",(function(){return w})),r.d(t,"p",(function(){return y})),r.d(t,"a",(function(){return v})),r.d(t,"q",(function(){return L})),r.d(t,"k",(function(){return x})),r.d(t,"s",(function(){return O})),r.d(t,"m",(function(){return j}));var a=r("b775");function n(e){return Object(a["a"])({url:"/report/fullReport",method:"post",data:e})}function i(){return Object(a["a"])({url:"/plat/platList",method:"get"})}function o(e){return Object(a["a"])({url:"/plat/platListByUser",method:"post",data:e})}function u(){return Object(a["a"])({url:"/aggregate/groupList",method:"get"})}function s(){return Object(a["a"])({url:"/app/channelList",method:"get"})}function l(){return Object(a["a"])({url:"/aggregate/sourceList",method:"get"})}function c(e){return Object(a["a"])({url:"/aggregate/groupListByApp",method:"post",data:e})}function d(e){return Object(a["a"])({url:"/place/listByAppIds",method:"post",data:e})}function p(e){return Object(a["a"])({url:"aggregate/sourceListByApp",method:"post",data:e})}function f(e){return Object(a["a"])({url:"/aggregate/sourceListByAdplace",method:"post",data:e})}function g(e){return Object(a["a"])({url:"aggregate/groupListByAdplace",method:"post",data:e})}function m(e){return Object(a["a"])({url:"/userBehavior/report",method:"post",data:e})}function h(e){return Object(a["a"])({url:"/userBehavior/trend",method:"post",data:e})}function b(e){return Object(a["a"])({url:"/report/hourTrend",method:"post",data:e})}function w(e){return Object(a["a"])({url:"/report/hourReport",method:"post",data:e})}function y(e){return Object(a["a"])({url:"/report/upload",method:"post",data:e})}function v(e){return Object(a["a"])({url:"/report/record",method:"post",data:e})}function L(e){return Object(a["a"])({url:"/app/tradeList",method:"get",data:e})}function x(e){return Object(a["a"])({url:"/report/getMediaReport",method:"post",data:e})}function O(e){return Object(a["a"])({url:"/place/updateMediaReportInfo",method:"post",data:e})}function j(e){return Object(a["a"])({url:"/report/chart",method:"post",data:e})}},e9c4:function(e,t,r){var a=r("23e7"),n=r("d066"),i=r("d039"),o=n("JSON","stringify"),u=/[\uD800-\uDFFF]/g,s=/^[\uD800-\uDBFF]$/,l=/^[\uDC00-\uDFFF]$/,c=function(e,t,r){var a=r.charAt(t-1),n=r.charAt(t+1);return s.test(e)&&!l.test(n)||l.test(e)&&!s.test(a)?"\\u"+e.charCodeAt(0).toString(16):e},d=i((function(){return'"\\udf06\\ud834"'!==o("\udf06\ud834")||'"\\udead"'!==o("\udead")}));o&&a({target:"JSON",stat:!0,forced:d},{stringify:function(e,t,r){var a=o.apply(null,arguments);return"string"==typeof a?a.replace(u,c):a}})},ed5f:function(e,t,r){"use strict";r.d(t,"e",(function(){return n})),r.d(t,"g",(function(){return i})),r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return u})),r.d(t,"b",(function(){return s})),r.d(t,"d",(function(){return l})),r.d(t,"f",(function(){return c}));var a=r("b775");function n(e){return Object(a["a"])({url:"/earlyWarning/getWarningPage",method:"post",data:e})}function i(e){return Object(a["a"])({url:"/earlyWarning/updateWarning",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/earlyWarning/addWarning",method:"post",data:e})}function u(){return Object(a["a"])({url:"/user/getSubList",method:"get"})}function s(e){return Object(a["a"])({url:"/earlyWarning/deleteWarning",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/earlyWarning/getWarningByUser",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/earlyWarning/getWarningReportPage",method:"post",data:e})}},f958:function(e,t,r){"use strict";r("95fb")}}]);