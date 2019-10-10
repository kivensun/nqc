export const menuMap = [
  {
    title: '公共信息查询',
    backgroundImage: require('@/assets/home1.jpg'),
    children: [
      {
        path: '/cntrinfo/cntrainerinfo',
        title: '单箱信息查询',
        permission: ['1000']
      },
      // 外部链接
      {
        path: '/cntrinfo/imcustompassinfo',
        title: '进口箱海关放行查询',
        permission: ['1000']
      },
      {
        path: '/cntrinfo/exportpassinfo',
        title: '出口箱码头放行查询',
        permission: ['1000']
      },
      {
        path: '/cntrinfo/checkmovecntrinfo',
        title: '查验箱移箱/归位查询',
        permission: ['1000']
      },
      {
        path: '/publicinfo/sailingdatenotice',
        title: '集装箱船舶船期信息',
        permission: ['3000']
      },
      // 外部链接
      {
        path: '/publicinfo/cntrinclosedate',
        title: '进箱/截箱时间公告',
        permission: ['3000']
      },
      {
        path: '/publicinfo/orderreceive',
        title: '单证中心船舶接单公告',
        permission: ['3000']
      },
      {
        path: 'http://www.npedi.com/ediportal-web/ediweb/index.jsp',
        title: '集卡停牌查询',
        permission: ['3000']
      },
      {
        path: '/publicinfo/yardtruck',
        title: '在场集卡列表',
        permission: ['3000']
      }
    ]
  },
  {
    title: '客户信息查询',
    backgroundImage: require('@/assets/home2.jpg'),
    children: [
      {
        path: '/customerquery/exvoyagelncdquery',
        title: '出口箱信息查询',
        permission: ['2001']
      },
      {
        path: '/customerquery/imvoyagecntrquery',
        title: '进口箱信息查询',
        permission: ['2001']
      },
      {
        path: '/customerquery/emptycontainerinyardhis',
        title: '历史空箱在场查询',
        permission: ['2001']
      },
      {
        path: '/customerinfo/EmptyContainer',
        title: '在场空箱实时查询',
        permission: ['2001', '2003']
      },
      {
        path: '/customerquery/exyardcontainerlistbycaag',
        title: '货代在场出口箱',
        permission: ['2002']
      },
      {
        path: '/customerquery/exvoyagecaagquery',
        title: '货代出口箱按航次查询',
        permission: ['2002']
      },
      {
        path: '/customerquery/efinreportdownload',
        title: '货代对帐单下载',
        permission: ['2002']
      },
      {
        path: '/customerquery/containerinfohis',
        title: '集装箱历史查询',
        permission: ['2004']
      }
    ]
  },
  {
    title: '系统管理',
    backgroundImage: require('@/assets/home3.jpg'),
    children: [
      {
        path: '/usermanage',
        title: '用户管理',
        permission: ['5000']
      },
      {
        path: '/noticemanage',
        title: '公告管理',
        permission: ['5000']
      }
    ]
  }
];
