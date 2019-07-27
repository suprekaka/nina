import React, { FC } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/monokai';

interface IProps {
  value?: string;
  onChange?: (v: string) => void;
}

const CodeEditor: FC<IProps> = (props) => {
  const {
    value,
    onChange = () => {},
  } = props;

  function handleChange(value: string) {
    onChange(value);
  }

  return (
    <AceEditor
      className="AceEditor"
      placeholder="请输入 JSON 数据"
      mode="json"
      theme="monokai"
      onChange={handleChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      style={{
        width: 'auto'
      }}
    />
  )
};

export default CodeEditor;
