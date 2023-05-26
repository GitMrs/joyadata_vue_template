// 配置路径！
let url = '';
switch (process.env.NODE_ENV) {
  case 'development':
    // url = 'http://47.109.65.163:8000/dedp/v1';
    // url = 'https://dev.usemock.com/647055aea67750d6294dcd70';
    url = '/dev-api/dedp/v1';
    break;
  case 'production':
    url = window._baseData.url || '/dedp/v1'; // 打包后的数据请求，一般走nginx
    break;
  default:
    url = '/';
    break;
}
export default {
  url,
};
