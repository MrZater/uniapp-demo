(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-649f7612"],{3620:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return i})),a.d(t,"c",(function(){return l}));var n=a("ade3"),r=(a("d3b7"),a("159b"),{tooltip:{trigger:"axis",formatter:function(e){var t="";return e.forEach((function(e,a){var n={};"收益"==e.seriesName||"eCPM"==e.seriesName||"预估收益"==e.seriesName||"ARPDAU"==e.seriesName?n.value="￥"+e.value:"渗透率"==e.seriesName?n.value=e.value+"%":n.value=e.value,t+=e.marker+e.seriesName+": "+n.value+"<br>"})),e[0].axisValue+"<br>"+t}},legend:{data:[]},grid:{top:"2%",left:"0%",right:"2%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:[],axisLine:{lineStyle:{color:"#000",width:.5}}},yAxis:[Object(n["a"])({type:"value",axisLabel:{formatter:"￥{value}"},position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1}},"axisLabel",{show:!1}),{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}},{type:"value",position:"",axisLine:{lineStyle:{color:"#666",width:.5}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!1}}],series:[{name:"",type:"line",smooth:!0,yAxisIndex:0,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#0055ff",lineStyle:{color:"#0055ff",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:1,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#ffab31",lineStyle:{color:"#ffab31",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:2,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#39da61",lineStyle:{color:"#39da61",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:3,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#ff6688",lineStyle:{color:"#ff6688",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:4,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#a8a8ff",lineStyle:{color:"#a8a8ff",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:5,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#de7af9",lineStyle:{color:"#de7af9",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:6,data:[],symbol:"circle",symbolSize:7,itemStyle:{normal:{color:"rgb(0, 118, 143)",lineStyle:{color:"rgb(0, 118, 143)",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:7,data:[],symbol:"circle",symbolSize:7,itemStyle:{normal:{color:"rgb(76, 180, 231)",lineStyle:{color:"rgb(76, 180, 231)",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:8,data:[],symbol:"circle",symbolSize:7,itemStyle:{normal:{color:"rgb(255, 192, 159)",lineStyle:{color:"rgb(255, 192, 159)",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:9,data:[],symbol:"circle",symbolSize:7,itemStyle:{normal:{color:"rgb(145, 78, 0)",lineStyle:{color:"rgb(145, 78, 0)",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:10,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#ff746c",lineStyle:{color:"#ff746c",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:11,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"rgb(59, 203, 213)",lineStyle:{color:"rgb(59, 203, 213)",width:2}}}},{name:"",type:"line",smooth:!0,yAxisIndex:12,data:[],symbol:"circle",symbolSize:6,itemStyle:{normal:{color:"#ff4400",lineStyle:{color:"#ff4400",width:2}}}}]}),i={disabledDate:function(e){return e.getTime()>Date.now()||e.getTime()<16330176e5},shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近14天",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-12096e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}}]},l={tooltip:{trigger:"item"},legend:{bottom:"3%",left:"center"},series:[{type:"pie",radius:["45%","70%"],center:["50%","40%"],avoidLabelOverlap:!0,itemStyle:{borderRadius:0,borderColor:"#fff",borderWidth:2},label:{normal:{show:!0,position:"center",color:"#000",formatter:"汇总：123",fontSize:"18",fontWeight:300},emphasis:{show:!0}},emphasis:{label:{show:!1,fontSize:"40",fontWeight:"bold"}},labelLine:{show:!0},data:[{value:1048,name:"Search Engine",itemStyle:{color:"rgb(255, 192, 159)"}},{value:735,name:"Direct",itemStyle:{color:"rgb(145, 78, 0)"}},{value:580,name:"Email",itemStyle:{color:"#de7af9"}},{value:484,name:"Union Ads",itemStyle:{color:"rgb(0, 118, 143)"}},{value:300,name:"Video Ads",itemStyle:{color:"#a8a8ff"}}]}]}},"5c14":function(e,t,a){},"5c25":function(e,t,a){e.exports=a.p+"static/img/no-data.5dbb23e5.png"},6220:function(e,t,a){"use strict";a("5c14")},"65ac":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"warning-report-container"},["ADMIN"==e.$store.getters.roles[0]||"SUPER_ADMIN"==e.$store.getters.roles[0]?a("el-tabs",{staticClass:"tabs",model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{lazy:"",label:"预警报表",name:"report"}},["report"==e.activeName?a("Report"):e._e()],1),a("el-tab-pane",{attrs:{lazy:"",label:"预警规则",name:"rules"}},["rules"==e.activeName?a("Rules"):e._e()],1)],1):e._e(),e.$store.getters.roles[0]&&"ADMIN"!=e.$store.getters.roles[0]&&"SUPER_ADMIN"!=e.$store.getters.roles[0]?a("Report"):e._e()],1)},r=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rules-container"},[a("div",{staticClass:"search"},[a("div",{staticClass:"item"},[a("el-input",{attrs:{placeholder:"请输入预警名称"},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}})],1),a("div",{staticClass:"item"},[a("el-select",{attrs:{placeholder:"请选择预警对象",clearable:""},model:{value:e.query.target,callback:function(t){e.$set(e.query,"target",t)},expression:"query.target"}},[a("el-option",{attrs:{label:"应用",value:1}}),a("el-option",{attrs:{label:"广告位",value:2}})],1)],1),a("div",{staticClass:"item"},[a("el-select",{attrs:{placeholder:"请选择预警状态",clearable:""},model:{value:e.query.sts,callback:function(t){e.$set(e.query,"sts",t)},expression:"query.sts"}},[a("el-option",{attrs:{label:"开启",value:"A"}}),a("el-option",{attrs:{label:"关闭",value:"S"}})],1)],1),"SUPER_ADMIN"==e.$store.getters.roles[0]?a("div",{staticClass:"item"},[a("CustSelectOne",{staticClass:"filter-item",attrs:{model:e.query.company,"all-data":e.adminList,width:240,word:"账号",clear:!0},on:{handleSelect:e.handleSelectAdmin}})],1):e._e(),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v(" 查询 ")])],1)]),a("div",{staticClass:"add_btn"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v(" 预警规则 ")])],1),e.tableList.length>0?a("div",{staticClass:"table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"header-cell-style":{"background-color":"#f7f8fa",color:"#000"},stripe:"",data:e.tableList}},[a("el-table-column",{attrs:{align:"center",fixed:"",prop:"name",label:"预警名称"}}),"SUPER_ADMIN"==e.$store.getters.roles[0]?a("el-table-column",{attrs:{align:"center",fixed:"",prop:"company",label:"创建账户"}}):e._e(),a("el-table-column",{attrs:{align:"center",fixed:"",prop:"noticeDate",label:"最近预警时间"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.noticeDate?a.noticeDate:"-")+" ")]}}],null,!1,379625811)}),a("el-table-column",{attrs:{width:"100px",align:"center",fixed:"",prop:"target",label:"预警对象"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(1==a.target?"应用":2==a.target?"广告位":"-")+" ")]}}],null,!1,3150987185)}),a("el-table-column",{attrs:{width:"100px",align:"center",fixed:"",prop:"frequency",label:"预警频率"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(1==a.frequency?"天级":2==a.frequency?"小时级":"-")+" ")]}}],null,!1,284891109)}),a("el-table-column",{attrs:{align:"center",width:"150px",fixed:"",prop:"noticeType",label:"预警方式"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(1==a.noticeType?"站内信":2==a.noticeType?"邮箱":3==a.noticeType?"站内信 + 邮箱":"-")+" ")]}}],null,!1,205392686)}),a("el-table-column",{attrs:{width:"100px",align:"center",fixed:"",prop:"sts",label:"预警状态"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-switch",{attrs:{"active-value":"A","inactive-value":"S","active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(t){return e.changTableSts(t,n)}},model:{value:n.sts,callback:function(t){e.$set(n,"sts",t)},expression:"row.sts"}})]}}],null,!1,1928985533)}),a("el-table-column",{attrs:{width:"120px",align:"center",fixed:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tooltip",{attrs:{content:"编辑",placement:"top",effect:"light"}},[a("div",{staticClass:"doicon",on:{click:function(t){return e.handleUpdate(n)}}},[a("svg-icon",{staticClass:"svgicon",staticStyle:{color:"#3685df"},attrs:{"icon-class":"edit"}})],1)]),a("el-tooltip",{attrs:{content:"删除",placement:"top",effect:"light"}},[a("div",{staticClass:"doicon",on:{click:function(t){return e.handleDelete(n)}}},[a("svg-icon",{staticClass:"svgicon",staticStyle:{color:"red","margin-right":"10px"},attrs:{"icon-class":"delete"}})],1)])]}}],null,!1,3619982186)})],1),a("el-pagination",{staticStyle:{margin:"30px 0 0 0"},attrs:{"current-page":e.query.page,"page-sizes":[5,10,20,50],"page-size":e.query.limit,layout:"total,sizes,prev,pager,next,jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):a("Empty")],1)},l=[],s=a("5530"),o=a("1da1"),c=(a("96cf"),a("e9c4"),a("d3b7"),a("159b"),a("b0c0"),a("b562")),u=a("ed5f"),d=a("fa47"),p=a("1af9"),m={components:{Empty:d["a"],CustSelectOne:p["a"]},data:function(){return{query:{limit:10,page:1,name:"",target:"",sts:"",company:""},total:0,adminList:[],tableList:[],loading:!1}},mounted:function(){this.$route.params&&this.$route.params.query&&(this.query=JSON.parse(JSON.stringify(this.$route.params.query))),this.getadminList(),this.getTableData()},methods:{getadminList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["i"])();case 2:a=t.sent,a.data.forEach((function(e){e.id=""+e.id,e.name=e.company})),e.adminList=a.data?a.data:[];case 5:case"end":return t.stop()}}),t)})))()},handleSelectAdmin:function(e){this.query.company=e},handleSearch:function(){this.query.page=1,this.getTableData()},getTableData:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,Object(u["e"])(e.query);case 3:a=t.sent,e.total=a.data?a.data.total:0,e.tableList=a.data?a.data.items:[],e.loading=!1,e.$bus.$emit("totop");case 8:case"end":return t.stop()}}),t)})))()},changTableSts:function(e,t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["g"])(t);case 2:if(n=e.sent,200==n.code){e.next=5;break}return e.abrupt("return");case 5:a.$message.success("修改成功！"),a.getTableData();case 7:case"end":return e.stop()}}),e)})))()},handleSizeChange:function(e){this.query.page=1,this.query.limit=e,this.getTableData()},handleCurrentChange:function(e){this.query.page=e,this.getTableData()},handleUpdate:function(e){this.$router.push({name:"updateRules",path:"updateRules",params:Object(s["a"])(Object(s["a"])({},e),{},{query:this.query,isAdd:!1})})},handleDelete:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$confirm("确定删除该预警吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["b"])({id:e.id});case 2:t.$message.success("删除成功！"),t.query.page=1,t.getTableData();case 5:case"end":return a.stop()}}),a)})))).catch((function(){}));case 1:case"end":return a.stop()}}),a)})))()},handleAdd:function(){this.$router.push({name:"updateRules",path:"updateRules",params:{name:"",target:"",appIdList:[],placeIdList:[],frequency:1,triggerCondition:0,earlyWarningRuleList:[{ruleId:"",ruleType:1,dateType:0,value:""}],noticeType:1,userIdList:[],emailList:[],query:this.query,isAdd:!0}})}}},h=m,f=(a("6e57"),a("2877")),y=Object(f["a"])(h,i,l,!1,null,"1048ac9c",null),g=y.exports,b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"report-container"},[a("div",{staticClass:"search"},[a("div",{staticClass:"item"},[a("el-date-picker",{staticClass:"item",attrs:{clearable:!1,type:"daterange","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:e.getSTimeChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),a("div",{staticClass:"item"},["SUPER_ADMIN"==e.$store.getters.roles[0]?a("CustSelectOne",{staticStyle:{width:"200px"},attrs:{model:e.query.createUser,"all-data":e.adminList,width:200,word:"账户",clear:!0},on:{handleSelect:e.handleSelectAdmin}}):e._e()],1),a("div",{staticClass:"item"},[a("el-select",{attrs:{placeholder:"请选择预警",clearable:""},model:{value:e.query.id,callback:function(t){e.$set(e.query,"id",t)},expression:"query.id"}},e._l(e.warningList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.name}})})),1)],1),a("div",{staticClass:"item"},[a("el-select",{attrs:{placeholder:"请选择预警对象",clearable:""},model:{value:e.query.target,callback:function(t){e.$set(e.query,"target",t)},expression:"query.target"}},[a("el-option",{attrs:{value:1,label:"应用"}}),a("el-option",{attrs:{value:2,label:"广告位"}})],1)],1),a("div",{staticClass:"item"},[a("el-select",{attrs:{placeholder:"请选择预警状态",clearable:""},model:{value:e.query.sts,callback:function(t){e.$set(e.query,"sts",t)},expression:"query.sts"}},[a("el-option",{attrs:{label:"开启",value:"A"}}),a("el-option",{attrs:{label:"关闭",value:"S"}})],1)],1),a("div",{staticClass:"item btn"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v(" 查询 ")])],1)]),a("div",{staticClass:"table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],ref:"table",attrs:{data:e.tableList,"header-cell-style":{"background-color":"#f7f8fa",color:"#000"}}},[a("el-table-column",{attrs:{align:"center",label:"数据时间",prop:"date"}}),"SUPER_ADMIN"==e.$store.getters.roles[0]?a("el-table-column",{attrs:{align:"center",label:"预警账户",prop:"company"}}):e._e(),a("el-table-column",{attrs:{align:"center",label:"预警名称",prop:"name",width:"180px"}}),a("el-table-column",{attrs:{align:"center",label:"预警状态",prop:"sts"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:"A"==n.sts?"success":"danger"}},[e._v(" "+e._s("A"==n.sts?"开启":"关闭")+" ")])]}}])}),a("el-table-column",{attrs:{align:"center",label:"预警对象",prop:"target"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(1==a.target?"应用":"广告位")+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"预警频率",prop:"frequency"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(1==a.frequency?"天级":"小时级")+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"预警通知时间",prop:"noticeDate",width:"180px"}}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.toogleExpand(t.row)}}},[e._v(" 查看预警详情 ")])]}}])}),a("el-table-column",{attrs:{type:"expand",width:"1"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-table",{staticStyle:{width:"100%"},attrs:{data:n.children?n.children:[],border:"","row-class-name":e.tableRowClassName}},[a("el-table-column",{attrs:{align:"center",label:"应用",prop:"appName",width:"220px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",[e._v(e._s(n.appName))]),a("div",[e._v("ID："+e._s(n.appId))])]}}],null,!0)}),2==n.target?a("el-table-column",{attrs:{align:"center",label:"广告位",prop:"placeName",width:"220px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[n.placeName?a("div",[e._v(" "+e._s(n.placeName)+" ")]):e._e(),n.placeId?a("div",[e._v(" ID："+e._s(n.placeId)+" ")]):e._e(),n.placeName?e._e():a("span",[e._v("-")])]}}],null,!0)}):e._e(),a("el-table-column",{attrs:{align:"center",label:"预警实际触发值",prop:"date"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("span",{staticStyle:{color:"red"}},[e._v(e._s(e.dealRuleId(t.row.ruleId)))]),e._v(" "+e._s((1==n.frequency?"昨天":"今天")+"【"+n.newDate+"】比"+(1==n.frequency?"前一天":"昨天")+"【"+n.oldDate+"】"+(2==n.frequency?"在"+n.hour+"时段":""))+" "),a("span",{staticStyle:{color:"red"}},[e._v(e._s(1==t.row.type?"上浮":"下跌"))]),e._v(" "+e._s(t.row.floatValue+"%；")+" ")]),a("div",[e._v(" "+e._s((1==n.frequency?"昨天":"今天")+"【"+n.newDate+"】："+t.row.newValue+e.dealSuffix(t.row.ruleId)+"；"+(1==n.frequency?"前一天":"昨天")+"【"+n.oldDate+"】："+t.row.oldValue+e.dealSuffix(t.row.ruleId))+" ")])]}}],null,!0)}),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-link",{attrs:{type:"success"},on:{click:function(a){return e.handleDetails(t.row,n)}}},[e._v(" 查看更多数据 ")])]}}],null,!0)})],1)]}}])})],1),a("el-pagination",{staticStyle:{margin:"30px 0 0 0"},attrs:{"current-page":e.query.page,"page-sizes":[5,10,20,50],"page-size":e.query.limit,layout:"total,sizes,prev,pager,next,jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},w=[],v=(a("99af"),a("3620")),x={components:{CustSelectOne:p["a"]},data:function(){return{pickerOptions:v["a"]||[],date:[],query:{startDate:"",endDate:"",createUser:"",id:"",target:"",sts:"",page:1,limit:10},total:0,adminList:[],warningList:[],tableList:[],isLoading:!1,expandId:""}},mounted:function(){this.initDate(),this.getadminList(),this.getWarningByUser(),this.getTableList()},methods:{getSTimeChange:function(){this.query.endDate=this.date[1],this.query.startDate=this.date[0]},initDate:function(){var e=(new Date).getTime(),t=new Date(e).getFullYear(),a=new Date(e).getMonth()+1,n=new Date(e).getDate(),r=(new Date).getTime()-6048e5,i=new Date(r).getFullYear(),l=new Date(r).getMonth()+1,s=new Date(r).getDate(),o="".concat(t,"-").concat(a<10?"0"+a:a,"-").concat(n<10?"0"+n:n),c="".concat(i,"-").concat(l<10?"0"+l:l,"-").concat(s<10?"0"+s:s);this.date=[c,o],this.query.endDate=o,this.query.startDate=c},getadminList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["i"])();case 2:a=t.sent,a.data.forEach((function(e){e.id=""+e.id,e.name=e.company})),e.adminList=a.data?a.data:[];case 5:case"end":return t.stop()}}),t)})))()},handleSelectAdmin:function(e){this.query.createUser=e},changeCreateUser:function(){this.getWarningByUser()},getWarningByUser:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["d"])({createUser:e.query.createUser});case 2:a=t.sent,e.warningList=a.data?a.data:[];case 4:case"end":return t.stop()}}),t)})))()},handleSearch:function(){this.query.page=1,this.getTableList()},getTableList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,Object(u["f"])(e.query);case 3:a=t.sent,e.tableList=a.data.items?a.data.items:[],e.total=a.data.total?a.data.total:0,e.isLoading=!1,e.$bus.$emit("totop");case 8:case"end":return t.stop()}}),t)})))()},handleDetails:function(e,t){1==t.frequency?this.$router.push({name:"synthReport",params:{query:this.query,crow:e,row:t}}):2==t.frequency&&this.$router.push({name:"hoursReport",params:{query:this.query,crow:e,row:t}})},dealRuleId:function(e){switch(e){case 1:return"DAU";case 2:return"ARPDAU";case 3:return"流量请求";case 4:return"流量填充率";case 5:return"展示";case 6:return"预估收益";case 7:return"展示率";case 8:return"预估eCPM"}},dealSuffix:function(e){switch(e){case 1:return"";case 2:return"";case 3:return"";case 4:return"%";case 5:return"";case 6:return"";case 7:return"%";case 8:return""}},handleSizeChange:function(e){this.query.page=1,this.query.limit=e,this.getTableList()},handleCurrentChange:function(e){this.query.page=e,this.getTableList()},toogleExpand:function(e){var t=this.$refs.table;this.tableList.forEach((function(e){t.toggleRowExpansion(e,!1)})),this.expandId!=e.id?(t.toggleRowExpansion(e),this.expandId=e.id):this.expandId==e.id&&(this.expandId="")},tableRowClassName:function(e){e.row,e.rowIndex;return"reportItem"}}},S=x,L=(a("7089"),Object(f["a"])(S,b,w,!1,null,"2e565bc4",null)),_=L.exports,k={name:"WarningReport",components:{Rules:g,Report:_},data:function(){return{activeName:"report"}},mounted:function(){this.$route.params&&this.$route.params.query&&(this.activeName="rules")}},q=k,D=(a("6220"),Object(f["a"])(q,n,r,!1,null,"ad617c56",null));t["default"]=D.exports},"6e57":function(e,t,a){"use strict";a("e54d")},7089:function(e,t,a){"use strict";a("8edf")},"8edf":function(e,t,a){},b562:function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return l})),a.d(t,"a",(function(){return s})),a.d(t,"k",(function(){return o})),a.d(t,"j",(function(){return c})),a.d(t,"b",(function(){return u})),a.d(t,"d",(function(){return d})),a.d(t,"i",(function(){return p})),a.d(t,"h",(function(){return m})),a.d(t,"g",(function(){return h}));var n=a("b775");function r(){return Object(n["a"])({url:"/app/list",method:"get"})}function i(e){return Object(n["a"])({url:"/app/getAppListByRole",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/app/pager",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/app/add",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/app/update",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/aggregate/platformList/"+e,method:"post"})}function u(e){return Object(n["a"])({url:"/dashboard/getAdminAndAppListByBusinessId",method:"post",data:e})}function d(e){return Object(n["a"])({url:"/dashboard/getAppListByAdminId",method:"post",data:e})}function p(){return Object(n["a"])({url:"/user/adminList",method:"get"})}function m(){return Object(n["a"])({url:"/app/getMediaAppList",method:"get"})}function h(e){return Object(n["a"])({url:"/app/getApplistByUserIdAndOs",method:"post",data:e})}},e54d:function(e,t,a){},e9c4:function(e,t,a){var n=a("23e7"),r=a("d066"),i=a("d039"),l=r("JSON","stringify"),s=/[\uD800-\uDFFF]/g,o=/^[\uD800-\uDBFF]$/,c=/^[\uDC00-\uDFFF]$/,u=function(e,t,a){var n=a.charAt(t-1),r=a.charAt(t+1);return o.test(e)&&!c.test(r)||c.test(e)&&!o.test(n)?"\\u"+e.charCodeAt(0).toString(16):e},d=i((function(){return'"\\udf06\\ud834"'!==l("\udf06\ud834")||'"\\udead"'!==l("\udead")}));l&&n({target:"JSON",stat:!0,forced:d},{stringify:function(e,t,a){var n=l.apply(null,arguments);return"string"==typeof n?n.replace(s,u):n}})},ed5f:function(e,t,a){"use strict";a.d(t,"e",(function(){return r})),a.d(t,"g",(function(){return i})),a.d(t,"a",(function(){return l})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return c})),a.d(t,"f",(function(){return u}));var n=a("b775");function r(e){return Object(n["a"])({url:"/earlyWarning/getWarningPage",method:"post",data:e})}function i(e){return Object(n["a"])({url:"/earlyWarning/updateWarning",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/earlyWarning/addWarning",method:"post",data:e})}function s(){return Object(n["a"])({url:"/user/getSubList",method:"get"})}function o(e){return Object(n["a"])({url:"/earlyWarning/deleteWarning",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/earlyWarning/getWarningByUser",method:"post",data:e})}function u(e){return Object(n["a"])({url:"/earlyWarning/getWarningReportPage",method:"post",data:e})}}}]);