import React from 'react'
import {  Menu } from 'antd';
import {  useNavigate } from 'react-router';


const SideBars = () => {
    const go = useNavigate();
    const items = [
        { label: 'Home', key: '/' }, 
        { label: 'Login', key: '/login' }, 
      ];

    const handleMenuClick = (item) => {
        console.log("key:", item.key);
        go(item.key);
    }

  return (
    <div>
        <Menu onClick={handleMenuClick} theme="light" defaultSelectedKeys={['1']} mode="inline" items={items}/>
    </div>
  )
}

export default SideBars