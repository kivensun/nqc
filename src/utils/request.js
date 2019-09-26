import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import { VueAxios } from './axios';
import store from '@/store';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  //baseURL: "http://localhost:8864",
  timeout: 6000,
  withCredentials: true
});

const err = error => {
  if (error.response) {
    const data = error.response.data;
    const token = store.getters.token;
    if (error.response.status === 403) {
      notification.err({
        message: 'Forbidden',
        description: data.message
      });
    }
    if (error.response.status === 401 || error.response.status === 500) {
      notification.error({
        message: '安全认证',
        description: error.response.data.message
      });
      if (token) {
        store.dispath('Logout').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

service.interceptors.request.use(config => {
  const token = store.getters.token;
  if (token) {
    config.headers['token'] = token; // 让每个请求携带自定义tokens
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
  const token = response.headers.token;
  if (token) {
    store.dispatch('renewToken', token);
  }
  return response.data;
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
