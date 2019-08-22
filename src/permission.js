import router from './router';
import store from './store/';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar

  if (store.getters.name === '') {
    store.dispatch('InitMenu', store.getters.groups).then(() => {
      next();
    });
  }

  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
