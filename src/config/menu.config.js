export const menuMap = [
  {
    title: '集装箱信息查询',
    permission: '1000',
    children: [
      {
        path: '/cntrinfo/cntrainerinfo',
        title: '单箱信息查询'
      },
      // 外部链接
      {
        path: '/cntrinfo/imcustompassinfo',
        title: '进口箱海关放行信息查询'
      },
      {
        path: '/cntrinfo/exportpassinfo',
        title: '出口箱码头放行信息查询'
      },
      {
        path: '/cntrinfo/checkmovecntrinfo',
        title: '查验箱移箱/归位情况查询'
      }
    ]
  },
  {
    title: '公共信息查询',
    permission: '3000',
    children: [
      {
        path: '/publicinfo/sailingdatenotice',
        title: '集装箱船舶船期信息'
      },
      // 外部链接
      {
        path: '/publicinfo/cntrinclosedate',
        title: '集装箱进箱/截箱时间公告'
      },
      {
        path: '/publicinfo/orderreceive',
        title: '单证中心船舶接单公告'
      },
      {
        path: '/publicinfo/yardtruck',
        title: '在场集卡列表'
      },
      {
        path: '/publicinfo/ysktxl',
        title: '延伸可提箱量查询'
      }
    ]
  },
  {
    title: '客户信息查询',
    permission: '2000',
    children: [
      {
        path: '/customerquery/exportinorldinfor',
        title: '出口箱在场/装船信息查询'
      },
      {
        path: '/customerquery/2002',
        title: '出口箱在场/装船信息查询'
      },
      {
        path: '/customerquery/2003',
        title: '出口箱在场/装船信息查询'
      },
      {
        path: '/customerquery/2004',
        title: '出口箱在场/装船信息查询'
      }
    ]
  }
];
