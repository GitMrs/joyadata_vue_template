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
import { parseTime } from 'joyadata-coms/src/utils';
export const manage = {
  // 列表
  table: vue => {
    return [
      {
        name: '分类名称',
        prop: 'name',
        tooltip: true,
        align: 'left',
        handle: row => {
          vue.look(row);
        },
      },
      {
        name: '分类简称',
        prop: 'abbreviation',
        tooltip: true,
        align: 'left',
      },
      {
        name: '关联项目数量',
        prop: 'projectNum',
        tooltip: true,
        width: 150,
        align: 'right',
        handle: row => {
          vue.project(row);
        },
      },
      {
        name: '上级分类名称',
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
        name: '更新时间',
        type: 'time',
        width: '150px',
        prop: 'lastModificationTime',
        tooltip: true,
      },
      {
        name: '操作',
        group: [
          {
            name: '编辑',
            type: () => {
              return 'primary';
            },
            plain: true,
            permission: row => {
              return false;
            },
            handle: row => {
              vue.edit(row);
            },
            // renderBtn: row => {
            //   return row;
            // },
          },
          {
            name: '删除',
            type: row => {
              // return row.projectNum > 0 ? 'info' : 'danger';
              return 'danger';
            },
            plain: true,
            permission: row => {
              // console.log(row.children === undefined);
              return row.projectNum > 0;
            },
            handle: row => {
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
  proTable: vue => {
    return [
      {
        name: '分类名称',
        prop: 'projectCatalogName',
        tooltip: true,
        align: 'left',
      },
      {
        name: '项目名称',
        prop: 'name',
        tooltip: true,
        align: 'left',
      },
      {
        name: '项目标识',
        prop: 'code',
        tooltip: true,
        align: 'left',
      },
      {
        name: '项目周期',
        prop: 'rangeTimes',
        tooltip: true,
        align: 'left',
        formate: row => {
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
        name: '创建人',
        prop: 'createByName',
        tooltip: true,
        align: 'left',
      },
      {
        name: '创建时间',
        prop: 'createTime',
        type: 'time',
        tooltip: true,
        align: 'left',
      },
    ];
  },
  // 按钮
  searchOperation: vue => {
    return [
      {
        name: '新增',
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
  parmas: vue => {
    return [
      {
        type: 'input',
        prop: 'keywords',
        placeholder: '分类名称，分类简称模糊搜索',
        label: '搜索',
      },
      {
        type: 'frame',
        prop: 'lastModificationTime',
        placeholder: '请选择更新日期',
        label: '更新时间',
        format: 'yyyy-MM-dd',
        timeFormat: 'yyyy-MM-dd',
      },
    ];
  },
  // 新增
  formMain: vue => {
    return [
      {
        type: 'selectTree',
        vuex: 'none',
        props: 'pid',
        placeholder: '上级分类',
        label: '上级分类',
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
        handle: row => {
          vue.getPareDown(row);
        },
        labelTips: '支持三层目录分类,不选上级分类默认为一级分类。',
        tooltip: true,
        tipsFn(item) {},
      },
      {
        type: 'input',
        props: 'name',
        label: '分类名称',
        placeholder: '分类名称',
        width: '100%',
      },
      {
        type: 'input',
        props: 'abbreviation',
        label: '分类简称',
        placeholder: '简称',
        width: '100%',
      },
      {
        type: 'textarea',
        props: 'description',
        label: '备注',
        placeholder: '备注信息',
      },
    ];
  },
  formRules: vue => {
    // const isType = (rule, value, callback) => {
    //   const isName = /^[a-zA-Z\u4e00-\u9fa5]{0,}$/;
    //   if (isName.test(value) === false) {
    //     callback('由中文或英文字母大小写组成,不含数字特殊符号');
    //   } else {
    //     callback();
    //   }
    // };
    return {
      name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
      abbreviation: [
        { required: true, message: '请输入分类简称', trigger: 'blur' },
      ],
    };
  },
};
