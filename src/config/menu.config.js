export const menuMap = [
  {
    title: '集装箱信息查询',
    children: [
      {
        path: '/cntrinfo/cntrainerinfo',
        title: '单箱信息查询',
        permission: ['1000']
      },
      // 外部链接
      {
        path: '/cntrinfo/imcustompassinfo',
        title: '进口箱海关放行信息查询',
        permission: ['1000']
      },
      {
        path: '/cntrinfo/exportpassinfo',
        title: '出口箱码头放行信息查询',
        permission: ['1000']
      },
      {
        path: '/cntrinfo/checkmovecntrinfo',
        title: '查验箱移箱/归位情况查询',
        permission: ['1000']
      }
    ]
  },
  {
    title: '公共信息查询',
    children: [
      {
        path: '/publicinfo/sailingdatenotice',
        title: '集装箱船舶船期信息',
        permission: ['3000']
      },
      // 外部链接
      {
        path: '/publicinfo/cntrinclosedate',
        title: '集装箱进箱/截箱时间公告',
        permission: ['3000']
      },
      {
        path: '/publicinfo/orderreceive',
        title: '单证中心船舶接单公告',
        permission: ['3000']
      },
      {
        path: '/publicinfo/yardtruck',
        title: '在场集卡列表',
        permission: ['3000']
      },
      {
        path: '/publicinfo/ysktxl',
        title: '延伸可提箱量查询',
        permission: ['3000']
      }
    ]
  },
  {
    title: '客户信息查询',
    children: [
      {
        path: '/customerquery/exportinorldinfor',
        title: '出口箱在场/装船信息查询',
        permission: ['2001']
      },
      {
        path: '/customerquery/2002',
        title: '进口箱信息查询',
        permission: ['2001']
      },
      {
        path: '/customerquery/2003',
        title: '历史空箱在场查询',
        permission: ['2001']
      },
      {
        path: '/customerquery/EmptyContainer',
        title: '在场空箱实时查询',
        permission: ['2001', '2003']
      },
      {
        path: '/customerquery/2005',
        title: '货代出口箱在场箱信息',
        permission: ['2002']
      },
      {
        path: '/customerquery/2006',
        title: '货代出口箱按航次查询',
        permission: ['2002']
      },
      {
        path: '/customerquery/2007',
        title: '货代对帐单下载',
        permission: ['2002']
      },
      {
        path: '/customerquery/2008',
        title: '堆场驳箱查询',
        permission: ['2003']
      },
      {
        path: '/customerquery/2007',
        title: '集装箱历史信息查询',
        permission: ['2004']
      }
    ]
  }
];
