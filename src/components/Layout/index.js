import React from 'react'
import style from './index.css'
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

export default function Index(props) {
  return (
    <Layout>
      <Header>{props.header}</Header>
      <Layout className={style.main}>
        <Sider>{props.leftMenu}</Sider>
        <Content style={{overflow: "auto"}}>{props.rightContent}</Content>
      </Layout>
    </Layout>
  )
}
