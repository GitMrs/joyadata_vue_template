/**
 * 用户登录实例
 */
const prefix = '/dedp/v1';
const users = {
  joyadata: {
    tenantCode: '-1',
    id: '-1',
    username: 'joyadata',
    nickname: '超级管理员',
    active: true,
    isSuperAdmin: true,
    token: '88c74b96e4c14471a20ebb3fab7e2aec',
    page: {
      menus: [
        {
          code: 'api',
          productCode: 'DataService',
          pos: 2,
          display: true,
          name: 'API工厂',
          dirs: [],
          id: '9527159320192',
          page: '',
          url: '/dedp/page/DataService',
        },
        {
          code: 'preview',
          productCode: 'DataService',
          pos: 1,
          display: true,
          name: 'API概览',
          dirs: [],
          id: '9527154080128',
          page: '',
          url: '/dedp/page/DataService',
        },
        {
          code: 'market',
          productCode: 'market',
          pos: 2,
          display: true,
          name: 'API资产',
          dirs: [],
          id: '9637864646912',
          url: '/dedp/page/market',
        },
        {
          code: 'market',
          productCode: 'DataService',
          pos: 3,
          display: true,
          name: 'API资产超市',
          dirs: [],
          id: '9527166415872',
          page: '',
          url: '/dedp/page/market',
        },
        {
          code: 'task',
          productCode: 'BatchWorks',
          pos: 2,
          display: true,
          name: '任务开发',
          dirs: [],
          id: '9637095467520',
          url: '/dedp/page/BatchWorks/',
        },
        {
          code: 'devOps',
          productCode: 'BatchWorks',
          pos: 2,
          display: true,
          name: '任务运维',
          dirs: [],
          id: '9637106001920',
          url: '/dedp/page/BatchWorks',
        },
        {
          code: 'index',
          productCode: 'tenant',
          pos: 1,
          display: false,
          name: '后台首页',
          dirs: [],
          id: '9517710180480',
          page: '/dedp/page/BatchWorks/',
          url: '/dedp/page/BatchWorks/',
        },
        {
          code: 'preview',
          productCode: 'BatchWorks',
          pos: 1,
          display: true,
          name: '概览',
          dirs: [],
          id: '9637083398016',
          page: '',
          url: '/dedp/page/BatchWorks',
        },
        {
          code: 'user',
          productCode: 'tenant',
          pos: 5,
          display: false,
          name: '用户中心',
          dirs: [
            {
              code: 'myInfo',
              pos: 1,
              name: '个人中心',
              menuId: '9517791317376',
              id: '9518692256384',
            },
            {
              code: 'myTodo',
              pos: 5,
              name: '我的审核',
              menuId: '9517791317376',
              id: '9518701218048',
            },
            {
              code: 'myApp',
              pos: 2,
              name: '我的应用',
              menuId: '9517791317376',
              id: '9518694166144',
            },
            {
              code: 'myApply',
              pos: 4,
              name: '我的申请',
              menuId: '9517791317376',
              id: '9518698616960',
            },
            {
              code: 'myProject',
              pos: 3,
              name: '我的项目',
              menuId: '9517791317376',
              id: '9518696198400',
            },
            {
              code: 'myNotice',
              pos: 6,
              name: '系统通知',
              menuId: '9517791317376',
              id: '9518703100416',
            },
          ],
          id: '9517791317376',
          page: '/dedp/page/user',
          url: '/dedp/page/user',
        },
        {
          code: 'cms',
          productCode: 'tenant',
          display: true,
          name: '系统管理',
          dirs: [
            {
              code: 'productManager',
              children: [
                {
                  code: 'productRegister',
                  pos: 1,
                  name: '产品定义',
                  menuId: '9517788640512',
                  id: '9518482041472',
                },
                {
                  code: 'productFlow',
                  pos: 2,
                  name: '产品流程',
                  menuId: '9517788640512',
                  id: '9518485294976',
                },
                {
                  code: 'productMenu',
                  pos: 3,
                  name: '产品菜单',
                  menuId: '9517788640512',
                  id: '9518487386624',
                },
                {
                  code: 'productDir',
                  pos: 4,
                  name: '产品目录',
                  menuId: '9517788640512',
                  id: '9518489630976',
                },
                {
                  code: 'audit',
                  children: [
                    {
                      code: 'tmsAuditCategory',
                      pos: 1,
                      name: '审批类别管理',
                      menuId: '9517788640512',
                      id: '9604715833216',
                    },
                    {
                      code: 'tmsAuditModel',
                      pos: 2,
                      name: '审批流管理',
                      menuId: '9517788640512',
                      id: '9604719628416',
                    },
                  ],
                  pos: 5,
                  name: '审批管理',
                  menuId: '9517788640512',
                  id: '9604709868928',
                },
              ],
              pos: 9,
              name: '产品管理',
              menuId: '9517788640512',
              id: '9518444960256',
            },
            {
              code: 'sysParamManager',
              children: [
                {
                  code: 'emailConfig',
                  pos: 1,
                  name: '邮件配置',
                  menuId: '9517788640512',
                  id: '9518524855296',
                },
                {
                  code: 'smsConfig',
                  pos: 2,
                  name: '短信配置',
                  menuId: '9517788640512',
                  id: '9518526708352',
                },
                {
                  code: 'warningConfig',
                  pos: 3,
                  name: '告警配置',
                  menuId: '9517788640512',
                  id: '9518634511104',
                },
              ],
              pos: 7,
              name: '参数配置',
              menuId: '9517788640512',
              id: '9518469565568',
            },
            {
              code: 'sysDictManager',
              pos: 6,
              name: '字典管理',
              menuId: '9517788640512',
              id: '9518466756864',
            },
            {
              code: 'approvalManager',
              children: [
                {
                  code: 'approvalCategory',
                  pos: 1,
                  name: '审批类别管理',
                  menuId: '9517788640512',
                  id: '9518516532096',
                },
                {
                  code: 'approvalModel',
                  pos: 2,
                  name: '审批流管理',
                  menuId: '9517788640512',
                  id: '9518518425728',
                },
                {
                  code: 'approvalSetting',
                  pos: 3,
                  name: '审配流量配置',
                  menuId: '9517788640512',
                  id: '9518520501120',
                },
              ],
              pos: 5,
              name: '审核管理',
              menuId: '9517788640512',
              id: '9518464112512',
            },
            {
              code: 'calendarManager',
              children: [
                {
                  code: 'calendar',
                  pos: 1,
                  name: '日历管理',
                  menuId: '9517788640512',
                  id: '9518653586688',
                },
                {
                  code: 'holiday',
                  pos: 2,
                  name: '节假日管理',
                  menuId: '9517788640512',
                  id: '9518655370880',
                },
              ],
              pos: 8,
              name: '工作日历',
              menuId: '9517788640512',
              id: '9518471823104',
            },
            {
              code: 'perManager',
              children: [
                {
                  code: 'role',
                  pos: 1,
                  name: '角色管理',
                  menuId: '9517788640512',
                  id: '9518507942912',
                },
                {
                  code: 'dataPer',
                  pos: 3,
                  name: '数据权限',
                  menuId: '9517788640512',
                  id: '9518511953280',
                },
              ],
              pos: 4,
              name: '权限管理',
              menuId: '9517788640512',
              id: '9518459449600',
            },
            {
              code: 'tenantManager',
              pos: 1,
              name: '租户管理',
              menuId: '9517788640512',
              id: '9518440249472',
            },
            {
              code: 'orgManger',
              children: [
                {
                  code: 'dept',
                  pos: 1,
                  name: '部门管理',
                  menuId: '9517788640512',
                  id: '9518494461056',
                },
                {
                  code: 'user',
                  pos: 2,
                  name: '用户管理',
                  menuId: '9517788640512',
                  id: '9518496808960',
                },
              ],
              pos: 2,
              name: '组织机构',
              menuId: '9517788640512',
              id: '9518449718400',
            },
            {
              code: 'menuManger',
              children: [
                {
                  code: 'menu',
                  pos: 1,
                  name: '菜单管理',
                  menuId: '9517788640512',
                  id: '9518502885888',
                },
                {
                  code: 'dir',
                  pos: 2,
                  name: '目录管理',
                  menuId: '9517788640512',
                  id: '9518504443136',
                },
              ],
              pos: 3,
              name: '菜单管理',
              menuId: '9517788640512',
              id: '9518456602624',
            },
          ],
          id: '9517788640512',
          page: '/dedp/page/cms',
          url: '/dedp/page/cms',
        },
        {
          code: 'resources',
          productCode: 'BatchWorks',
          pos: 4,
          display: true,
          name: '资源中心',
          dirs: [],
          id: '9637110364416',
          url: '/dedp/page/BatchWorks',
        },
        {
          code: 'monitor',
          productCode: 'tenant',
          pos: 3,
          display: true,
          name: '运维监控',
          dirs: [
            {
              code: 'warning',
              children: [
                {
                  code: 'warningSetting',
                  pos: 1,
                  name: '告警策略管理',
                  menuId: '9517785623040',
                  id: '9518675881984',
                },
                {
                  code: 'warningRecord',
                  pos: 2,
                  name: '告警记录监控',
                  menuId: '9517785623040',
                  id: '9518677415168',
                },
              ],
              pos: 2,
              name: '告警管理',
              menuId: '9517785623040',
              id: '9518672238336',
            },
            {
              code: 'monitoring',
              children: [
                {
                  code: 'macMonitoring',
                  pos: 1,
                  name: '机器监控',
                  menuId: '9517785623040',
                  id: '9518679502848',
                },
                {
                  code: 'comMonitoring',
                  pos: 2,
                  name: '组件监控',
                  menuId: '9517785623040',
                  id: '9518681471616',
                },
                {
                  code: 'serMonitoring',
                  pos: 3,
                  name: '服务监控',
                  menuId: '9517785623040',
                  id: '9518683725312',
                },
              ],
              pos: 3,
              name: '运维监控',
              menuId: '9517785623040',
              id: '9518673933696',
            },
          ],
          id: '9517785623040',
          page: '/dedp/page/project',
          url: '/dedp/page/project',
        },
        {
          code: 'project',
          productCode: 'tenant',
          pos: 2,
          display: true,
          name: '项目管理',
          dirs: [
            {
              code: 'class',
              pos: 2,
              name: '项目分类',
              menuId: '9517781749632',
              id: '9518663820288',
            },
            {
              code: 'home',
              pos: 1,
              name: '项目概况',
              menuId: '9517781749632',
              id: '9518661539968',
            },
            {
              code: 'manager',
              pos: 3,
              name: '项目管理',
              menuId: '9517781749632',
              id: '9518665483648',
            },
          ],
          id: '9517781749632',
          page: '/dedp/page/project',
          url: '/dedp/page/project',
        },
        {
          code: 'index',
          productCode: 'market',
          pos: 1,
          display: true,
          name: '首页',
          dirs: [],
          id: '9637857057792',
          url: '/dedp/page/market',
        },
      ],
    },
    dictKey: 'id',
    dictValue: 'name',
  },
};

export default [
  // 验证码
  {
    url: `${prefix}/cms/kaptcha`,
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: 'success',
        result: {
          sessionId: 'C584248173B67957FC6D20E23EF08498',
          image:
            'data:image/jpg;base64,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',
        },
      };
    },
  },
  // user login
  {
    url: `${prefix}/cms/user/login`,
    type: 'post',
    response: config => {
      const { username } = config.body;
      const user = users[username];
      // mock error
      if (!user) {
        return {
          code: -1,
          message: 'user is not defind',
        };
      }

      return {
        code: 0,
        message: 'success',
        result: user,
      };
    },
  },

  // get user info
  {
    url: `${prefix}/cms/user/logged`,
    type: 'get',
    response: config => {
      // const { token } = config.query;
      // const info = users[token];
      // console.log('');
      // // mock error
      // if (!info) {
      //   return {
      //     code: -1,
      //     message: 'Login failed, unable to get user details.',
      //   };
      // }
      return {
        code: 0,
        message: 'success',
        result: users['joyadata'],
      };
    },
  },
  // user logout
  {
    url: `${prefix}/cms/user/logout`,
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: 'success',
      };
    },
  },
  {
    url: `${prefix}/cms/user/menus`,
    type: 'get',
    response: _ => {
      return {
        code: 0,
        message: 'success',
        result: [
          {
            code: 'index',
            pos: 1,
            name: '首页',
            id: '555817452467539968',
            page: 'http://192.168.80.108:9200/pd/page/index/',
            url: '/pd/page/index/',
          },
          {
            code: 'register',
            pos: 2,
            name: '指标管理',
            id: '555820338706534400',
            page: 'http://192.168.80.108:9200/pd/page/template/',
            url: '/norm/template/',
          },
          {
            code: 'census',
            pos: 3,
            name: '指标采集',
            id: '593061975933210624',
            page: 'census',
            url: '/pd/page/census/',
          },
          {
            code: 'audit',
            pos: 4,
            name: '指标分析',
            id: '595730060779606016',
            page: 'audit',
            url: '/pd/page/audit/',
          },
          {
            code: 'review',
            pos: 5,
            name: '指标应用',
            id: '595730253407211520',
            page: 'pd/page/review',
            url: '/pd/page/review/',
          },
          {
            code: 'cms',
            pos: 6,
            name: '后台管理',
            id: '556190537699971072',
            page: '/pd/page/cms/',
            url: '/pd/page/cms/',
          },
        ],
      };
    },
  },
  {
    url: `${prefix}/cms/user/dirs`,
    type: 'get',
    response: config => {
      const { menuCode, productCode } = config.query;
      const result = users['joyadata'].page.menus.filter(
        item => item.code === menuCode && item.productCode === productCode,
      )[0].dirs;
      return {
        code: 0,
        message: 'success',
        result,
      };
    },
  },
];
