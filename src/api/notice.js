import { axios } from '@/utils/request';

/**
 * getNotices func
 *
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

/**
 * updateNotice func
 *parameter:{
   content:'123123'
 }
 * @returns {*}
 */
export function updateNotice(parameter) {
  return axios({
    url: '/updatenotice',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
