export interface ICategoryItem {
  id: number;
  label: string;
  children?: ICategoryTree;
}

export type ICategoryTree = ICategoryItem[];
