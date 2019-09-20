# nqc

axios 中 BASE_URL
在 development 模式中可在.env.development 文件中修改
在 bulid 模式则在.env 文件中修改

| FGroup     | 一级菜单       | 二级菜单                   | 可访问用户类型 | 前端    | 后台    | 备注 |
| :--------- | :------------- | :------------------------- | :------------- | :------ | :------ | :--- |
|            | 集装箱信息查询 |                            |                |         |         |
| 1000       |                | 单箱信息查询               | 公共           | SDW(ok) | PJ (ok) |
| 1000       |                | 进口箱海关放行信息查询     | 公共           | SDW(ok) | LSH(ok) |
| 1000       |                | 出口箱码头场站收据放行查询 | 公共           | SDW(ok) | LSH(ok) |
| 1000       |                | 查验箱移箱/归位情况查询    | 公共           | SDW(ok) | LSH(ok) |
|            | 公共信息查询   |                            |                |         |         |
| 3000       |                | 集装箱船舶船期预告         | 公共           | SDW(ok) | LSH(ok) |
| 3000       |                | 集装箱进箱、截箱时间公告   | 公共           | SDW(ok) | LSH(ok) |
| 3000       |                | 单证中心船舶接单公告       | 公共           | PJ (ok) | PJ (ok) |
| 3000       |                | 集卡在场信息               | 公共           | LSH(ok) | LSH(ok) |
|            |                | 延伸可提箱量查询           | 公共           |          |         |不再使用
|            | 客户信息查询   |                            |                |         |
| 2004       |                | 集装箱历史信息查询         | C-海关         |
| 2002       |                | 货代出口箱在场箱信息       | H-货代         | LSH     | LSH(ok) |
| 2002       |                | 货代出口箱按航次查询       | H-货代         | PJ      | LSH(ok) |
| 2002       |                | 货代对帐单下载             | H-货代         | SDW     | SDW     |
| 2001       |                | 出口箱在场、装船信息查询   | V-船公司        | PJ(ok)  | LSH(ok) |
| 2001       |                | 进口箱信息查询             | V-船公司       | PJ(ok)  | LSH(ok) |
| 2001       |                | 历史空箱在场查询           | V-船公司       | SDW(ok) | SDW(ok) |
| 2003       |                | 堆场驳箱查询               | D-堆场         |          |         |不再使用
| 2001, 2003 |                | 在场空箱实时查询           | V/D            | WMH     | WMH(ok) |
|            | 用户相关       |                            |                |         |
| 4000       |                | 密码修改                   | 公共           | WMH     | SDW     |
| 5000       |                | 用户维护                   | 管理员         | SDW     | SDW     |

## Project setup

```
npm install
```

### 新增 mock 模式

```
npm run mock
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
