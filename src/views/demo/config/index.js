import { manage } from './definition';
const fileType = {
  pdf: require('@/assets/norm/pdf.png'),
  doc: require('@/assets/norm/doc.png'),
  excel: require('@/assets/norm/excel.png'),
  ppt: require('@/assets/norm/ppt.png'),
  txt: require('@/assets/norm/txt.png'),
  file: require('@/assets/norm/file.png'),
};
const dialogStatus = ['新增', '编辑', '详情'];
export { manage, fileType, dialogStatus };
