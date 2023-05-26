import { indx } from '@/api/url';
const treeList = {
  state: {
    treeData: [],
    currentTreeItem: {},
    currentTreeType: '01',
    treeLoading: false,
  },
  actions: {
    getTreeList({ commit, state }, url) {
      commit('setTreeLoad', true);
      return new Promise((resolve, reject) => {
        this.$request._get(url)
          .then(res => {
            if (res.code === 0) {
              commit('getTreeData', res.result);
              resolve(res.message);
              commit('setTreeLoad', false);
            } else {
              commit('getTreeData', []);
              commit('setTreeLoad', false);
              reject(res.message || '数据获取错误');
            }
          })
          .catch(err => {
            console.log(err);
            commit('getTreeData', []);
            commit('setTreeLoad', false);
            reject(err || '数据获取错误');
          });
      });
    },
    setTreeList({ commit, state }, data) {
      commit('setTreeLoad', true);
      return new Promise((resolve, reject) => {
        this.$request._post(indx.indxCatalog)
          .then(res => {
            if (res.code === 0) {
              commit('setTreeList', res.result);
              resolve(res.message);
              commit('setTreeLoad', false);
            } else {
              commit('setTreeList', []);
              commit('setTreeLoad', false);
              reject(res.message || '数据获取错误');
            }
          })
          .catch(err => {
            console.log(err);
            commit('setTreeList', []);
            commit('setTreeLoad', false);
            reject(err || '数据获取错误');
          });
      });
    },
    setCurrentTreeItem({ state }, data) {
      state.currentTreeItem = data;
    },
    setCurrentTreeType({ state }, data) {
      state.currentTreeType = data;
    },
  },
  mutations: {
    getTreeData(state, data) {
      state.treeData = data;
    },
    setTreeList(state, data) {
      // state.treeData = data;
    },
    setTreeLoad(state, flag) {
      state.treeLoading = flag;
    },
  },
};
export default treeList;
