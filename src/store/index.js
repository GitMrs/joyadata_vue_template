import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from 'joyadata-header/src/store/modules/user';
import tagsView from 'joyadata-header/src/store/modules/tagsView';

import treeList from './modules/tree_list';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    treeList,
    tagsView,
  },
  getters,
});
export default store;
