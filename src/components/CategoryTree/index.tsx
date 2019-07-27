import React, { FC, memo, useState } from 'react';
import { TreeSelect } from 'antd';
import { ICategoryTree } from '../../typing';
import { TreeNode, TreeSelectProps } from 'antd/lib/tree-select';
import { readCategoryData } from '../../model';

interface IProps {
  dataSource?: ICategoryTree;
  onChange?: TreeSelectProps<any>['onChange'];
}

function parseData(data: ICategoryTree): TreeNode[] {
  if (!data) {
    return [];
  }
  return data.map((node) => {
    const res: TreeNode = {
      title: node.label,
      value: node.id,
      key: node.id,
    };
    if (Array.isArray(node.children)) {
      res.children = parseData(node.children);
    }
    return res;
  })
}

const CategoryTree: FC<IProps> = (props) => {
  const {
    dataSource = readCategoryData(),
    onChange = () => {},
  } = props;
  const [value, setValue] = useState();

  function handleChange(value: number, label: string, extra: any) {
    setValue(value);
    onChange(value, label, extra);
  }

  return (
    <TreeSelect
      showSearch
      treeNodeFilterProp="title"
      placeholder="请选择分类"
      style={{ maxWidth: 600 }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={parseData(dataSource)}
      treeDefaultExpandAll
      onChange={handleChange}
    />
  );
};

export default memo(CategoryTree);
