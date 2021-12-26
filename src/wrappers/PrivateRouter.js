import React from 'react'
import { connect, history } from 'umi'

function PrivateRouter(props) {
  if(props.loginId) {
    return props.children;
  }else {
    props.onNoLogin && props.onNoLogin();
    return null;
  }
}

const mapStateToProps = state => ({
  loginId: state.loginUser
});
const mapDispatchToProps = dispatch => ({
  onNoLogin() {
    history.push('/login');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouter);
