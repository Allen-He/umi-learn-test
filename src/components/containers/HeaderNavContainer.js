import HeaderNav from '../HeaderNav'
import { connect, history } from 'umi'

const mapStateToProps = state => ({
  userName: state.loginUser
});
const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch({ type: 'loginUser/logout' });
    history.push('/login');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
