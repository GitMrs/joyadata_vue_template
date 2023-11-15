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
Vue.use(ElementUI);
Vue.use(joyadata_coms);
Vue.use(joyadata_header);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
