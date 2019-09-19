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
