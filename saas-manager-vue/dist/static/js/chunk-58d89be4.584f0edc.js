(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58d89be4"],{3633:function(e,t,a){},"5c25":function(e,t,a){e.exports=a.p+"static/img/no-data.5dbb23e5.png"},7040:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"message-inform-container"},[a("div",{staticClass:"operate"},[a("div",{staticClass:"btn"},[a("el-radio-group",{on:{change:e.handleChangeSts},model:{value:e.query.readSts,callback:function(t){e.$set(e.query,"readSts",t)},expression:"query.readSts"}},[a("el-radio-button",{attrs:{label:""}},[e._v(" 全部 ")]),a("el-radio-button",{attrs:{label:0}},[e._v(" 未读 ")])],1)],1),a("div",{staticClass:"groupOperate"},[a("el-button",{staticClass:"group_operate",attrs:{type:"",disabled:0==e.selectList.length},on:{click:e.handleGroupOperate}},[e._v(" 批量设置为已读 ")])],1)]),e.tableList.length>0?a("div",{staticClass:"table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableList,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{selectable:e.selectable,type:"selection",width:"120",align:"center"}}),a("el-table-column",{attrs:{label:"消息类型",align:"center",prop:"type",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(1==a.type?"平台通知":2==a.type?"功能更新":3==a.type?"运营活动":"")+" ")]}}],null,!1,2085613550)}),a("el-table-column",{attrs:{label:"消息内容",align:"left",prop:"title"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("div",{staticClass:"title",on:{click:function(t){return e.readMessage(n)}}},[a("div",{class:{dot:!0,isnotread:0==n.readSts}}),a("el-link",{attrs:{type:"primary"}},[e._v(" "+e._s(n.title)+" ")])],1)]}}],null,!1,2980547339)}),a("el-table-column",{attrs:{label:"发布时间",align:"center",prop:"publishTime",width:"200px"}})],1),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.query.page,"page-sizes":[5,10,15],"page-size":e.query.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):a("Empty",{staticClass:"empty"}),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{visible:e.dialogTableVisible},on:{"update:visible":function(t){e.dialogTableVisible=t},close:e.closeDialog}},[a("div",{staticClass:"top",attrs:{slot:"title"},slot:"title"},[a("p",{staticClass:"title"},[e._v(" "+e._s(e.rowinfo.title)+" ")]),a("div",{staticClass:"date"},[e._v(" "+e._s(e.rowinfo.publishTime)+" ")])]),a("div",{staticClass:"content",domProps:{innerHTML:e._s(e.rowinfo.content)}})])],1)],1)},r=[],s=a("1da1"),i=(a("d81d"),a("caad"),a("2532"),a("ac1f"),a("5319"),a("96cf"),a("c443")),o=a("fa47"),l={name:"Inform",components:{Empty:o["a"]},data:function(){return{query:{readSts:"",page:1,limit:10},total:0,tableList:[],selectList:[],dialogTableVisible:!1,rowinfo:{},isLoading:!1}},computed:{hasNoRead:function(){}},watch:{},mounted:function(){this.getReadPage()},methods:{handleChangeSts:function(){this.query.page=1,this.getReadPage()},getReadPage:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,Object(i["c"])(e.query);case 3:if(a=t.sent,200==a.code){t.next=7;break}return e.isLoading=!1,t.abrupt("return");case 7:return e.tableList=a.data.items,e.total=a.data.total,e.isLoading=!1,t.next=12,e.$store.dispatch("user/getInfo");case 12:case"end":return t.stop()}}),t)})))()},handleGroupOperate:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.selectList.map((function(e){return e.id})),t.next=3,Object(i["e"])({readSts:1,messageId:a});case 3:if(n=t.sent,200===n.code){t.next=6;break}return t.abrupt("return");case 6:e.$message.success("操作成功！"),e.getReadPage();case 8:case"end":return t.stop()}}),t)})))()},handleSelectionChange:function(e){this.selectList=e},handleSizeChange:function(e){this.query.limit=e,this.getReadPage()},handleCurrentChange:function(e){this.query.page=e,this.getReadPage()},selectable:function(e,t){return 1!=e.readSts},readMessage:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.content,e.content&&(e.content.includes("<table")&&(n=e.content.replace("<table",'<table border="1" borderSpacing="0" cellSpacing="0"')),e.content.includes('colSpan="1"')&&(n=n.replace(/colSpan=\"1\"/g,'align="center"')),e.content.includes('rowSpan="1"')&&(n=n.replace(/rowSpan=\"1\"/g,""))),t.rowinfo=e,t.rowinfo.content=n,t.dialogTableVisible=!0,a.next=7,Object(i["e"])({readSts:1,messageId:[e.id]});case 7:return a.next=9,t.$store.dispatch("user/getInfo");case 9:case"end":return a.stop()}}),a)})))()},closeDialog:function(){0==this.rowinfo.readSts&&this.getReadPage()}}},c=l,u=(a("ee5c"),a("2877")),d=Object(u["a"])(c,n,r,!1,null,"0b4dc668",null);t["default"]=d.exports},c443:function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"e",(function(){return l}));var n=a("b775");function r(e){return Object(n["a"])({url:"/message/page",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/message/add",method:"post",data:e})}function i(e){return Object(n["a"])({url:"/message/update",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/message/readPage",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/message/updateReadSts",method:"post",data:e})}},ee5c:function(e,t,a){"use strict";a("3633")}}]);