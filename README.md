# joyadata-templalte

- 配合 joyadata-cli 使用
  1. svn clone https://39.104.28.91/svn/joyadata/cloud/joyadata-web-comm/joyadata_template
- 修改 npm 源，建议使用 nrm 公司默认源 http://39.97.108.41:8081/repository/joyadata-group-npm/

# 项目目录

- mock 模拟数据
  1. 关闭 mock 修改 vue.config.js
  ```
    devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js') // 注释掉它则不启动mock数据
  },
  ```
  2. 修改 env 里面的请求 url 为"/dev-api",则走 mock 里面的数据
- src 源代码
  - api 请求地址
  - accsets 图片
  - components 组件
  - env 文件配置请求地址
  - icons 使用 svg 图片
  - layout 公共页面
  - mixins 公共方法
  - router 路由
  - store 数据共享
  - styles 公共样式文件
  - utils 方法
  - views 具体页面视图
- 模板事例
  - 需要的通用组件和方法 node_modules/joyadata-coms
  - 需要的通用样式和头部 node_modules/joyadata-header
  - 数据请求 this.\$request.\_get/\_put/\_delete/\_post/\*\*
  - 部分事例 views/demo

# 说明

- 修改 src/setting.js project

```js
module.exports = {
  /**
   * table calc
   */
  tableHeight: 'calc(100vh - 280px )',
  /**
   * 项目类型需要
   */
  projectMap: {
    productCode: 'productCode',
    productId: 'productId',
    projectId: 'projectId',
    projectName: 'projectName',
    projectStatus: 'projectStatus',
  },
  /**
   * 初始化页面，发布生效
   */
  initPageURL: '/depd/page/home/',
  /**
   * 所属项目名称
   */
  project: 'tenant', // 修改这里
};
```

- 修改 public/static/base.js name 平台不用修改

```js
window._baseData = {
  url: false, // 手动控制请求路径
  config: {
    system: {
      name: '实时计算平台', // 修改系统名字
    },
  },
};
```

- 修改 vue.config.js publicPath 对应自己的项目

```js
...
module.exports = {
  publicPath: '/dedp/page/project', // 这里需要改为项目需要的名字
  ...
}
```

## 后台接口说明

1.  http://192.168.80.180:9200/jddsi/v1/cms/approval_categorys

- ip:端口/项目名版本/模块/功能/表

  ```
    新增
       http://192.168.80.180:9200/jddsi/v1/cms/approval_category post 方式
    修改
       http://192.168.80.180:9200/jddsi/v1/cms/approval_category/id put方式
    删除
      http://192.168.80.180:9200/jddsi/v1/cms/approval_category/id delete方式
    查看
      http://192.168.80.180:9200/jddsi/v1/cms/approval_category/id get方式
    列表
      http://192.168.80.180:9200/jddsi/v1/cms/approval_categorys get请求
        请求后缀
        /fulltree 全树形结构
        /dict 字典结构
        /eq/x1/x2 具体查询x1=x2的数据

        列表参数
          page 当前页 page=0
          pager 每页数量 pager = 10
          sortby 排序字段，多个逗号隔开 sortby=pos_desc,createTime_desc
          searchby 搜索值 多个逗号隔开 searchby=x2,x1
          paramkeys=x1,x2 多带参数,多个以逗号隔开,对应的参数也要多个 x1=1&x2=2
          setinkeys=x1,x2 查询指定范围,多个以逗号隔开,对应的参数也要多个 x1=1&x2=2，后台的分割类型默认,
          lazys 级联查询 layzs=xx,返回的列表里就会带xx对象
          cascades 级联保存 cascades=x1,x2；保存对象里面存在{x1:[],x2},可以保存成功！
          withs 关联出来字段 withs=userTotal 查出列表的userTotal字段
    树形结构 查询结果必须是一个树结构
        /tree 普通查询
        /tree/fulltree 全树 -- 一般搜索用
        /tree/minitree mini树 -- 一般搜索用
        /tree/parent/{id} 查询当前id, 以上的一层的树用于 --异步加载
        /tree/parents/{id} 查询当前id，以上的tree ，所有的tree
        /tree/chidren/{id} 查询当前id，以下的的一层的树用于 --异步加载
        /tree/chidrens/{id} 查询当前id，以下的tree ，所有的tree

  ```

## 公司 nrm 配置

1. npm i -g nrm@1.1.0
2. nrm add joyadata_in http://192.168.90.126:8081/repository/joyadata-npm-group/ 【内网】
3. nrm add joyadata http://47.92.77.150:8081/repository/joyadata-npm-group/ 【外网】
4. nrm use joyadata【根据自己的实际情况使用，外网地址或者内网地址】
5. 进入项目，下载依赖
6. 常见问题
   - 下载失败
     删除 yarn.lock 或者 package-lock.json 文件重新拉取依赖
