import React from 'react'
import style from './index.css'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';

export default function HeaderNav(props) {
  return (
    <div className={style.navBox}>
      <div className={style.title}>学生管理系统</div>
      <div className={style.info}>
        <div className={style.user}>欢迎您：{props.userName}</div>
        <Button className={style.btn} type='primary' danger
          icon={<LogoutOutlined />}
          onClick={props.onLogout}
        >注销</Button>
      </div>
    </div>
  )
}
