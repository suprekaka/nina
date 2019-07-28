import React, { memo, useState } from 'react';
import { Button, message, PageHeader } from 'antd';
import { readCategoryData, writeCategoryData } from '../../model';
import { ICategoryTree } from '../../typing';
import CodeEditor from '../../components/CodeEditor';
import './index.css';

const Category: React.FC = () => {
  const categoryTree: ICategoryTree = readCategoryData();
  let categoryStrData = JSON.stringify(categoryTree, undefined, 2);
  const [content, setContent] = useState(categoryStrData);

  return (
    <>
      <PageHeader title="分类元数据录入" subTitle="JSON 数据格式" />
      <div className="Category">
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
                if (writeCategoryData(obj)) {
                  message.success('保存成功');
                } else {
                  message.error('保存失败，请重试');
                }
              } catch (e) {
                message.error('填写的 JSON 数据格式错误，请检查后再试');
              }
            }}
          >
            保存
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(Category);
