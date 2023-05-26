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
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
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
