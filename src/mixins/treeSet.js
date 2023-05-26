import { deleteData } from '@/api/initData_indx';
import { indx } from '@/api/url';
import { replaceSearchParams } from '@/utils';
export default {
  methods: {
    // 获取菜单数据
    getTreeMenu(url, Fn) {
      this.$store.dispatch('getTreeList', url).then(() => {
        if (Fn) {
          Fn();
        }
      });
    },
    // 新增分类
    addMenu() {
      if (this.$refs['menuDialog']) {
        new Promise((resolve, reject) => {
          this.menuTitle = '新增目录';
          this.$refs['menuDialog'].open();
          resolve();
        }).then(resolve => {
          const pid = this.$router.history.current.query.id;
          this.$refs['formDom'].form = { pid };
        });
      }
    },
    // 修改分类
    editTreeMenu() {
      if (this.$refs['menuDialog']) {
        // const id = this.$router.history.current.query.id;
        // console.log(this.currentTreeItem)
        if (!this.currentTreeItem.id) {
          this.$message.warning('请先选择修改目录');
          return false;
        }
        if (this.currentTreeItem.id === 1) {
          this.$message.warning('系统目录无法修改目录');
          return false;
        }
        new Promise((resolve, reject) => {
          this.menuTitle = '修改目录';
          this.$refs['menuDialog'].open();
          resolve();
        }).then(resolve => {
          console.log(1111);
          this.$refs['formDom'].form = this.currentTreeItem;
        });
      }
    },
    // 删除分类
    removeMenu() {
      if (this.$refs['menuDialog']) {
        if (!this.currentTreeItem.id) {
          this.$message.warning('请先选择删除目录');
          return false;
        }
        this.$confirm(
          '确定要删除' + this.currentTreeItem.name + '目录吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {
          deleteData(indx.indxCatalog + '/' + this.currentTreeItem.id, {}).then(
            () => {
              this.$router.push({
                path: this.$route.path,
                query: replaceSearchParams({ id: '', ids: '' }),
              });
              this.$router.go(0);
              // console.log(replaceSearchParams({ id: '', ids: '' }));
            },
          );
        });
        // this.warning('是否删除？', () => {
        // deleteTreeMenu(this.rescType, this.currentMenu.pkid).then(res => {
        //   this.$message.success('删除成功');
        //   this.getTreeMenu();
        // });
        // });
      }
    },
  },
};
