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

/**
 * ImCustomPassInfo func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function imCustomPassInfo(parameter) {
  return axios({
    url: '/imcustompassinfo',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * ExportPassiInfo func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function exportPassiInfo(parameter) {
  return axios({
    url: '/exportpassinfo',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
/**
 * ImCustomPassInfo func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function checkMoveCntrInfo(parameter) {
  return axios({
    url: '/checkmovecntrinfo',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
