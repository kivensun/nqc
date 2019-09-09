const getters = {
  groups: state => state.user.groups,
  userId: state => state.user.userId,
  companyId: state => state.user.companyId,
  userType: state => state.user.userType,
  token: state => state.user.token,
  allmenumap: state => state.permission.allMenuMap,
  allowedmenumap: state => state.permission.allowedMenuMap
};
export default getters;
