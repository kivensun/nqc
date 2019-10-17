import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
      meta: { title: 'NBCT查询服务' },
      children: [
        {
          path: '/cntrinfo/cntrainerinfo',
          name: 'CntrainerInfo',
          component: () => import('@/views/cntrinfo/CntrainerInfo.vue'),
          meta: { title: '单箱信息查询', permission: ['1000'] }
        },
        {
          path: '/cntrinfo/imcustompassinfo',
          name: 'ImCustomPassInfo',
          component: () => import('@/views/cntrinfo/ImCustomPassInfo.vue'),
          meta: { title: '进口箱海关放行信息查询', permission: ['1000'] }
        },
        {
          path: '/cntrinfo/exportpassinfo',
          name: 'ExportPassInfo',
          component: () => import('@/views/cntrinfo/ExportPassInfo.vue'),
          meta: { title: '出口箱码头放行信息查询', permission: ['1000'] }
        },
        {
          path: '/cntrinfo/checkmovecntrinfo',
          name: 'CheckMoveCntrInfo',
          component: () => import('@/views/cntrinfo/CheckMoveCntrInfo.vue'),
          meta: { title: '查验箱移箱/归位情况查询', permission: ['1000'] }
        },
        {
          path: '/publicinfo/sailingdatenotice',
          name: 'CailingDateNotice',
          component: () => import('@/views/publicinfo/SailingDateNotice.vue'),
          meta: { title: '集装箱船舶船期信息', permission: ['3000'] }
        },
        // 外部链接
        {
          path: '/publicinfo/cntrinclosedate',
          name: 'CntrInCloseDate',
          component: () => import('@/views/publicinfo/CntrInCloseDate.vue'),
          meta: { title: '集装箱进箱/截箱时间公告', permission: ['3000'] }
        },
        {
          path: '/publicinfo/orderreceive',
          name: 'OrderReceive',
          component: () => import('@/views/publicinfo/orderreceive.vue'),
          meta: { title: '单证中心船舶接单公告', permission: ['3000'] }
        },
        {
          path: '/publicinfo/YardTruck',
          name: 'YardTruck',
          component: () => import('@/views/publicinfo/YardTruck.vue'),
          meta: { title: '在场集卡列表', permission: ['3000'] }
        },
        {
          path: '/customerquery/exvoyagelncdquery',
          name: 'ExVoyageLncdQuery',
          component: () => import('@/views/customerinfo/exvoyagelncdquery.vue'),
          meta: { title: '出口箱信息查询', permission: ['2001'] }
        },
        {
          path: '/customerquery/imvoyagecntrquery',
          name: 'ImVoyageCntrQuery',
          component: () => import('@/views/customerinfo/imvoyagecntrquery.vue'),
          meta: { title: '进口箱信息查询', permission: ['2001'] }
        },
        {
          path: '/customerquery/emptycontainerinyardhis',
          name: 'EmptyContainerInYardHis',
          component: () => import('@/views/customerinfo/EmptyContainerInYardHis.vue'),
          meta: { title: '历史空箱在场查询', permission: ['2001'] }
        },
        {
          path: '/customerinfo/EmptyContainer',
          name: 'EmptyContainer',
          component: () => import('@/views/customerinfo/EmptyContainer.vue'),
          meta: { title: '在场空箱实时查询', permission: ['2001', '2003'] }
        },
        {
          path: '/customerquery/exyardcontainerlistbycaag',
          name: 'exYardContainerListByCaag',
          component: () => import('@/views/customerinfo/exYardContainerListByCaag.vue'),
          meta: { title: '货代在场出口箱信息', permission: ['2002'] }
        },
        {
          path: '/customerquery/exvoyagecaagquery',
          name: 'ExVoyageCaagQuery',
          component: () => import('@/views/customerinfo/exvoyagecaagquery.vue'),
          meta: { title: '货代出口箱按航次查询', permission: ['2002'] }
        },
        {
          path: '/customerquery/efinreportdownload',
          name: 'EfinReportDownload',
          component: () => import('@/views/customerinfo/EfinReportDownload.vue'),
          meta: { title: '货代对帐单下载', permission: ['2002'] }
        },
        {
          path: '/customerquery/containerinfohis',
          name: 'ContainerInfoHis',
          component: () => import('@/views/customerinfo/ContainerInfoHis.vue'),
          meta: { title: '集装箱历史信息查询', permission: ['2004'] }
        },
        {
          path: '/usermanage',
          name: 'UserManage',
          component: () => import('@/views/usermanage/UserManage.vue'),
          meta: { title: '用户管理', permission: ['5000'] }
        },
        {
          path: '/noticemanage',
          name: 'NoticeManage',
          component: () => import('@/views/usermanage/NoticeManage.vue'),
          meta: { title: '公告管理', permission: ['5000'] }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
});
