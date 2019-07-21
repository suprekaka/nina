import React, {memo, useState} from 'react';
import './index.css';
import { Button, Input, Typography, Modal } from 'antd';
import config from '../../config';

const { TextArea } = Input;
const { Title } = Typography;

function getMeta() {
  return localStorage.getItem(config.localStorageKey);
}

function setMeta(value: any) {
  try {
    JSON.parse(value);
    localStorage.setItem(config.localStorageKey, value);
  } catch (e) {
    Modal.error({
      title: '解析数据错误',
      content: '输入的元数据格式不符合 JSON 规范，请检查修复后再试',
    });
  }
}

const Meta: React.FC = () => {
  const [content, setContent] = useState(getMeta());

  return (
    <div className="Meta">
      <Title level={4}>输入元数据</Title>
      <TextArea
        autosize={{
          minRows: 8,
          maxRows: 20,
        }}
        value={content || ''}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <div className="Meta-toolbar">
        <Button
          type="primary"
          onClick={() => {
            setMeta(content);
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default memo(Meta);
