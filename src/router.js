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
      meta: { title: 'NBCTCustomerQuery' },
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
          component: () => import('@/views/orderreceive.vue'),
          meta: { title: '单证中心船舶接单公告', permission: ['3000'] }
        },
        {
          path: '/publicinfo/yardtruck',
          name: 'YardTruck',
          component: () => import('@/views/404.vue'),
          meta: { title: '在场集卡列表', permission: ['3000'] }
        },
        {
          path: '/publicinfo/ysktxl',
          name: 'ysktxl',
          component: () => import('@/views/404.vue'),
          meta: { title: '延伸可提箱量查询', permission: ['3000'] }
        },
        {
          path: '/customerquery/exportinorldinfor',
          name: 'ExportInOrLdInfor',
          component: () => import('@/views/404.vue'),
          meta: { title: '出口箱在场/装船信息查询', permission: ['2000'] }
        },
        {
          path: '/customerquery/2002',
          name: '2002',
          component: () => import('@/views/404.vue'),
          meta: { title: '进口箱信息查询', permission: ['2000'] }
        },
        {
          path: '/customerquery/2003',
          name: '2003',
          component: () => import('@/views/404.vue'),
          meta: { title: '历史空箱在场查询', permission: ['2000'] }
        },
        {
          path: '/customerquery/2004',
          name: '2004',
          component: () => import('@/views/404.vue'),
          meta: { title: '在场空箱实时查询', permission: ['2000'] }
        },
        {
          path: '/customerquery/2005',
          name: '2004',
          component: () => import('@/views/404.vue'),
          meta: { title: '货代出口箱在场箱信息', permission: ['2002'] }
        },
        {
          path: '/customerquery/2006',
          name: '2004',
          component: () => import('@/views/404.vue'),
          meta: { title: '货代出口箱按航次查询', permission: ['2002'] }
        },
        {
          path: '/customerquery/2007',
          name: '2004',
          component: () => import('@/views/404.vue'),
          meta: { title: '货代对帐单下载', permission: ['2002'] }
        },
        {
          path: '/customerquery/2008',
          name: '2004',
          component: () => import('@/views/404.vue'),
          meta: { title: '堆场驳箱查询', permission: ['2003'] }
        },
        {
          path: '/usermanage',
          name: 'UserManage',
          component: () => import('@/views/usermanage/usermanage.vue'),
          meta: { title: '用户管理', permission: ['5000'] }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    }
  ]
});
