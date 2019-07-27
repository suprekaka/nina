import React, { FC, memo, useState } from 'react';
import './index.css';
import { PageHeader, Button, Card, Icon, message, Divider } from 'antd';
import CategoryTree from '../../components/CategoryTree';
import { getCommentByCategoryId } from '../../model';
import { ICommentItem } from '../../typing';
import copyToClipboard from 'copy-to-clipboard';

const Main: FC = () => {
  const [commentContent, setCommentContent] = useState();

  function handleCategoryChange(id: number) {
    const comment: ICommentItem | void = getCommentByCategoryId(id);
    const { content } = comment || { content: '' };
    setCommentContent(content);
    copy();
  }

  function copy() {
    if (commentContent) {
      const res = copyToClipboard(commentContent, {
        debug: true,
        format: 'text/html',
      });
      if (res) {
        message.success('已经复制到剪贴板');
      }
    } else {
      message.error('没有可复制的内容');
    }
  }

  function handleCopyBtnClick() {
    copy();
  }

  return (
    <>
      <PageHeader
        title="主页"
      />

      <div className="Main">
        <div>
          <CategoryTree placeholder="请选择分类" onChange={handleCategoryChange} />
        </div>
        <Button
          className="Main-copyBtn"
          type="primary"
          onClick={handleCopyBtnClick}
        >
          <Icon type="copy" />
          复制到剪贴板
        </Button>

        <div className="Main-previewWrapper">
          <Divider>预览</Divider>
          <Card>
            <div
              className="Main-preview"
              dangerouslySetInnerHTML={{
                __html: commentContent
              }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default memo(Main);
