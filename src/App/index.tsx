import React, {memo, useState} from 'react';
import './index.css';
import { Menu, Icon } from 'antd';
import Main from '../pages/Main';
import Comment from '../pages/Comment';
import Category from '../pages/Category';

const { SubMenu } = Menu;

const defaultNavKeys = 'Home';

const App: React.FC = () => {
  const [selectedNav, selectNav] = useState(defaultNavKeys);

  function renderContent() {
    switch (selectedNav) {
      case 'Home': {
        return <Main />
      }
      case 'Comment': {
        return <Comment />
      }
      case 'Category': {
        return <Category />
      }
    }
  }
  return (
    <div className="App">
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[selectedNav]}
        onClick={(e) => {
          selectNav(e.key);
        }}
      >
        <Menu.Item key="Home">
          <Icon type="home" />
          Home
        </Menu.Item>
        <SubMenu
          key="Meta"
          title={(
            <>
              <Icon type="tool" />
              <span>Meta</span>
            </>
          )}
        >
          <Menu.Item key="Comment">评语</Menu.Item>
          <Menu.Item key="Category">分类</Menu.Item>
        </SubMenu>
      </Menu>
      <div className="App-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default memo(App);
