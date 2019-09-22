import { axios } from '@/utils/request';

export const orderreceive = params => { return axios.post(`/orderreceive`, params)};