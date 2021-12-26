import React from 'react'
import style from './index.css'
import Layout from '../components/Layout'
import HeaderNavContainer from '../components/containers/HeaderNavContainer'
import Menu from '../components/Menu'
import PrivateRouter from '@/wrappers/PrivateRouter'

function Index(props) {
  if(props.location.pathname === '/login') {
    return props.children;
  }
  return ( //灵活使用权限路由以管理页面访问权限 PrivateRouter（本质上是一个高阶组件）
    <PrivateRouter>
      <Layout
        header={<HeaderNavContainer/>}
        leftMenu={<Menu/>}
        rightContent={<div className={style.rightContent}>{props.children}</div>}
      />
    </PrivateRouter>
  )
}

export default Index;
