import Vue from 'vue';
import { login, logout } from '@/api/user';
const user = {
  state: {
    token: '',
    userId: '',
    groups: ['1000', '3000', '4000'],
    companyId: '',
    userType: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups;
    },
    SET_COMPANYID: (state, companyId) => {
      state.companyId = companyId;
    },
    SET_USERTYPE: (state, userType) => {
      state.userType = userType;
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo);
        login(userInfo)
          .then(response => {
            console.log(response);
            const { flag, data, errMsg } = response;
            if (flag) {
              const user = data.user;
              const groups = user.groups.split(',');
              commit('SET_USERID', userInfo.userId);
              commit('SET_TOKEN', data.token);
              commit('SET_GROUPS', groups);
              commit('SET_COMPANYID', user.companyId === null ? '' : user.companyId);
              commit('SET_USERTYPE', user.userType === null ? '' : user.userType);
              Vue.ls.set('TOKEN', data.token);
              Vue.ls.set('USERID', userInfo.userId);
              Vue.ls.set('GROUPS', groups);
              Vue.ls.set('COMPANYID', user.companyId === null ? '' : user.companyId);
              Vue.ls.set('USERTYPE', user.userType === null ? '' : user.userType);
            } else {
              reject(errMsg);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //注销
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_GROUPS', ['1000', '3000', '4000']);
        commit('SET_USERID', '');
        commit('SET_COMPANYID', '');
        commit('SET_USERTYPE', '');
        Vue.ls.set('TOKEN', '');
        Vue.ls.set('USERID', '');
        Vue.ls.set('GROUPS', ['1000', '3000', '4000']);
        Vue.ls.set('COMPANYID', '');
        Vue.ls.set('USERTYPE', '');
        logout(state.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },
    // 更新token
    renewToken({ commit }, token) {
      return new Promise(resolve => {
        console.log('RenewToken:' + token);
        commit('SET_TOKEN', token);
        Vue.ls.set('TOKEN', token);
        resolve();
      });
    },
    //根据vue-ls更新本地文件
    refreshUser({ commit }) {
      return new Promise(resolve => {
        console.log('刷新重新初始化Vuex');
        const userId = Vue.ls.get('USERID') ? Vue.ls.get('USERID') : '';
        const token = Vue.ls.get('TOKEN') ? Vue.ls.get('TOKEN') : '';
        const groups = Vue.ls.get('GROUPS') ? Vue.ls.get('GROUPS') : ['1000', '3000', '4000'];
        const companyId = Vue.ls.get('COMPANYID') ? Vue.ls.get('COMPANYID') : '';
        const userType = Vue.ls.get('USERTYPE') ? Vue.ls.get('USERTYPE') : '';
        commit('SET_USERID', userId);
        commit('SET_TOKEN', token);
        commit('SET_GROUPS', groups);
        commit('SET_COMPANYID', companyId);
        commit('SET_USERTYPE', userType);
        resolve();
      });
    }
  }
};
export default user;
