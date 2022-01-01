import React from 'react'
import style from './index.css'
import { Link, withRouter } from 'umi'
import { Menu } from 'antd';
import { HomeOutlined, MailOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const menuConfig = [
  { key: '/', title: '系统首页', icon: <HomeOutlined /> },
  { 
    key: 'studentManager', title: '学生管理', icon: <MailOutlined />,
    children: [
      {key: '/students', title: '查询学生' },
      {key: '/students/add', title: '添加学生' }
    ]
  }
];

function Index(props) {
  /** 根据menuConfig数组渲染菜单项 */
  function renderMenuItems(menuConfig) {
    return menuConfig.map((item, i) => {
      if(item.children) { //若嵌套有子菜单配置，包裹SubMenu组件后递归渲染
        const subMenu = renderMenuItems(item.children);
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {subMenu}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      );
    });
  }
  const menuItems = renderMenuItems(menuConfig);

  /** 遍历menuConfig数组，匹配Menu组件需要配置的defaultOpenKeys数组 */
  function getDefaultOpenKeys(menuConfig) {
    const openKeys = [];
    for (const item of menuConfig) {
      if(item.children) {
        for (const subItem of item.children) {
          if(subItem.key === props.location.pathname) {
            openKeys.push(item.key);
          }
        }
      }
    }
    return openKeys;
  }
  const openKeys = getDefaultOpenKeys(menuConfig);

  return (
    <Menu theme="dark" mode="inline"
      defaultSelectedKeys={[props.location.pathname]}
      defaultOpenKeys={openKeys}
    >
      {menuItems}
    </Menu>
  )
}

export default withRouter(Index);
