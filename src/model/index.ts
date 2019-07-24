import { message } from 'antd';

const categoryLocalKey = 'category';
const commentLocalKey = 'comment';


function read(key: string) {
  const str: string | null = localStorage.getItem(key);
  if (!str) {
    return;
  }
  let res;
  try {
    res = JSON.parse(str);
  } catch (e) {
    message.error('读取数据错误，请检查本地存储数据错误，或者重新录入数据');
    console.error(e);
  }
  return res;
}

function write(key: string, value: any): boolean {
  try {
    const str = JSON.stringify(value);
    localStorage.setItem(categoryLocalKey, str);
    return true;
  } catch (e) {
    message.error('解析数据错误，输入的元数据格式不符合 JSON 规范，请检查修复后再试');
    console.error(e);
    return false
  }
}

export function readCategoryData() {
  return read(categoryLocalKey);
}

export function writeCategoryData(value: any) {
  return write(categoryLocalKey, value);
}

export function readCommentData() {
  return read(commentLocalKey);
}

export function writeCommentData(value: any) {
  return write(commentLocalKey, value);
}
