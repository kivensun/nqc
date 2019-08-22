import { axios } from '@/utils/request';

/**
 * login func
 * parameters:{
 *    userId:'',
 *    password: ''
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/login',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * logout func
 * @param
 * @returns {*}
 */
export function logout() {
  return axios({
    url: '/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}