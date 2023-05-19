import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import store from '@/store'
import Bus from '@/eventBus'
// 生产环境下不调用
if (!window.vueRouter) {
  Vue.use(Router)
}

export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  }
]

export const asyncRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS'],
      keepAlive: true
    },

    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard'),
      name: 'Index',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true,
        roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS']
      }
    }]
  },
  {
    path: '/traffic',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '流量管理',
      icon: 'traffic',
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR'],
      keepAlive: false
    },
    children: [{
        path: 'app',
        component: () => import('@/views/traffic/app/index'),
        name: '应用管理',
        meta: {
          title: '应用管理',
          icon: 'app',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR']
        }
      },
      {
        path: 'adplace',
        component: () => import('@/views/traffic/adplace/index'),
        name: '广告位管理',
        meta: {
          title: '广告位管理',
          icon: 'adplace',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR']
        }
      }
    ]
  },

  {
    path: '/aggregate',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      affix: true,
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADVANCED_OPERATOR'],
      keepAlive: false
    },
    children: [{
        path: '/traffic/aggregate',
        component: () => import('@/views/traffic/aggregate/index'),
        meta: {
          title: '聚合管理',
          icon: 'aggregate',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADVANCED_OPERATOR']
        }
      },
      {
        path: '/traffic/batchadd',
        component: () => import('@/views/traffic/aggregate/batchadd'),
        hidden: true,
        meta: {
          title: '批量添加代码位',
          icon: 'aggregate',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADVANCED_OPERATOR']
        },
        beforeEnter: (to, from, next) => {
          if (from.path == '/traffic/aggregate' || from.path == '/') {
            next()
          } else {
            next(from.path)
          }
        }
      },
      {
        path: '/traffic/batchexport',
        component: () => import('@/views/traffic/aggregate/batchexport'),
        hidden: true,
        meta: {
          title: '批量添加代码位',
          icon: 'aggregate',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADVANCED_OPERATOR']
        },
        beforeEnter: (to, from, next) => {
          if (from.path == '/traffic/aggregate' || from.path == '/') {
            next()
          } else {
            next(from.path)
          }
        }
      },
      {
        path: '/traffic/abTestData',
        component: () => import('@/views/traffic/aggregate/abTestData'),
        hidden: true,
        meta: {
          title: 'A/B测试数据',
          icon: 'aggregate',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADVANCED_OPERATOR']
        },
        beforeEnter: (to, from, next) => {
          if (from.path == '/traffic/aggregate' || from.path == '/') {
            next()
          } else {
            next(from.path)
          }
        }
      }
    ]
  },

  {
    path: '/platform',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      affix: true,
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR'],
      keepAlive: false
    },
    children: [{
      path: '/platform/index',
      component: () => import('@/views/platform/index'),
      meta: {
        title: '广告源',
        icon: 'platform',
        affix: true,
        roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR']
      }
    }]
  },
  {
    path: '/reportData',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '数据报表',
      icon: 'reportData',
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS', 'MEDIA'],
      keepAlive: true
    },

    // 综合报表
    children: [{
        path: 'synthReport',
        component: () => import('@/views/report/synthReport'),
        name: 'synthReport',
        meta: {
          title: '综合报表',
          icon: 'synthReport',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS'],
          keepAlive: true
        }
      },
      {
        path: 'userActionReport',
        component: () => import('@/views/report/userAction'),
        name: '用户行为报表',
        meta: {
          title: '用户行为报表',
          icon: 'userAction',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS'],
          keepAlive: true
        }
      },
      {
        path: 'hoursReport',
        component: () => import('@/views/report/hourReport'),
        name: 'hoursReport',
        meta: {
          title: '分小时报表',
          icon: 'hoursReport',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS']
        }
      },
      {
        path: 'third-party-data',
        component: () => import('@/views/report/third-party-data'),
        name: '上传三方数据',
        meta: {
          title: '上传三方数据',
          icon: 'third-party-data',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS']
        }
      },
      {
        path: 'mediaReport',
        component: () => import('@/views/report/mediaReport/index'),
        name: '媒体报表',
        meta: {
          title: '媒体报表',
          icon: 'mediaReport',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'MEDIA'],
          keepAlive: true
        }
      },
      {
        path: 'funnelReport',
        component: () => import('@/views/report/funnelReport'),
        name: '漏斗报表',
        meta: {
          title: '漏斗报表',
          icon: 'funnel',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS'],
          keepAlive: true
        }
      },
      {
        path: 'warningReport',
        component: () => import('@/views/report/warningReport'),
        name: 'warningReport',
        meta: {
          title: '数据预警',
          icon: 'warning',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS'],
          keepAlive: true
        }
      },
      {
        path: 'updateRules',
        component: () => import('@/views/report/warningReport/editRules'),
        name: 'updateRules',
        hidden: true,
        meta: {
          title: '编辑报警规则',
          icon: 'funnel',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS']
        },
        beforeEnter: (to, from, next) => {
          if (from.path == '/reportData/warningReport') {
            next()
          } else {
            next('/reportData/warningReport')
          }
        }
      },
      {
        path: 'addRules',
        component: () => import('@/views/report/warningReport/editRules'),
        name: 'addRules',
        hidden: true,
        meta: {
          title: '添加报警规则',
          icon: 'funnel',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'BUSINESS']
        },
        beforeEnter: (to, from, next) => {
          if (from.path == '/reportData/warningReport') {
            next()
          } else {
            next('/')
          }
        }
      }
    ]
  },

  // 素材
  {
    path: '/material',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '素材管理',
      icon: 'meaterial',
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'AUDITOR'],
      keepAlive: true
    },

    // 素材审核
    children: [{
        path: 'audit',
        component: () => import('@/views/Material/Audit'),
        name: '素材审核',
        meta: {
          title: '素材审核',
          icon: 'materialAudit',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'AUDITOR'],
          keepAlive: true
        }
      },

      {
        path: 'report',
        component: () => import('@/views/Material/Report'),
        name: '审核报表',
        meta: {
          title: '审核报表',
          icon: 'materialReport',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'AUDITOR'],
          keepAlive: true
        }
      }
    ]
  },
  // 信息管理
  {
    path: '/messages',
    component: Layout,
    redirect: 'noRedirect',
    name: '消息',
    hidden: true,
    meta: {
      title: '消息',
      icon: 'meaterial',
      roles: [
        'SUPER_ADMIN',
        'ADMIN',
        'OPERATOR',
        'VIEWER',
        'VIEWER',
        'BUSSINESS',
        'MEDIA',
        'MANAGEMENT',
        'BUSINESS_DIRECTOR',
        'OPERATOR_DIRECTOR',
        'TECHNOLOGY',
        'FINANCIAL',
        'ADVANCED_OPERATOR'
      ],
      keepAlive: true
    },

    children: [
      // 消息管理
      {
        path: 'audit',
        component: () => import('@/views/Message/AuditMessage'),
        name: '消息管理',
        meta: {
          title: '消息管理',
          icon: 'materialReport',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY'],
          keepAlive: true
        }
      },
      {
        path: 'inform',
        component: () => import('@/views/Message/Inform'),
        name: '消息通知',
        hidden: true,
        meta: {
          title: '消息通知',
          icon: 'materialReport',
          affix: true,
          roles: [
            'SUPER_ADMIN',
            'ADMIN',
            'OPERATOR',
            'VIEWER',
            'VIEWER',
            'BUSSINESS',
            'MEDIA',
            'MANAGEMENT',
            'BUSINESS_DIRECTOR',
            'OPERATOR_DIRECTOR',
            'TECHNOLOGY',
            'FINANCIAL',
            'ADVANCED_OPERATOR'
          ],
          keepAlive: true
        }
      }
    ]
  },
  // 操作日志
  {
    path: '/Ulog',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      affix: true,
      roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN'],
      keepAlive: false
    },
    children: [{
      path: '/Ulog/index',
      component: () => import('@/views/Ulog/index'),
      meta: {
        title: '操作日志',
        icon: 'blog',
        affix: true,
        roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN']
      }
    }]
  },
  // test
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/',
  //   meta: {
  //     affix: true,
  //     roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN'],
  //     keepAlive: false
  //   },
  //   children: [{
  //     path: '/test/',
  //     component: () => import('@/views/test/index'),
  //     meta: {
  //       title: 'test',
  //       icon: 'blog',
  //       affix: true,
  //       roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN']
  //     }
  //   }]
  // },
  {
    path: '/Accesscenter',
    component: Layout,
    name: '接入中心',
    hidden: true,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '接入中心',
      // icon: "table",
      roles: ['ADMIN', 'SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY'],
      keepAlive: false
    },
    children: [{
        path: 'VersionAdmin',
        component: () => import('@/views/MedproAccess/MedproVersionAdmin'),
        name: '版本',
        hidden: true,

        meta: {
          title: '版本',
          icon: 'Version',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY']
        }
      },
      {
        path: 'advertVersionAdmin',
        component: () => import('@/views/MedproAccess/advertVersionAdmin'),
        name: '广告源版本',
        hidden: true,

        meta: {
          title: '广告源版本',
          icon: 'Version',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY']
        }
      },
      {
        path: 'SDKupload',
        component: () => import('@/views/MedproAccess/medproSDKupload'),
        name: 'SDK下载',
        hidden: true,

        meta: {
          title: 'SDK下载',
          icon: 'SDKupload',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR']
        }
      },
      {
        path: 'updateLog',
        component: () => import('@/views/MedproAccess/lookLog'),
        name: '更新日志',
        hidden: true,
        meta: {
          title: '更新日志',
          icon: 'documentation',
          affix: true,
          roles: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'ADMIN', 'OPERATOR', 'ADVANCED_OPERATOR']
        }
      }

    ]
  },
  {
    path: '/advanced',
    component: Layout,
    name: '用户管理',
    redirect: 'noRedirect',
    hidden: true,
    meta: {
      title: '用户管理',
      icon: 'advanced',
      // roles: ["ADMIN","SUPER_ADMIN","MANAGEMENT","BUSINESS_DIRECTOR","OPERATOR_DIRECTOR","TECHNOLOGY","BUSINESS"],
      keepAlive: false
    },
    children: [{
        path: 'sonAccount',
        component: () => import('@/views/userAdmin/advanced/sonAccount.vue'),
        name: '账户管理',
        hidden: true,
        meta: {
          title: '账户管理',
          icon: 'sonAccount',
          affix: true,
          roles: ['ADMIN', 'SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'BUSINESS']
        }
      },
      {
        path: 'loginMsg',
        component: () => import('@/views/userAdmin/loginMsg'),
        name: '登录用户信息',
        hidden: true,
        meta: {
          title: '登录用户信息',
          icon: 'loginMsg',
          affix: true,
          roles: ['ADMIN', 'SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DIRECTOR', 'OPERATOR_DIRECTOR', 'TECHNOLOGY', 'OPERATOR', 'ADVANCED_OPERATOR', 'VIEWER', 'AUDITOR', 'BUSINESS', 'MEDIA']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: "history", // require service support
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeEach((to, from, next) => {
  if (to.path == '/register') {
    if (!store.getters.isMedPro) {
      next('/login')
    } else if (store.getters.isChild) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.path != '/register' && to.path != '/login') {
    Bus.$bus.$emit('totop')
  }
  next()
})

export default router