import { menuMap } from '@/config/menu.config';
const permission = {
  state: {
    allMenuMap: [],
    allowedMenuMap: [],
    status: 0 // 0初始状态  1加载过权限
  },
  mutations: {
    SET_ALLMENUMAP: (state, menuMap) => {
      state.allMenuMap = menuMap;
    },
    SET_ALLOWEDMENUMAP: (state, menuMap) => {
      state.allowedMenuMap = menuMap;
    }
  },
  actions: {
    InitMenu({ commit }, groups) {
      return new Promise(resolve => {
        commit('SET_ALLMENUMAP', menuMap);
        const filtedMenuMap = menuMap.filter(menu => {
          if (groups.includes(menu.permission)) {
            return true;
          } else {
            return false;
          }
        });
        commit('SET_ALLOWEDMENUMAP', filtedMenuMap);
        resolve();
      });
    },

    RenewMenu({ commit }, groups) {
      return new Promise(resolve => {
        const filtedMenuMap = this.state.permission.allMenuMap.filter(menu => {
          if (groups.includes(menu.permission)) {
            return true;
          } else {
            return false;
          }
        });
        commit('SET_ALLOWEDMENUMAP', filtedMenuMap);
        resolve();
      });
    }
  }
};
export default permission;
