/*
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 11:23:34
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-18 10:13:13
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        redirectAlreadyLogin: true,
      },
      component: () => import("@/views/login/login.vue"),
    },
    {
      path: "/",
      name: "wrapper",
      redirect: "/home",
      component: () => import("@/components/Wrapper.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home/home.vue"),
          meta: {
            name: "工作台",
            isNeedLogin: true,
          },
        },
        {
          path: "/tableDemo",
          name: "tableDemo",
          component: () => import("@/views/components/BTable-demo.vue"),
          meta: {
            name: "BTable-demo",
          },
        },
        {
          path: "/columnTableDemo",
          name: "columnTableDemo",
          component: () => import("@/views/components/ColumnTable-demo.vue"),
          meta: {
            name: "ColumnTable-Demo",
          },
        },
        {
          path: "/pagerDemo",
          name: "pagerDemo",
          component: () => import("@/views/components/Pager-demo.vue"),
          meta: {
            name: "pager-demo",
          },
        },
        {
          path: "/uploadAndDownload",
          name: "uploadAndDownload",
          component: () =>
            import("@/views/components/uploadAndDownload-demo.vue"),
          meta: {
            name: "上传下载案例",
          },
        },
        {
          path: "/echartDemo",
          name: "EchartDemo",
          component: () => import("@/views/components/echart-demo.vue"),
          meta: {
            name: "echart-demo",
          },
        },
        {
          path: "/BDialog-demo",
          name: "BDialog-demo",
          component: () => import("@/views/components/BDialog-demo.vue"),
          meta: {
            name: "BDialog-demo",
          },
        },
        {
          path: "/Bmessage-demo",
          name: "Bmessage-demo",
          component: () => import("@/views/components/Bmessage-demo.vue"),
          meta: {
            name: "Bmessage-demo",
          },
        },
        {
          path: "/DictSelect-demo",
          name: "DictSelect-demo",
          component: () => import("@/views/components/DictSelect-demo.vue"),
          meta: {
            name: "DictSelect-demo",
          },
        },
        {
          path: "/FullScreen-demo",
          name: "FullScreen-demo",
          component: () => import("@/views/components/FullScreen-demo.vue"),
          meta: {
            name: "FullScreen-demo",
          },
        },
        {
          path: "/TinymceDemo",
          name: "Tinymce-demo",
          component: () => import("@/views/components/Tinymce-demo.vue"),
          meta: {
            name: "Tinymce-demo",
          },
        },
        {
          path: "/Detail-demo",
          name: "Detail-demo",
          component: () => import("@/views/components/detail-demo.vue"),
          meta: {
            name: "Detail-demo",
          },
        },
        {
          path: "/Title-demo",
          name: "/Title-demo",
          component: () => import("@/views/components/Title-demo.vue"),
          meta: {
            name: "Title-demo",
          },
        },
        {
          path: "/Binput-demo",
          name: "/Binput-demo",
          component: () => import("@/views/components/Binput-demo.vue"),
          meta: {
            name: "Binput-demo",
          },
        },
        {
          path: "/Bprovince-demo",
          name: "/Bprovince-demo",
          component: () => import("@/views/components/Bprovince-demo.vue"),
          meta: {
            name: "Bprovince-demo",
          },
        },
        {
          path: "/BSelect-demo",
          name: "/BSelect-demo",
          component: () => import("@/views/components/BSelect-demo.vue"),
          meta: {
            name: "BSelect-demo",
          },
        },
        {
          path: "/system/userManage",
          name: "userManage",
          component: () => import("@/views/system/userManage/index.vue"),
          meta: {
            name: "用户管理",
          },
        },
        {
          path: "/system/roleManage",
          name: "roleManage",
          component: () => import("@/views/system/roleManage/index.vue"),
          meta: {
            name: "角色管理",
          },
        },
        {
          path: "/system/postManage",
          name: "postManage",
          component: () => import("@/views/system/postManage/index.vue"),
          meta: {
            name: "岗位管理",
          },
        },
        {
          path: "/system/dictionaryManage",
          name: "dictionaryManage",
          component: () => import("@/views/system/dictionaryManage/index.vue"),
          meta: {
            name: "字典管理",
          },
        },
        {
          path: "/system/dictionaryManage/editList",
          name: "editList",
          component: () =>
            import("@/views/system/dictionaryManage/editList/index.vue"),
          meta: {
            name: "选项列表",
          },
        },
        {
          path: "/system/logManage",
          name: "logManage",
          component: () => import("@/views/system/logManage/index.vue"),
          meta: {
            name: "日志管理",
          },
        },
        {
          path: "/system/messageManage",
          name: "messageManage",
          component: () => import("@/views/system/messageManage/index.vue"),
          meta: {
            name: "消息管理",
          },
        },
        {
          path: "/system/noticeManage",
          name: "noticeManage",
          component: () => import("@/views/system/noticeManage/index.vue"),
          meta: {
            name: "公告管理",
          },
        },
        {
          path: "/system/authorityManage",
          name: "authorityManage",
          component: () => import("@/views/system/authorityManage/index.vue"),
          meta: {
            name: "菜单管理",
          },
        },
        // 机构管理 旧
        // {
        //     path: "/system/organizationManage",
        //     name: "organizationManage",
        //     component: () =>
        //         import("@/views/system/organizationManage/index.vue"),
        //     meta: {
        //         name: "机构管理",
        //     },
        // },
        // 机构管理 新
        {
          path: "/system/organizationManage",
          name: "orgManage",
          component: () => import("@/views/system/orgManage/index.vue"),
          meta: {
            name: "机构管理",
          },
        },
        {
          path: "/system/processControl",
          name: "processControl",
          component: () =>
            import("@/views/system/processControl/processControl.vue"),
          meta: {
            name: "流程配置",
          },
        },
        {
          path: "/system/processControl/processControlSeting",
          name: "processControlSeting",
          meta: {
            name: "定义流程",
          },
          component: () =>
            import("@/views/system/processControl/processControlSeting.vue"),
        },
        /****************************** 企业信息管理  start************************************/
        {
          path: "/enterpriseInfoManage",
          name: "enterpriseInfoManage",
          meta: {
            name: "企业信息管理",
          },
          component: () =>
            import("@/views/businessInfoManage/enterpriseInfoManage/index.vue"),
        },
        {
          path: "/enterpriseInfoManage/survey",
          name: "survey",
          meta: {
            name: "资信调查",
          },
          component: () =>
            import(
              "@/views/businessInfoManage/enterpriseInfoManage/survey/index.vue"
            ),
        },
        {
          path: "/enterpriseInfoSearch",
          name: "enterpriseInfoSearch",
          meta: {
            name: "企业信息查询",
          },
          component: () =>
            import("@/views/businessInfoManage/enterpriseInfoSearch/index.vue"),
        },
        {
          path: "/enterpriseInfoDetail",
          name: "enterpriseInfoDetail",
          meta: {
            name: "企业信息详情",
          },
          component: () =>
            import(
              "@/views/businessInfoManage/enterpriseInfoSearch/Detail.vue"
            ),
        },
        /****************************** 企业信息管理  end************************************/
        /****************************** 企业资信管理  start************************************/
        {
          path: "/creditManageAnalysis",
          name: "creditManageAnalysis",
          meta: {
            name: "资信统计分析",
          },
          component: () =>
            import(
              "@/views/businessCreditManage/creditManageAnalysis/index.vue"
            ),
        },
        {
          path: "/enterpriseCreditManage",
          name: "enterpriseCreditManage",
          meta: {
            name: "企业资信管理",
          },
          component: () =>
            import(
              "@/views/businessCreditManage/enterpriseCreditManage/index.vue"
            ),
        },
        {
          path: "/enterpriseCreditManage/detail",
          name: "enterpriseCreditManageDetail",
          meta: {
            name: "资信审核",
          },
          component: () =>
            import(
              "@/views/businessCreditManage/enterpriseCreditManage/detail.vue"
            ),
        },

        /****************************** 企业资信管理  end************************************/

        /****************************** 企业信用管理  start************************************/
        {
          path: "/businessPromiseManage/limit/general",
          name: "limitGeneral",
          meta: {
            name: "一般授信额度",
          },
          component: () =>
            import("@/views/businessPromiseManage/limit/general/index.vue"),
        },
        {
          path: "/businessPromiseManage/limit/general/addOrUpdate",
          name: "generalAddOrUpdate",
          meta: {
            name: "授信申请",
          },
          component: () =>
            import(
              "@/views/businessPromiseManage/limit/general/addOrUpdate/index.vue"
            ),
        },
        {
          path: "/businessPromiseManage/limit/general/detail",
          name: "generalDetail",
          meta: {
            name: "一般授信额度详情",
          },
          component: () =>
            import(
              "@/views/businessPromiseManage/limit/general/detail/index.vue"
            ),
        },
        {
          path: "/businessPromiseManage/abnormalEvent",
          name: "abnormalEvent",
          meta: {
            name: "异常事件管理",
          },
          component: () =>
            import("@/views/businessPromiseManage/abnormalEvent/index.vue"),
        },
        /****************************** 企业信用管理  end************************************/

        /****************************** 动态跟踪管理  start************************************/
        {
          path: "/dynamicTrackManage/warnEnterprise",
          name: "warnEnterprise",
          meta: {
            name: "预警企业管理",
          },
          component: () =>
            import("@/views/dynamicTrackManage/warnEnterprise/index.vue"),
        },
        /****************************** 动态跟踪管理  end************************************/

        /****************************** 企业风险追溯管理  start************************************/
        {
          path: "/riskStatisticalAnalysis",
          name: "riskStatisticalAnalysis",
          meta: {
            name: "风险统计分析",
          },
          component: () =>
            import(
              "@/views/enterpriseRiskTraceabilityManagement/riskStatisticalAnalysis/index.vue"
            ),
        },
        /****************************** 企业风险追溯管理  end************************************/
        /****************************** 行业管理  start************************************/
        {
          path: "/tradeInfoManage",
          name: "tradeInfoManage",
          meta: {
            name: "行业信息管理",
          },
          component: () =>
            import("@/views/tradeManage/tradeInfoManage/index.vue"),
        },
        {
          path: "/tradeInfoManage/tradeDetail",
          name: "tradeDetail",
          meta: {
            name: "行业详情",
          },
          component: () =>
            import("@/views/tradeManage/tradeInfoManage/tradeDetail.vue"),
        },
        {
          path: "/tradeInfoManage/createCustRiskFactor",
          name: "createCustRiskFactor",
          meta: {
            name: "创建客户风险系数",
          },
          component: () =>
            import(
              "@/views/tradeManage/tradeInfoManage/createCustRiskFactor.vue"
            ),
        },

        {
          path: "/customRiskCoefficient",
          name: "customRiskCoefficient",
          meta: {
            name: "客户风险系数",
          },
          component: () =>
            import("@/views/tradeManage/customRiskCoefficient/index.vue"),
        },
        {
          path: "/customRiskCoefficientDetail",
          name: "customRiskCoefficientDetail",
          meta: {
            name: "客户风险系数详情",
          },
          component: () =>
            import(
              "@/views/tradeManage/customRiskCoefficient/details/index.vue"
            ),
        },

        /****************************** 行业管理  end************************************/

        /****************************** 配置管理  start************************************/
        {
          path: "/configManage/template/credit",
          name: "templateCredit",
          meta: {
            name: "资信调查模板",
          },
          component: () =>
            import("@/views/configManage/template/credit/index.vue"),
        },
        // 行业调查模板
        {
          path: "/configManage/template/industry",
          name: "templateIndustry",
          meta: {
            name: "行业调查模板",
          },
          component: () =>
            import("@/views/configManage/template/industry/index.vue"),
        },
        // 动态跟踪模板
        // {
        //     path: "/configManage/template/dynamicTracingTemplate",
        //     name: "dynamicTracingTemplate",
        //     meta: {
        //         name: "动态跟踪模板",
        //     },
        //     component: () =>
        //         import("@/views/configManage/template/credit/dynamicTracingTemplate/index.vue"),
        // },
        {
          path: "/configManage/credit/addOrUpdate",
          name: "creditAddOrUpdate",
          meta: {
            name: "模版-操作",
          },
          component: () =>
            import(
              "@/views/configManage/template/credit/addOrUpdate/index.vue"
            ),
        },
        {
          path: "/configManage/credit/detail",
          name: "creditDetail",
          meta: {
            name: "模版-详情",
          },
          component: () =>
            import("@/views/configManage/template/credit/Detail.vue"),
        },
        {
          path: "/configManage/limitMultiplier",
          name: "limitMultiplier",
          meta: {
            name: "限额乘数配置",
          },
          component: () =>
            import("@/views/configManage/limitMultiplier/index.vue"),
        },
        {
          path: "/configManage/customerRisk",
          name: "customerRisk",
          meta: {
            name: "通用客户风险系数",
          },
          component: () =>
            import("@/views/configManage/customerRisk/index.vue"),
        },
        {
          path: "/configManage/creditNotice",
          name: "creditNotice",
          meta: {
            name: "授信通知管理",
          },
          component: () =>
            import("@/views/configManage/creditNotice/index.vue"),
        },
        {
          path: "/configManage/riskNotice",
          name: "riskNotice",
          meta: {
            name: "风险通知配置",
          },
          component: () => import("@/views/configManage/riskNotice/index.vue"),
        },
        {
          path: "/configManage/tradeDataConfig",
          name: "tradeDataConfig",
          meta: {
            name: "行业数据获取方式",
          },
          component: () =>
            import("@/views/configManage/tradeDataConfig/index.vue"),
        },
        {
          path: "/configManage/staffMatrix",
          name: "staffMatrix",
          meta: {
            name: "人员矩阵配置",
          },
          component: () => import("@/views/configManage/staffMatrix/index.vue"),
        },
        /****************************** 配置管理  end************************************/

        // {
        //   path: "/modifyPassword",
        //   name: "modifyPassword",
        //   component: () => import("@/views/modifyPassword/index.vue"),
        //   meta: {
        //     name: "修改密码",
        //   },
        // },
        {
          path: "/404",
          name: "404",
          component: () => import("@/views/exception/404.vue"),
          meta: {
            name: "404",
          },
        },
      ],
    },
    {
      path: "*",
      component: () => import("@/components/Wrapper.vue"),
      children: [
        {
          path: "*",
          name: "404",
          component: () => import("@/views/exception/404.vue"),
          meta: {
            name: "404",
          },
        },
      ],
    },
  ],
});
