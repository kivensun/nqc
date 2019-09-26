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

/**
 * yardContainerInfo func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function getYardContainerInfo(parameter) {
  return axios({
    url: '/yardcontainerinfo',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * containerHisList func
 * parameters:{
 *    cntrId:'',
 * }
 * @param parameter
 * @returns {*}
 */
export function getContainerHisList(parameter) {
  return axios({
    url: '/containerhislist',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
/**
 * containerHisDetail func
 * parameters:{
 *    accd": "C","jbnr": "33270803","jbns": "1"
 * }
 * @param parameter
 * @returns {*}
 */
export function getContainerHisDetail(parameter) {
  return axios({
    url: '/containerhisdetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

/**
 * containerHisCabl func
 * parameters:{
 *    "accd": "C","jbnr": "33270803","jbns": "1"
 * }
 * @param parameter
 * @returns {*}
 */
export function getContainerHisCabl(parameter) {
  return axios({
    url: '/containerhiscabl',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
/* getExYardContainerListByCaag func
 * parameters:{"caag": "CNC", "ordertype": "PORT"}
 * @param parameter
 * @returns {*}
 */
export function exYardContainerListByCaag(parameter) {
  return axios({
    url: '/exyardcontainerlist',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
