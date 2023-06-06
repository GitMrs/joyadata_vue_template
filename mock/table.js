/**
 * 列表实例
 */
import Mock from 'mockjs';
const prefix = '/dedp/v1';
const data = Mock.mock({
  'items|10': [
    {
      id: '@id',
      label: '@cparagraph(10, 20)', // cname 中文 cparagraph
      'status|1': ['published', 'draft', 'deleted'],
      author: 'cname(2,3)',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)',
    },
  ],
});

export default [
  {
    url: `${prefix}/xxx`,
    type: 'get',
    response: config => {
      const items = data.items;
      return {
        code: 0,
        message: '成功',
        result: items,
        total: items.length,
      };
    },
  },
];
