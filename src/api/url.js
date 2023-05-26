export const user = {
  login: '/cms/user/login', // 登录
  userInfo: '/cms/user/logged', // 获取用户信息
  logout: '/cms/user/logout', // 退出登录
  menuUrl: '/cms/user/menus?page=-1&pager=10&searchby=name&sortby=pos', // 获取菜单
  getMenu: '/cms/user/dirs/eq/menuCode', // 获取目录
  userURL: `/cms/user`, // 用户
  kaptcha: `/cms/kaptcha`, // 获取验证码
};
