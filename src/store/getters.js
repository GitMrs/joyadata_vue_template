import { userGetter } from 'joyadata-header/src/store/modules/user';
const getter = {
  ...userGetter,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  treeData: state => state.treeList.treeData, // 左侧数菜单
  currentTreeItem: state => state.treeList.currentTreeItem, // 当前选中项
  currentTreeType: state => state.treeList.currentTreeType, // 当前选中类型
  treeLoading: state => state.treeList.treeLoading, // treeMenu加载
};
export default getter;
