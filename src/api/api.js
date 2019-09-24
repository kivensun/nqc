import { axios } from '@/utils/request';

export const orderreceive = params => { return axios.post(`/orderreceive`, params); };
export const voyagelist = params => { return axios.post(`/voyagelist`, params); };
export const imcontainerlist = params => { return axios.post(`/imcontainerlist`, params); };
export const excontainerlist = params => { return axios.post(`/excontainerlist`, params); };
export const getEmptyContainer = params => { return axios.post(`/emptycontainer`, params); };