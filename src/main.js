import Vue from 'vue';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import ElementUI from 'element-ui';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import joyadata_coms from 'joyadata-coms';
import joyadata_header from 'joyadata-header';
import 'joyadata-header/src/lib/permission_all'; // 权限控制
import '@/styles/index.scss'; // global css
import App from './App';
import store from './store/index';
import router from './router/index';
import '@/icons'; // icon
import i18n from 'joyadata-header/src/i18n';
import settings from './settings';
import VueDND from 'awe-dnd';
Vue.use(VueDND);
import layoutAside from '@/components/layout/layoutAside';
Vue.component('layoutAside', layoutAside);
Vue.use(ElementUI);
Vue.use(joyadata_coms);
Vue.use(joyadata_header);
Vue.config.productionTip = false;
Vue.prototype.$settings = settings;
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});

// import startQiankun from './micros';

// 启动微应用

// startQiankun();
