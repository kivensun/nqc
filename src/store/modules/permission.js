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

        let filterdMenuMap = [];
        menuMap.forEach(menu => {
          let filterdMenuChildren = menu.children.filter(childrenMenu => {
            let permissions = childrenMenu.permission.filter(permission => {
              if (groups.includes(permission)) {
                return true;
              } else {
                return false;
              }
            });
            if (permissions.length > 0) {
              return true;
            } else {
              return false;
            }
          });
          if (filterdMenuChildren.length !== 0) {
            filterdMenuMap.push({
              title: menu.title,
              backgroundImage: menu.backgroundImage,
              children: filterdMenuChildren
            });
          }
        });

        commit('SET_ALLOWEDMENUMAP', filterdMenuMap);
        resolve();
      });
    },

    RenewMenu({ commit }, groups) {
      return new Promise(resolve => {
        const filterdMenuMap = [];
        this.state.permission.allMenuMap.forEach(menu => {
          let filterdMenuChildren = menu.children.filter(childrenMenu => {
            let permissions = childrenMenu.permission.filter(permission => {
              if (groups.includes(permission)) {
                return true;
              } else {
                return false;
              }
            });
            if (permissions.length > 0) {
              return true;
            } else {
              return false;
            }
          });
          if (filterdMenuChildren.length !== 0) {
            filterdMenuMap.push({
              title: menu.title,
              backgroundImage: menu.backgroundImage,
              children: filterdMenuChildren
            });
          }
        });

        commit('SET_ALLOWEDMENUMAP', filterdMenuMap);
        resolve();
      });
    }
  }
};
export default permission;
