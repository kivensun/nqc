const getters = {
  groups: state => state.user.groups,
  name: state => state.user.name,
  token: state => state.user.token,
  allmenumap: state => state.permission.allMenuMap,
  allowedmenumap: state => state.permission.allowedMenuMap
};
export default getters;
