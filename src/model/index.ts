import { message } from 'antd';
import { ICategoryTree, ICommentItem, ICommentList } from '../typing';
import categoryExampleData from '../example/category.json';

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
    localStorage.setItem(key, str);
    return true;
  } catch (e) {
    message.error('解析数据错误，输入的元数据格式不符合 JSON 规范，请检查修复后再试');
    console.error(e);
    return false
  }
}

export function readCategoryData(): ICategoryTree {
  let res = read(categoryLocalKey);
  if (!res) {
    writeCategoryData(categoryExampleData);
    res = readCategoryData();
  }
  return res;
}

export function writeCategoryData(value: any) {
  return write(categoryLocalKey, value);
}

export function readCommentData(): ICommentList {
  return read(commentLocalKey);
}

export function writeCommentData(value: any) {
  return write(commentLocalKey, value);
}

export function getCommentByCategoryId(categoryId: number): ICommentItem | undefined {
  const commentList = readCommentData();
  if (!Array.isArray(commentList)) {
    return;
  }
  return commentList.find(comment => comment.categoryId === categoryId);
}

export function updateCommentByCategoryId(categoryId: number, content: string) {
  let commentList = readCommentData();
  if (!Array.isArray(commentList)) {
    commentList = [];
  }
  const comment = {
    categoryId,
    content,
  };
  const index = commentList.findIndex(comment => comment.categoryId === categoryId);
  if (index < 0) {
    // insert
    commentList.push(comment);
  } else {
    // update
    commentList[index] = comment;
  }
  return writeCommentData(commentList);
}
