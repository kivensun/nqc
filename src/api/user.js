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

/**
 * addUser func
 * @param
 * @returns {*}
 */
export function addUser(parameter) {
  return axios({
    url: '/adduser',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * editUser func
 * @param
 * @returns {*}
 */
export function editUser(parameter) {
  console.log(parameter);
  return axios({
    url: '/edituser',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * editUser func
 * @param
 * @returns {*}
 */
export function resetPwUser(parameter) {
  return axios({
    url: '/resetpwuser',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * deleteUser func
 * @param
 * @returns {*}
 */
export function deleteUser(parameter) {
  return axios({
    url: '/deleteuser',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * getUser func
 * @param
 * @returns {*}
 */
export function getUser(parameter) {
  return axios({
    url: '/getuser',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * getUsers func
 * @param
 * @returns {*}
 */
export function getUsers() {
  return axios({
    url: '/getusers',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * getUsercompanyHadCodes func
 * @param
 * @returns {*}
 */
export function getUsercompanyHadCodes(parameter) {
  return axios({
    url: '/getusercompanyhadcodes',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * changePasswordUser func
 * @param
 * @returns {*}
 */
export function changePasswordUser(parameter) {
  return axios({
    url: '/changepwuser',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
