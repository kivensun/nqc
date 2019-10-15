import Vue from 'vue';
import { login, getUsercompanyHadCodes, logout } from '@/api/user';
const user = {
  state: {
    token: '',
    userId: '',
    groups: ['1000', '3000', '4000'],
    companyId: '',
    userType: '',
    companyHadCodes: []
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
    },
    SET_COMPANYHADCODES: (state, companyHadCodes) => {
      state.companyHadCodes = companyHadCodes;
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
              Vue.ss.set('TOKEN', data.token);
              Vue.ss.set('USERID', userInfo.userId);
              Vue.ss.set('GROUPS', groups);
              Vue.ss.set('COMPANYID', user.companyId === null ? '' : user.companyId);
              Vue.ss.set('USERTYPE', user.userType === null ? '' : user.userType);
              if (user.companyId) {
                let params = {};
                params.companyId = user.companyId;
                params.userType = user.userType;
                getUsercompanyHadCodes(params).then(res => {
                  let { flag, data } = res;
                  if (flag) {
                    let codes = data === null ? [] : data.sort();
                    commit('SET_COMPANYHADCODES', codes);
                    Vue.ss.set('COMPANYHADCODES', codes);
                  }
                });
              }
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
    Logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_GROUPS', ['1000', '3000', '4000']);
        commit('SET_USERID', '');
        commit('SET_COMPANYID', '');
        commit('SET_USERTYPE', '');
        commit('SET_COMPANYHADCODES', []);
        Vue.ss.set('TOKEN', '');
        Vue.ss.set('USERID', '');
        Vue.ss.set('GROUPS', ['1000', '3000', '4000']);
        Vue.ss.set('COMPANYID', '');
        Vue.ss.set('USERTYPE', '');
        Vue.ss.set('COMPANYHADCODES', []);
        //resolve();
        logout()
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
        Vue.ss.set('TOKEN', token);
        resolve();
      });
    },
    //根据vue-ls更新本地文件
    refreshUser({ commit }) {
      return new Promise(resolve => {
        console.log('刷新重新初始化Vuex');
        const userId = Vue.ss.get('USERID') ? Vue.ss.get('USERID') : '';
        const token = Vue.ss.get('TOKEN') ? Vue.ss.get('TOKEN') : '';
        const groups = Vue.ss.get('GROUPS') ? Vue.ss.get('GROUPS') : ['1000', '3000', '4000'];
        const companyId = Vue.ss.get('COMPANYID') ? Vue.ss.get('COMPANYID') : '';
        const userType = Vue.ss.get('USERTYPE') ? Vue.ss.get('USERTYPE') : '';
        const companyHadCodes = Vue.ss.get('COMPANYHADCODES');
        commit('SET_USERID', userId);
        commit('SET_TOKEN', token);
        commit('SET_GROUPS', groups);
        commit('SET_COMPANYID', companyId);
        commit('SET_USERTYPE', userType);
        commit('SET_COMPANYHADCODES', companyHadCodes);
        resolve();
      });
    }
  }
};
export default user;
