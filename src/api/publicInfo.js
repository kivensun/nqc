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
export function cntrInCloseDate(parameter) {
  return axios({
    url: '/cntrinclosedate',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * cntrInCloseDate func
 * parameters:{
 *     "startdate":"20190828",
 *    "enddate":"20190829"
 * }
 * @param parameter
 * @returns {*}
 */
export function sailingDateNotice(parameter) {
  return axios({
    url: '/sailingdatenotice',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * yadTruck func
 * 无参数
 * }
 * @returns {*}
 */
export const yardTruck = params => {
  return axios.post(`/yardtruck`, params).then(res => res);
};

/**
 * emptyContainer func
 * 有参数
 * }
 * @returns {*}
 */
export function emptyContainer(parameter) {
  return axios({
    url:'/emptycontainer',
    method:'post',
    data: parameter,
    headers:{
      'Content-Type':'application/json;charset-UTF-8'
    }
  });
};
