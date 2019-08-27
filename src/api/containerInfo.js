import { axios } from '@/utils/request';

/**
 * containerinfo func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function containerInfo(parameter) {
  return axios({
    url: '/containerinfo',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
