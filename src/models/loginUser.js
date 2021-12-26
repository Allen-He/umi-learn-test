const LOGINUSER_KEY = 'loginId';

export default {
  state: null, //默认为null，表示没有用户登录
  reducers: {
    setLoginUser(state, { payload }) {
      return payload; //通过payload传递loginId
    }
  },
  effects: {
    *login({ payload }, { put }) {
      const { loginId, loginPwd } = payload;
      if (loginId === 'admin' && loginPwd === '123456') { //登录成功
        yield put({ type: "setLoginUser", payload: loginId });
        localStorage.setItem(LOGINUSER_KEY, loginId);
        return true;
      }
      return false; // 登录失败
    },
    *logout(action, { put }) {
      yield put({ type: 'setLoginUser', payload: null });
      localStorage.removeItem(LOGINUSER_KEY);
    }
  },
  subscriptions: {
    syncLocalStorage({dispatch, history}) {
      const loginId = localStorage.getItem(LOGINUSER_KEY);
      if(loginId) { //若存在，则证明当前已登录，需要用其初始化对应状态
        dispatch({ type: "setLoginUser", payload: loginId });
      }
    }
  }
}
