import Mock from 'mockjs2';
import { builder, getBody } from '../util';

const vsvys = [
  {
    cnname: '东方新博',
    engname: 'CIMBRIA',
    vscd: 'CIMBR',
    exvsvy: '034S',
    startdate: '2019-08-29 20:00:00.0',
    enddate: '2019-09-01 20:00:00.0'
  },
  {
    cnname: '阿联酋汉娜',
    engname: 'EMIRATES HANA',
    vscd: 'EMANA',
    exvsvy: '1935W',
    startdate: '2019-08-25 20:00:00.0',
    enddate: '2019-08-29 20:00:00.0'
  },
  {
    cnname: '长慈',
    engname: 'EVER LENIENT',
    vscd: 'EVENT',
    exvsvy: '0871E',
    startdate: '2019-08-28 20:00:00.0',
    enddate: '2019-09-01 20:00:00.0'
  },
  {
    cnname: '未来',
    engname: 'FUTURE',
    vscd: 'FUTUR',
    exvsvy: '935S',
    startdate: '2019-08-29 22:00:00.0',
    enddate: '2019-09-02 22:00:00.0'
  },
  {
    cnname: '海安',
    engname: 'HAIAN MIND',
    vscd: 'HAIAN',
    exvsvy: '012A',
    startdate: '2019-08-28 18:00:00.0',
    enddate: '2019-09-01 18:00:00.0'
  },
  {
    cnname: '意律轮',
    engname: 'ITAL MELODIA',
    vscd: 'ITDIA',
    exvsvy: '144S',
    startdate: '2019-08-25 17:00:00.0',
    enddate: '2019-08-29 17:00:00.0'
  },
  {
    cnname: '宏勇',
    engname: 'JITRA BHUM',
    vscd: 'JIHUM',
    exvsvy: '292S',
    startdate: '2019-08-24 17:00:00.0',
    enddate: '2019-08-28 17:00:00.0'
  },
  {
    cnname: '玛丽亚娜葩城',
    engname: 'KOTA NIPAH',
    vscd: 'KNPAH',
    exvsvy: '314S',
    startdate: '2019-08-24 12:00:00.0',
    enddate: '2019-08-28 12:00:00.0'
  },
  {
    cnname: '马士基亚特兰大',
    engname: 'MAERSK ATLANTIC',
    vscd: 'MARAT',
    exvsvy: '935S',
    startdate: '2019-08-24 18:00:00.0',
    enddate: '2019-08-28 18:00:00.0'
  },
  {
    cnname: '商船三井威严',
    engname: 'MOL MAJESTY',
    vscd: 'MOLMY',
    exvsvy: '053E',
    startdate: '2019-08-25 20:00:00.0',
    enddate: '2019-08-29 20:00:00.0'
  },
  {
    cnname: '现代奎松桥',
    engname: 'QUEZON BRIDGE',
    vscd: 'QUDGE',
    exvsvy: '102S',
    startdate: '2019-08-24 18:00:00.0',
    enddate: '2019-08-28 18:00:00.0'
  },
  {
    cnname: '西奥斯凯',
    engname: 'SCIO SKY',
    vscd: 'SCSKY',
    exvsvy: '934W',
    startdate: '2019-08-24 08:00:00.0',
    enddate: '2019-08-28 08:00:00.0'
  },
  {
    cnname: '西斯潘卢马科',
    engname: 'SEASPAN LUMACO',
    vscd: 'SELMC',
    exvsvy: '934S',
    startdate: '2019-08-28 14:00:00.0',
    enddate: '2019-09-01 14:00:00.0'
  },
  {
    cnname: '海领商人',
    engname: 'SEOUL TRADER',
    vscd: 'SOLTR',
    exvsvy: '1901W',
    startdate: '2019-08-25 20:00:00.0',
    enddate: '2019-08-29 20:00:00.0'
  },
  {
    cnname: '优明',
    engname: 'YM EMINENCE',
    vscd: 'YMEMI',
    exvsvy: '086S',
    startdate: '2019-08-24 18:00:00.0',
    enddate: '2019-08-28 18:00:00.0'
  },
  {
    cnname: '财明',
    engname: 'YM WEALTH',
    vscd: 'YMWTH',
    exvsvy: '144W',
    startdate: '2019-08-28 17:00:00.0',
    enddate: '2019-09-01 17:00:00.0'
  }
];

const cntrInCloseDate = options => {
  const body = getBody(options);
  console.log('mock: body', body);

  return builder(true, vsvys, null, null);
};

Mock.mock(/\/cntrinclosedate/, 'post', cntrInCloseDate);
