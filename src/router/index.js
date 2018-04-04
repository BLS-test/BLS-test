import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  {path: '/404', component: _import('errorPage/404'), hidden: true},
  {path: '/401', component: _import('errorPage/401'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{path: 'dashboard', component: _import('dashboard/index')}]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'people',
    noDropdown: true,
    children: [{path: 'index', component: _import('introduction/index'), name: '简述'}]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'lock',
    meta: {role: ['admin']},
    noDropdown: true,
    children: [{path: 'index', component: _import('permission/index'), name: '权限测试页', meta: {role: ['admin']}}]
  },
  {
    path: '/icon',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    children: [{path: 'index', component: _import('svg-icons/index'), name: 'icons'}]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'component',
    children: [
      {path: 'index', component: _import('components/index'), name: '介绍 '},
      {path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器'},
      {path: 'markdown', component: _import('components/markdown'), name: 'Markdown'},
      {path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器'},
      {path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽'},
      {path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane'},
      {path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传'},
      {path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone'},
      {path: 'sticky', component: _import('components/sticky'), name: 'Sticky'},
      {path: 'countto', component: _import('components/countTo'), name: 'CountTo'},
      {path: 'mixin', component: _import('components/mixin'), name: '小组件'},
      {path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部'}
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '加工',
  //   icon: 'example',
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('example/table/index'),
  //       redirect: '/example/table/table',
  //       name: '加工账册管理',
  //       icon: 'table',
  //       children: [
  //         {path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '加工账册申报'},
  //         {path: 'dragtable', component: _import('example/table/dragTable'), name: '耗料单账册申报'},
  //         {path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: '工单账册管理'}
  //       ]
  //     },
  //     {path: 'form/edit', icon: 'form', component: _import('example/form'), name: '加工账册报核', meta: {isEdit: true}},
  //     {path: 'form/create', icon: 'form', component: _import('example/form'), name: '加工出入区业务'},
  //     {path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: '加工集报业务'}
  //   ]
  // },
  {
    path: '/machine',
    component: Layout,
    redirect: 'noredirect',
    name: '加贸',
    icon: 'star',
    children: [
      {
        path: '/machine/manage',
        component: _import('machine/manage/index'),
        name: '加贸账册管理',
        icon: 'table',
        children: [
          {path: 'declare', component: _import('machine/manage/declare'), name: '加贸账册申报', mate: {keepAlive: true}},
          {path: 'lwqy', component: _import('example/table/inlineEditTable'), name: '联网企业档案库'}
        ]
      },
      {path: 'form/edit', icon: 'form', component: _import('example/form'), name: '加贸数据清单', meta: {isEdit: true}},
      {path: 'form/create', icon: 'form', component: _import('example/form'), name: '加贸数据报核'}
    ]
  },
  {
    path: '/process',
    component: Layout,
    redirect: 'noredirect',
    name: '加工',
    icon: 'example',
    children: [
      {
        path: '/process/manage',
        component: _import('process/manage/index'),
        name: '加工出入区业务',
        icon: 'table',
        children: [
          {path: 'declare', icon: 'form', component: _import('process/manage/declare'), name: '入区核注清单'},
          {path: 'permit', icon: 'form', component: _import('example/table/inlineEditTable'), name: '报关入区核放单'},
          {path: 'form/edit', icon: 'form', component: _import('example/form'), name: '出区核注清单', meta: {isEdit: true}},
          {path: 'form/create', icon: 'form', component: _import('example/form'), name: '报关出区核放单'}

        ]
      },
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/table',
        name: '加工账册管理',
        icon: 'table',
        children: [
          {path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '加工账册申报'},
          {path: 'dragtable', component: _import('example/table/dragTable'), name: '耗料单账册申报'},
          {path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: '工单账册管理'}
        ]
      },
      {path: 'form/edit', icon: 'form', component: _import('example/form'), name: '加工账册报核', meta: {isEdit: true}},
      {path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: '加工集报业务'}
    ]

  },

  {
    path: '/edi',
    component: Layout,
    redirect: 'noredirect',
    name: '报文管理',
    icon: 'star',
    children: [
      {
        path: 'ediSendLog',
        icon: 'form',
        component: _import('edi/ediSendLog/list'),
        name: '申报报文查询',
        meta: {isEdit: true}
      },
      {
        path: 'ediRoutingInfo',
        icon: 'form',
        component: _import('edi/ediRoutingInfo/list'),
        name: '路由配置',
        meta: {isEdit: true}
      },
      {
        path: 'ediSendLog',
        icon: 'form',
        component: _import('edi/ediSendLog/list'),
        name: '申报报文查询',
        meta: {isEdit: true}
      },
      {
        path: 'ediSendLog',
        icon: 'form',
        component: _import('edi/ediSendLog/list'),
        name: '申报报文查询',
        meta: {isEdit: true}
      },
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      {path: '401', component: _import('errorPage/401'), name: '401'},
      {path: '404', component: _import('errorPage/404'), name: '404'}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
