<template>
  <div class="main_container_aside">
    <el-aside class="aside_tree">
      <joyadata-aside
        ref="treeAside"
        :nav-val="navVal"
        :expand="false"
      ></joyadata-aside>
    </el-aside>
    <div class="el_container">
      <joyadata-search
        :operation="searchOperation"
        :parmas="parmas"
        search-by="name,abbreviation"
      />
      <joyadata-table
        ref="table_dom"
        :selection="false"
        :select="false"
        :url="fileUrl"
        :column="column"
        :height="setting.tableHeight"
        :init-pager="setting.initPage"
        :selectable="selectable"
        sort-by="lastModificationTime_desc"
      />
    </div>
  </div>
</template>

<script>
import setting from '@/settings';
import { manage } from './config';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      setting,
      navVal: [],
      fileUrl: '',
      parmas: manage.parmas(this),
      searchOperation: manage.searchOperation(this),
      column: manage.table(this),
      title: '',
      model: '',
      categoryType: '',
    };
  },
  computed: {
    ...mapGetters(['currentTreeItem']),
  },
  watch: {
    currentTreeItem(val) {
      console.log(val);
      this.$router.push({
        query: {
          id: val.id,
          page: 0,
          categoryType: val.categoryType,
          pager: this.$route.query.pager,
          paramkeys: 'parentIds',
          parentIds: `like(${val.id})`,
        },
      });
    },
    '$route.query'(query) {
      if (!query.pager) {
        this.getTree();
      }
    },
  },
  mounted() {
    this.getTree();
  },
  methods: {
    getTree() {
      this.$request._get('xxx').then(res => {
        this.navVal = res.result;
        this.$nextTick(() => {
          const { id } = this.$route.query;
          this.$refs['treeAside'] &&
            this.$refs['treeAside'].$refs['tree'] &&
            this.$refs['treeAside'].$refs['tree'].setCurrentKey(id);
        });
      });
    },
    add() {
      this.title = '新增分类';
      this.model = 'add';
      this.$refs['addClass'].open();
    },
    close() {
      this.$refs['table_dom'].init();
    },
    selectable() {
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .aside_tree {
  .aside .el-tree {
    height: calc(100vh - 225px);
  }
}
.el_container {
  min-width: 930px;

  // .top_search  {
  // }
}
</style>
