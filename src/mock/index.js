import Mock from 'mockjs2';

console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_PREVIEW);
// 判断环境不是prod或者preview是ture时，加载mock服务
if (process.env.NODE_ENV === 'mojck' || process.env.VUE_APP_PREVIEW === 'ture') {
  // 使用同步加载依赖
  // 防止vuex中的GetInfo早于mock运行，导致无法mock请求返回结果
  console.log('mock mouting');
  require('./services/user');
  require('./services/containerInfo');
  require('./services/cntrInCloseDate');

  Mock.setup({
    timeout: 800
  });
  console.log('mock mounted');
}
