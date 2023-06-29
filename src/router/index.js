import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/layout/login';
Vue.use(Router);
/* Layout */
import Layout from '@/layout';
import NotFont from '@/layout/404';
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * 菜单类型 - dirs 无数据，不需要左边的目录，菜单就是目录
 {
   path: '/dataImport',
    component: Layout,
    redirect: '/dataImport/index',
    meta: { title: '测试页面', code: 'dataImport' },
    children: [
      {
        path: 'home', // 此处必须为home，
        name: 'home',
        meta: { title: '测试页面', code: 'class', noSider: true }, // noSider: 为true
        component: () => import('@/views/demo'),
      },
    ],
  }
  * 菜单类型 - dirs 有数据，需要左边目录
  {
    path: '/dataImport',
    component: Layout,
    redirect: '/dataImport/home',
    meta: { title: '测试页面', code: 'dataImport' },
    children: [
      {
        path: 'home', // path 要和dirs 里面的code保持一致
        name: 'home',
        meta: { title: '测试页面', code: 'class' }, // 不需要noSider
        component: () => import('@/views/demo'),
      },
    ],
  }
 */
// 动态批对菜单使用
export const permissionRouter = [
  {
    path: '/project',
    component: Layout,
    redirect: '/project/class',
    meta: { title: '测试页面', code: 'project' },
    children: [
      {
        path: 'class',
        name: 'class',
        meta: { title: '测试页面', code: 'class' },
        component: () => import('@/views/demo'),
      },
    ],
  },
];
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/**
 * 默认路由
 */
export const constantRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: resolve => require(['@/layout/redirect'], resolve),
      },
    ],
  },
  {
    path: '/404',
    component: NotFont,
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
