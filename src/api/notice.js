import { axios } from '@/utils/request';

/**
 * cntrInCloseDate func
 * parameters:{
 *     "startdate":"20190828",
 *    "enddate":"20190829"
 * }
 * @param parameter
 * @returns {*}
 */
export function getNotices() {
  return axios({
    url: '/getnotices',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
