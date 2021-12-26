import React from 'react'
import style from './index.css'

export default function HeaderNav(props) {
  return (
    <div className={style.navBox}>
      <div className={style.title}>学生管理系统</div>
      <div className={style.info}>
        <div className={style.user}>
          欢迎您：{props.userName}
        </div>
        <button className={style.btn}
          onClick={props.onLogout}
        >注销</button>
      </div>
    </div>
  )
}
