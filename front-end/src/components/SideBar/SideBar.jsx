import {React, useState} from 'react'
import {  Menu } from 'antd';
import {  useNavigate } from 'react-router';

import './sidebar.css'

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
    <div className="side-bar">
        <Menu theme="dark" onClick={handleMenuClick} defaultSelectedKeys={['1']} mode="inline" items={items}/>
    </div>
  )
}

export default SideBars