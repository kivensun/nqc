import Mock from 'mockjs2';
import { builder, getBody } from '../util';

const containers = [
  {
    cntrId: 'MSKU9987544',
    lncd: 'MSK',
    ctsz: '45',
    ctty: 'GP',
    imvsvy: 'TRASR/A90824-I',
    exvsvy: 'TRASR/A90824-I',
    intd: 'N',
    infe: 'F',
    inog: 'N',
    inth: 'N',
    inhz: 'N',
    indm: 'N',
    inYardDt: '2019-08-24 22:59:50',
    outYardDt: '2019-08-26 20:32:17',
    inPortType: '进口重箱',
    port: 'CNSHR',
    storageDays: '2',
    weight: '18144',
    loaded: ' ',
    customRelease: 'N',
    terminalRelease: ' ',
    cabl: '585057027           ',
    caag: 'TLZMT ',
    weighingWayVGM: null,
    weightVGM: null,
    signVGM: null
  }
];

const containerInfo = options => {
  const body = getBody(options);
  console.log('mock: body', body);
  const container = containers.filter(item => {
    return item.cntrId === body.cntrId ? true : false;
  });

  return builder(true, container.length === 0 ? {} : container[0], null, null);
};

Mock.mock(/\/containerinfo/, 'post', containerInfo);
