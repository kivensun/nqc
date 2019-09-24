import { axios } from '@/utils/request';

/**
 * getEmptyContainerInYardHis func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function getEmptyContainerInYardHis(parameter) {
  return axios({
    url: '/getemptycontainerinyardhis',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * getEfinreports func
 * @param parameter
 * @returns {*}
 */
export function getEfinreports(parameter) {
  return axios({
    url: '/getefinreports',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * getEfinreportFile func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function getEfinreportFile(parameter) {
  return axios({
    url: 'downloadefinreport', //?fnPyCocd=' + fnPyCocd + '&skey=' + skey,
    //method: 'get',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob'
  });
}
