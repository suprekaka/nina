import React, { FC, memo, useState } from 'react';

interface IProps {
  value?: string
  onChange?: () => void;
}

const ContentEditor: FC<IProps> = (props) => {
  const {
    value,
    onChange = () => {},
  } = props;

  return (
    <div className="ContentEditor">
      <div className="ContentEditor-main" contentEditable />
    </div>
  );
};

export default memo(ContentEditor);
