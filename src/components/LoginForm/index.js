import React, {useRef} from 'react'
import style from './index.css'

export default function LoginForm(props) {
  const countRef = useRef();
  const pwdRef = useRef();
  return (
    <div className={style.loginForm}>
      <div className={style.item}>
        <label>账号：<input ref={countRef} type="text" /></label>
      </div>
      <div className={style.item}>
        <label>密码：<input ref={pwdRef} type="password" /></label>
      </div>
      <button className={style.btn}
        onClick={() => {
          const loginId = countRef.current.value;
          const loginPwd = pwdRef.current.value;
          props.onLogin && props.onLogin(loginId, loginPwd);
        }}
      >登录</button>
    </div>
  )
}
