/**
 * 列表实例
 */
import Mock from 'mockjs';
const prefix = '/dedp/v1';
// const data = Mock.mock({
//   'items|10': [
//     {
//       id: '@id',
//       label: '@cparagraph(10, 20)', // cname 中文 cparagraph
//       'status|1': ['published', 'draft', 'deleted'],
//       author: 'cname(2,3)',
//       display_time: '@datetime',
//       pageviews: '@integer(300, 5000)',
//     },
//   ],
// });
const data = [];
export default [
  {
    url: `${prefix}/xxx`,
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: '成功',
        result: data,
        total: data.length,
      };
      // const items = data.items;
      // return {
      //   code: 0,
      //   message: '成功',
      //   result: items,
      //   total: items.length,
      // };
    },
  },
  {
    url: `${prefix}/xxx`,
    type: 'post',
    response: config => {
      const item = config.body;
      data.push({
        ...item,
        id: new Date().getTime(),
      });
      return {
        code: 0,
        message: '成功',
        result: item,
      };
      // return {
      //   code: 0,
      //   message: '成功',
      //   result: items,
      // };
    },
  },
  {
    url: `${prefix}/xxx`,
    type: 'put',
    response: config => {
      const item = config.body;
      data.forEach((_item, index) => {
        if (_item.id === item.id) {
          data[index] = item;
        }
      });
      return {
        code: 0,
        message: '成功',
        result: item,
      };
    },
  },
  {
    url: `${prefix}/xxx`,
    type: 'delete',
    response: config => {
      const id = config.url.split('/').slice(-1)[0] * 1;
      data.forEach((_item, index) => {
        if (_item.id === id) {
          data.splice(index, 1);
        }
      });
      return {
        code: 0,
        message: '成功',
      };
    },
  },
];
