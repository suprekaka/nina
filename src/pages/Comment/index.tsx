import React, { PureComponent } from 'react';
import './index.css';
import { Button, Typography, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CategoryTree from '../../components/CategoryTree';
import ContentEditor from '../../components/ContentEditor';

import { readCategoryData  } from '../../model';

const { Title } = Typography;

interface IProps extends FormComponentProps {}

class Comment extends PureComponent<IProps> {
  private handleSave = () => {
    const {
      validateFields,
    } = this.props.form;
    validateFields();
  };

  render() {
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;
    const categoryData = readCategoryData();
    return (
      <div className="Comment">
        <Title level={4}>输入评语内容</Title>

        <Form>
          <Form.Item label="分类">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <CategoryTree dataSource={categoryData} />
            )}
          </Form.Item>
          <Form.Item label="评语内容">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请填写' }],
            })(
              <ContentEditor />
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
