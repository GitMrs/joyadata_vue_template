import { _get } from './method';
import { replaceSearchParams, _getHashQueryAll } from '../utils/index';
export default {
  data() {
    return {
      loading: false,
      data: [],
      blurry: '',
      total: 0,
      page: 0,
      size: 10,
      query: {
        page: 0,
        pager: 10,
      },
      params: {},
      emptyText: '暂无数据',
    };
  },
  methods: {
    async init() {
      console.log(111);
      if (!(await this.beforeInit()) || this.url === '') {
        return false;
      }
      return new Promise((resolve, reject) => {
        this.loading = true;
        let url = '';
        let oparams = {};
        if (this.url.includes('?')) {
          const urlParams = _getHashQueryAll(this.url);
          url = this.url.split('?')[0];
          if (this.mergeParams) {
            // true浏览器url 覆盖 内部的url
            oparams = {
              ...urlParams,
              ...this.params,
            };
          } else {
            // false 内部url 覆盖 浏览器的url
            oparams = {
              ...this.params,
              ...urlParams,
            };
          }
        } else {
          url = this.url;
          oparams = this.params;
        }
        const params = {};
        for (const key in oparams) {
          if (Object.hasOwnProperty.call(oparams, key)) {
            const element = oparams[key];
            if (element === '') {
              params[key] = undefined;
            } else {
              if (key.includes('.')) {
                const keys = key.split('.');
                if (element) {
                  params[keys[0]] = `${keys[1]}(${element})`;
                }
              } else {
                params[key] = element;
              }
            }
          }
        }
        _get(url, params)
          .then(res => {
            if (res.code === 0) {
              if (this.paramkeys.customPage) {
                this.total = res.result.total;
              } else {
                this.total = res.total;
              }
              if (this.initData) {
                this.data = res.result || [];
              }
              this.queryPage = res.page + 1;
              this.restPage(this.total);
              this.afterData(res);
              setTimeout(() => {
                this.loading = false;
                // if (this.select) {
                this.toggleSelection();
                // }
              }, this.selectDelayTime);
              resolve(res);
              this.$nextTick(() => {
                if (this.type === 'dialog') {
                  this.$refs['multipleTable'] &&
                    this.$refs['multipleTable'].resizeListener();
                }
              });
            } else {
              this.loading = false;
              this.data = [];
            }
          })
          .catch(err => {
            this.loading = false;
            this.data = [];
            this.emptyText = err.message;
            reject(err);
          });
      });
    },
    beforeInit() {
      return true;
    },
    pageChange(e) {
      if (this.type === 'page') {
        // customPage: true；则使用pageNum，pageSize，搜索值为blurry
        const parmas = {};
        if (this.paramkeys.customPage) {
          parmas['pageNum'] = e - 1;
        } else {
          parmas['page'] = e - 1;
        }
        this.$router.push({
          path: this.$route.path,
          query: replaceSearchParams(parmas),
        });
      } else {
        this.page = e - 1;
        this.init();
      }
    },
    sizeChange(e) {
      if (this.type === 'page') {
        // customPage: true；则使用pageNum，pageSize，搜索值为blurry
        const parmas = {};
        if (this.paramkeys.customPage) {
          parmas['pageSize'] = e;
        } else {
          parmas['pager'] = e;
        }
        this.$router.push({
          path: this.$route.path,
          query: replaceSearchParams(parmas),
        });
      } else {
        this.page = 0;
        this.size = e;
        this.init();
      }
    },
    restPage(total) {
      if (this.type === 'page') {
        if (this.data.length === 0 && this.queryPage > 1) {
          const page =
            parseInt(total / this.query.pager - 1) === -1
              ? 0
              : parseInt(total / this.query.pager - 1);
          const parmas = {};
          if (this.paramkeys.customPage) {
            parmas['pageNum'] = page;
          } else {
            parmas['page'] = page;
          }
          this.$router.push({
            path: this.$route.path,
            query: replaceSearchParams({
              ...parmas,
            }),
          });
        }
      } else {
        if (this.page > 0 && this.data.length === 0) {
          this.page = this.page - 1;
          this.init();
        }
      }
    },
    // table表头
    getRowClass({ rowIndex }) {
      if (rowIndex === 0) {
        return 'color: #000;background:#f5f8fd;border-bottom:none;';
      } else {
        return '';
      }
    },
  },
};
