<template>
  <div>
    <layoutAside ref="layoutAside">
      <template slot="aside">
        <joyadata-aside
          ref="treeAside"
          :nav-val="navVal"
          :expand="false"
          :auto-resize="true"
          @toggleAside="val => $refs['layoutAside'].change(!val)"
        ></joyadata-aside>
      </template>
      <template slot="table">
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
          :height="$settings.tableHeight"
          :init-pager="$settings.initPage"
          :filter-column="true"
          :selectable="selectable"
          sort-by="lastModificationTime_desc"
        />
      </template>
    </layoutAside>
    <add-dom ref="dialogRef" :title="title" />
  </div>
</template>

<script>
import { manage, dialogStatus } from './config';
import { mapGetters } from 'vuex';
import addDom from './coms/add.vue';
import { demoURL } from '@/api/demo';
export default {
  components: {
    addDom,
  },
  data() {
    return {
      navVal: [],
      fileUrl: demoURL.demo,
      parmas: manage.parmas(this),
      searchOperation: manage.searchOperation(this),
      column: manage.table(this),
      title: '',
      model: '',
      dialogStatus,
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
    // this.getTree();
  },
  methods: {
    getTree() {
      this.$request._get(demoURL.demo).then(res => {
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
      this.title = dialogStatus[0];
      this.$refs['dialogRef'].open();
    },
    edit(row) {
      this.title = dialogStatus[1];
      this.$refs['dialogRef'].open(row);
    },
    look(row) {
      this.title = dialogStatus[2];
      this.$refs['dialogRef'].open(row);
    },
    async delete(row) {
      try {
        await this.$request._delete(`${demoURL.demo}/${row.id}`);
        this.$message.success('成功');
        this.$refs['table_dom'].init();
      } catch (error) {
        console.log(error);
      }
    },
    selectable() {
      return true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
