import { login, logout } from '@/api/user';
const user = {
  state: {
    token: '',
    name: '',
    groups: ['1000', '3000', '4000']
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups;
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
              //Vue.ls.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000);
              const groups = data.groups.split(',');
              commit('SET_NAME', userInfo.userId);
              commit('SET_TOKEN', data.token);
              commit('SET_GROUPS', groups);
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
        commit('SET_NAME', '');
        logout(state.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    }
  }
};
export default user;
