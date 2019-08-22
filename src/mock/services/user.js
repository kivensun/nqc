import Mock from 'mockjs2';
import { builder, getBody } from '../util';

const username = ['xzl'];
const password = ['202cb962ac59075b964b07152d234b70'];

const login = options => {
  const body = getBody(options);
  console.log('mock: body', body);
  if (!username.includes(body.userId) || !password.includes(body.password)) {
    return builder(false, {}, '账户或密码错误', null);
  }

  return builder(
    true,
    {
      groups: '1000,2000,3000,4000,5000',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiJZWVkiLCJncm91cHMiOiIxMDAwLDIwMDAsMzAwMCw0MDAwIiwidXNlclR5cGUiOiJWIiwiZXhwIjoxNTY0ODE1NTE5LCJ1c2VySWQiOiJ4emwiLCJqdGkiOiIxYjQ0MTlhNC02NDQyLTQwZDUtOWExNy1kNjcyMGQ3ZDVlMjIifQ.DRPDiEQvnKAOwOT-mP46Y3PCTw1Pl45yYRoApFLE1-E'
    },
    null,
    null
  );
};

const logout = () => {
  return builder(true, {}, null, '[测试接口] 注销成功');
};

Mock.mock(/\/login/, 'post', login);
Mock.mock(/\/logout/, 'post', logout);
