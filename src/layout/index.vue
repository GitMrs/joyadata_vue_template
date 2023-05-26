<template>
  <div class="wrapper clearfix">
    <!-- 项目类型的头部 -->
    <!-- <joyadata-dsg-header
      ref="headerDom"
      :logo="logo"
      :sys-name="sysName"
      :menu-data="mockData"
      project-url="/dsg/page/api/"
      :project-item="{
        name: 'DataService',
        img: require('./v2_reolaa.png'),
      }"
      :is-project="true"
    >
    </joyadata-dsg-header> -->
    <!-- 功能类型的头像 -->
    <joyadata-dsg-header
      ref="headerDom"
      :logo="logo"
      :sys-name="sysName"
      :menu-data="mockData"
      project-url="/dsg/page/api/"
    >
    </joyadata-dsg-header>
    <el-container>
      <div v-if="!$route.meta.noSider" class="main_menu">
        <joyadata-menu :menu-data="menuData" />
      </div>
      <el-main
        :style="{
          padding: !$route.meta.noSider ? '0 20px' : '0px',
          borderRadius: !$route.meta.noSider ? '15px 0 0px 0px' : '0px',
        }"
      >
        <joyadata-tags-views v-if="!$route.meta.noSider" />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { user } from '@/api/url';
import { mapGetters } from 'vuex';
import joyadataDsgHeader from 'joyadata-header/src/components/headers/joyadata-dsg-header.vue';
import { getFiexMenus } from 'joyadata-coms/src/utils';
import settings from '@/settings';
export default {
  name: 'Layout',
  components: { joyadataDsgHeader },
  filters: {
    filterTime(val) {
      return val;
    },
  },
  data() {
    return {
      leftWidth: '200px',
      isCollapse: false,
      menuData: [],
      sysName: window._baseData.config.system.name || '系统管理',
      // defaultAvator: require('../assets/header_img.png'),
      logo:
        window._baseData.config.system.logo ||
        require('../assets/logo/logo_2.png'),
      mockData: [],
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    isCollapse(flag) {
      this.leftWidth = flag ? '65px' : '220px';
    },
  },
  mounted() {
    this.mockData = getFiexMenus(settings.project, this.user.page.menus);
    this.getMenu();
  },
  methods: {
    getMenu() {
      this.$request
        ._get(user.getMenu + '/' + this.$route.path.split('/')[1])
        .then(res => {
          const result = res.result || [];
          const menu = [];
          result.map(item => {
            menu.push({
              name: item.name,
              code: item.code,
              children: item.children,
            });
            // }
          });
          this.menuData = menu;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  overflow: unset;
}
</style>
