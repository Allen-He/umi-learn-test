import LoginForm from '../LoginForm'
import { connect, history } from 'umi'

const mapDispatchToProps = dispatch => ({
  async onLogin(loginId, loginPwd) {
    const success = await dispatch({
      type: 'loginUser/login',
      payload: { loginId, loginPwd }
    });
    if(success) { //登录成功，默认跳转到首页
      history.push('/');
    }else { //登录失败
      window.alert('账号或密码有误，请重新输入！')
    }
  }
});

export default connect(null, mapDispatchToProps)(LoginForm);
