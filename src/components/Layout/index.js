import React from 'react'
import style from './index.css'

export default function Layout(props) {
  return (
    <>
      <div className={style.header}>{props.header}</div>
      <div className={style.main}>
        <div className={style.leftMenu}>{props.leftMenu}</div>
        <div className={style.rightContent}>{props.rightContent}</div>
      </div>
    </>
  )
}
