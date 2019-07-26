export interface ICategoryItem {
  id: number;
  label: string;
  children?: ICategoryTree;
}

export type ICategoryTree = ICategoryItem[];

export interface ICommentItem {
  categoryId: number;
  content: string;
}

export type ICommentList = ICommentItem[];
