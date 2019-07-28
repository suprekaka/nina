import React, { FC, memo, useState } from 'react';
import './index.css';
import { PageHeader, Button, Card, Icon, message, Divider, Result } from 'antd';
import CategoryTree from '../../components/CategoryTree';
import { getCommentByCategoryId } from '../../model';
import { ICommentItem } from '../../typing';
import copyToClipboard from 'copy-to-clipboard';

const Main: FC = () => {
  const [commentContent, setCommentContent] = useState();

  function handleCategoryChange(id: number) {
    const comment: ICommentItem | undefined = getCommentByCategoryId(id);
    if (comment) {
      setCommentContent(comment.content);
      copy(comment.content);
    } else {
      setCommentContent(undefined);
    }
  }

  function copy(content: string) {
    if (content) {
      const res = copyToClipboard(content, {
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
    copy(commentContent);
  }

  function renderPreviewContent() {
    const shouldShowPreview = !!commentContent;
    if (!shouldShowPreview) {
      return (
        <Result
          status="info"
          title="没有数据可预览"
        />
      )
    }
    return (
      <div
        className="Main-preview"
        dangerouslySetInnerHTML={{
          __html: commentContent
        }}
      />
    );
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
            {renderPreviewContent()}
          </Card>
        </div>
      </div>
    </>
  );
};

export default memo(Main);
