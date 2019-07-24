import React, {memo, useState} from 'react';
import './index.css';
import { Button, Menu } from 'antd';

const navList = [
  { key: 'Home', text: 'Home' },
  { key: 'Meta', text: 'Meta' }
];

const Main: React.FC = () => {
  const [selectedNavs, setSelectedNavs] = useState([navList[0].key]);

  return (
    <div className="Main">
      <div className="App-content">
        <Button>xxxx</Button>
      </div>
    </div>
  );
};

export default memo(Main);
