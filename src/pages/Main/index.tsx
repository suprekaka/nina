import React, {memo, useState} from 'react';
import './index.css';
import { Button, Menu } from 'antd';

const navList = [
  { key: 'Home', text: 'Home' },
  { key: 'Meta', text: 'Meta' }
];

const App: React.FC = () => {
  const [selectedNavs, setSelectedNavs] = useState([navList[0].key]);

  function renderContent() {
    switch (selectedNavs[0]) {
      default:
      case 'Home': {
        return 
      }
      case 'Meta': {

      }
    }
  }
  return (
    <div className="App">
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={selectedNavs}
        onSelect={({item, key, keyPath}) => {
          setSelectedNavs(keyPath);
        }}
      >
        {
          navList.map((nav) => (
            <Menu.Item key={nav.key}>{nav.text}</Menu.Item>
          ))
        }
      </Menu>
      <div className="App-content">
        <Button>xxxx</Button>
      </div>
    </div>
  );
};

export default memo(App);
