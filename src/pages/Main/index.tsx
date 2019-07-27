import React, { FC, memo, useState } from 'react';
import './index.css';
import { Button } from 'antd';
import CategoryTree from '../../components/CategoryTree';
import {getCommentByCategoryId} from "../../model";
import {ICommentItem} from "../../typing";

const Main: FC = () => {
  const [comment, setComment] = useState();

  function handleCategoryChange(id: number) {
    const comment: ICommentItem | void = getCommentByCategoryId(id);
    setComment(comment);
  }
  
  function handleCopy() {
    
  }

  return (
    <div className="Main">
      <CategoryTree onChange={handleCategoryChange} />
      <div
        dangerouslySetInnerHTML={{
          __html: comment && comment.content
        }}
      />
      <Button onChange={handleCopy}>复制</Button>
    </div>
  );
};

export default memo(Main);
