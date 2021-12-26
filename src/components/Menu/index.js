import React from 'react'
import style from './index.css'
import { NavLink } from 'umi'

export default function Menu(props) {
  return (
    <div className={style.menuBox}>
      <ul className={style.list}>
        <li><NavLink exact activeClassName={style.active} to='/'>首页</NavLink></li>
        <li><NavLink exact activeClassName={style.active} to='/students'>查询学生</NavLink></li>
        <li><NavLink exact activeClassName={style.active} to='/students/add'>添加学生</NavLink></li>
      </ul>
    </div>
  )
}
