import router from './router';
import store from './store/';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar

  // if (store.getters.name === '') {
  //   store.dispatch('InitMenu', store.getters.groups).then(() => {
  //     next();
  //   });
  // }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.permission) {
    let hadPermission = store.getters.groups.filter(item => to.meta.permission.includes(item));
    if (hadPermission.length === 0) {
      console.log('没有权限');

      next(from.fullPath);
      NProgress.done;
    } else {
      next();
      NProgress.done();
    }
  } else {
    next();
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
