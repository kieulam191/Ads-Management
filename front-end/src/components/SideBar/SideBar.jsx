import {React, useState} from 'react'
import {  Layout, Menu } from 'antd';

import Mapbox from '../Mapbox/Mapbox';
import AdsManage from '../../pages/AdsManage/AdsManage';
import ReportsManage from '../../pages/ReportsManage/ReportsManage';
import EditAds from '../../pages/EditAds/EditAds';

import {
  HomeOutlined,
  UnorderedListOutlined,
  FormOutlined,
} from '@ant-design/icons';

import './sidebar.css'

const {  Content, Sider } = Layout;

function getItem(label, key, path, icon, children) {
  return {key, icon, children, label, path};
}

const SideBars = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [render, setRender] = useState(1);

    const items = [
      getItem('Trang chủ', '1','/', <HomeOutlined />),
      getItem('Quản lý QC', '2','/ads-manage', <UnorderedListOutlined />),
      getItem('Cập nhật QC', '3','/update-ads', <FormOutlined />),
      getItem('Quản lý RP', '4','/reports-manage', <UnorderedListOutlined />),
    ];

    const components = {
      1: <Mapbox />,
      2: <AdsManage />,
      3: <EditAds />,
      4: <ReportsManage />,

    };

    // const handleMenuClick = (item) => {
    //     console.log("key:", item.path); 
    // }

    const handleSelectKey = (item) => {
      setRender(item.key)
    }

  return (
    <div className="side-bar">
        <Layout style={{ minHeight: '100vh',}}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="dark" onSelect={handleSelectKey} defaultSelectedKeys={['1']} mode="inline" items={items}/>
          </Sider>
          <Layout>
            <Content>
              { components[render] }
            </Content>
          </Layout>
        </Layout>
    </div>
  )
}

export default SideBars