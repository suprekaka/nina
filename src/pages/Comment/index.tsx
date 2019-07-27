import React, { PureComponent } from 'react';
import './index.css';
import { Button, Typography, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CategoryTree from '../../components/CategoryTree';
import {
  updateCommentByCategoryId,
  getCommentByCategoryId,
} from '../../model';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';


const { Title } = Typography;

interface IProps extends FormComponentProps {}

class Comment extends PureComponent<IProps> {
  private handleCategoryChange = (id: number) => {
    const {
      setFieldsValue,
    } = this.props.form;
    const comment = getCommentByCategoryId(id);
    setFieldsValue({
      comment: BraftEditor.createEditorState(comment && comment.content),
    });
  };

  private handleSave = () => {
    const {
      validateFields,
      resetFields,
    } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      updateCommentByCategoryId(values.category, values.comment);
      resetFields();
    });
  };

  render() {
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;
    return (
      <div className="Comment">
        <Title level={4}>输入评语内容</Title>

        <Form>
          <Form.Item label="分类">
            {getFieldDecorator('category', {
              rules: [{
                required: true,
                message: '请选择分类',
              }],
            })(
              <CategoryTree onChange={this.handleCategoryChange} />
            )}
          </Form.Item>

          <Form.Item label="评语内容">
            {getFieldDecorator('comment', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请填写评语内容')
                  } else {
                    callback()
                  }
                }
              }],
            })(
              <BraftEditor
                className="Comment-editor"
                placeholder="请输入正文内容"
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={this.handleSave}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default Form.create({})(Comment);
