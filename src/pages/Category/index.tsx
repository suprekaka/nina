import React, {memo, useState} from 'react';
import './index.css';
import { Button, Typography, message } from 'antd';
import { readCategoryData, writeCategoryData } from '../../model';
import { ICategoryTree } from '../../typing';
import CodeEditor from '../../components/CodeEditor';

const { Title } = Typography;

const Category: React.FC = () => {
  const categoryTree: ICategoryTree = readCategoryData();
  let categoryStrData: string | undefined;
  if (categoryTree) {
    categoryStrData = JSON.stringify(categoryTree, null, 2);
  }
  const [content, setContent] = useState(categoryStrData);

  return (
    <div className="Category">
      <Title level={4}>输入分类元数据（JSON 格式）</Title>
      <CodeEditor
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
      />
      <div className="Category-toolbar">
        <Button
          type="primary"
          onClick={() => {
            try {
              const obj = JSON.parse(content as string);
              writeCategoryData(obj);
            } catch (e) {
              message.error('填写的 JSON 数据格式错误，请检查后再试');
            }
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default memo(Category);
