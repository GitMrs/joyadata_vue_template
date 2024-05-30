/**
 * 项目分类
 */
// const isType = (rule, value, callback) => {
//   if (/^[a-zA-Z]\w{7}$/.test(value) === false) {
//     callback('字母、数字、下换线的组合,首字符以字母开始,长度固定8个字符');
//   } else {
//     callback();
//   }

// };
import I18N from 'joyadata-header/src/i18n';
import { parseTime } from 'joyadata-coms/src/utils';
export const manage = {
  // 列表
  table: (vue) => {
    return [
      {
        name: I18N.t('definition.config.fenLeiMingCheng'),
        prop: 'name',
        tooltip: true,
        align: 'left',
        handle: (row) => {
          vue.look(row);
        },
      },
      {
        name: I18N.t('definition.config.fenLeiJianCheng'),
        prop: 'abbreviation',
        tooltip: true,
        align: 'left',
      },
      {
        name: I18N.t('definition.config.guanLianXiangMuShu'),
        prop: 'projectNum',
        tooltip: true,
        width: 150,
        align: 'right',
        handle: (row) => {
          vue.project(row);
        },
      },
      {
        name: I18N.t('definition.config.shangJiFenLeiMing'),
        prop: 'parentName',
        tooltip: true,
        align: 'left',
        // formate: row => {
        //   // ['一级','二级','三级']
        //   // const parentName = row.parentNames.split(',');
        //   // ``;
        //   // return parentName.length === 1
        //   //   ? parentName[0]
        //   //   : parentName[parentName.length - 2];
        //   return row.parentName ? row.parentName : '';
        // },
      },
      // {
      //   name: '备注',
      //   prop: 'description',
      //   tooltip: true,
      //   align: 'left',
      // },
      {
        name: I18N.t('definition.config.gengXinShiJian'),
        type: 'time',
        width: '150px',
        prop: 'lastModificationTime',
        tooltip: true,
      },
      {
        name: I18N.t('definition.config.caoZuo'),
        prop: 'Actions',
        group: [
          {
            name: I18N.t('definition.config.bianJi'),
            type: () => {
              return 'primary';
            },
            plain: true,
            permission: (row) => {
              return false;
            },
            handle: (row) => {
              vue.edit(row);
            },
            // renderBtn: row => {
            //   return row;
            // },
          },
          {
            name: I18N.t('definition.config.shanChu'),
            type: (row) => {
              // return row.projectNum > 0 ? 'info' : 'danger';
              return 'danger';
            },
            plain: true,
            permission: (row) => {
              // console.log(row.children === undefined);
              return row.projectNum > 0;
            },
            handle: (row) => {
              vue.delete(row);
            },
            // renderBtn: row => {
            //   return row.projectNum === 0;
            // },
          },
        ],
      },
    ];
  },
  // 分类关联项目数量
  proTable: (vue) => {
    return [
      {
        name: I18N.t('definition.config.fenLeiMingCheng'),
        prop: 'projectCatalogName',
        tooltip: true,
        align: 'left',
      },
      {
        name: I18N.t('definition.config.xiangMuMingCheng'),
        prop: 'name',
        tooltip: true,
        align: 'left',
      },
      {
        name: I18N.t('definition.config.xiangMuBiaoShi'),
        prop: 'code',
        tooltip: true,
        align: 'left',
      },
      {
        name: I18N.t('definition.config.xiangMuZhouQi'),
        prop: 'rangeTimes',
        tooltip: true,
        align: 'left',
        formate: (row) => {
          if (row.startDate) {
            return `${parseTime(row.startDate, '{y}-{m}-{d}')} ~ ${parseTime(
              row.endDate,
              '{y}-{m}-{d}',
            )}`;
          } else {
            return '-';
          }
        },
      },
      {
        name: I18N.t('definition.config.chuangJianRen'),
        prop: 'createByName',
        tooltip: true,
        align: 'left',
      },
      {
        name: I18N.t('definition.config.chuangJianShiJian'),
        prop: 'createTime',
        type: 'time',
        tooltip: true,
        align: 'left',
      },
    ];
  },
  // 按钮
  searchOperation: (vue) => {
    return [
      {
        name: I18N.t('definition.config.xinZeng'),
        type: 'primary',
        icon: 'el-icon-plus',
        // disabledTitle: '根目录不可编目',
        plain: true,
        permission: () => {
          return false;
        },
        handle: () => {
          vue.add();
        },
      },
    ];
  },
  // 筛选条件
  parmas: (vue) => {
    return [
      {
        type: 'input',
        prop: 'keywords',
        placeholder: I18N.t('definition.config.fenLeiMingChengFen'),
        label: I18N.t('definition.config.souSuo'),
      },
      {
        type: 'frame',
        prop: 'lastModificationTime',
        placeholder: I18N.t('definition.config.qingXuanZeGengXin'),
        label: I18N.t('definition.config.gengXinShiJian'),
        format: 'yyyy-MM-dd',
        timeFormat: 'yyyy-MM-dd',
      },
    ];
  },
  // 新增
  formMain: (vue) => {
    return [
      {
        type: 'selectTree',
        vuex: 'none',
        props: 'pid',
        placeholder: I18N.t('definition.config.shangJiFenLei'),
        label: I18N.t('definition.config.shangJiFenLei'),
        width: '100%',
        data: [],
        normalizer(node) {
          // console.log(node);
          return {
            id: node.id,
            label: node.name,
            children:
              node.children && node.children.length === 0 ? '' : node.children,
          };
        },
        handle: (row) => {
          vue.getPareDown(row);
        },
        labelTips: I18N.t('definition.config.zhiChiSanCengMu'),
        tooltip: true,
        tipsFn(item) {},
      },
      {
        type: 'input',
        props: 'name',
        label: I18N.t('definition.config.fenLeiMingCheng'),
        placeholder: I18N.t('definition.config.fenLeiMingCheng'),
        width: '100%',
      },
      {
        type: 'input',
        props: 'abbreviation',
        label: I18N.t('definition.config.fenLeiJianCheng'),
        placeholder: I18N.t('definition.config.jianCheng'),
        width: '100%',
      },
      {
        type: 'textarea',
        props: 'description',
        label: I18N.t('definition.config.beiZhu'),
        placeholder: I18N.t('definition.config.beiZhuXinXi'),
      },
    ];
  },
  formRules: (vue) => {
    // const isType = (rule, value, callback) => {
    //   const isName = /^[a-zA-Z\u4e00-\u9fa5]{0,}$/;
    //   if (isName.test(value) === false) {
    //     callback('由中文或英文字母大小写组成,不含数字特殊符号');
    //   } else {
    //     callback();
    //   }
    // };
    return {
      name: [
        {
          required: true,
          message: I18N.t('definition.config.qingShuRuFenLei2'),
          trigger: 'blur',
        },
      ],
      abbreviation: [
        {
          required: true,
          message: I18N.t('definition.config.qingShuRuFenLei'),
          trigger: 'blur',
        },
      ],
    };
  },
};
