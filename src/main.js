// 引入@babel/polyfill处理兼容
import '@babel/polyfill';

import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import VueStorage from 'vue-ls';
import 'ant-design-vue/dist/antd.css';

import { VueAxios } from './utils/request';

//mock
import './mock';

import './permission'; // permission control

Vue.config.productionTip = false;

const storageOptions = {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session' // storage name session, local, memory
};

Vue.use(Antd);
Vue.use(VueAxios);
Vue.use(VueStorage, storageOptions);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
