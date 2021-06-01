import React from 'react';
import classes from './Header.module.css';
import Logo from '../../images/Logo.png';
import Dropdown from '../Dropdown/Dropdown';
import { useHistory } from "react-router-dom";
import { logout } from '../../api/commonApi';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
import { updateUserInfo } from '../../store/actions/user';

const Header = (props:any) => {
  const history = useHistory();
  const loginHandler = () => {
    history.push('/login');
  }
  const logoutHandler = () => {
    logout().then((res) => {
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem("token");
      props.updateUserInfo({});
      alert('Logout');
    })
  }
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <div className={classes.drawerToggle}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <img src={Logo} className={classes.logo} />
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.dropdownContainer}>
          <Dropdown text='Why ACY'/>
          <Dropdown text='Products'/>
          <Dropdown text='Platforms'/>
          <Dropdown text='Education'/>
          <Dropdown text='Partners'/>
        </div>
        <div className={classes.loginContainer}>
          {
            props.info.id
            ?(
              <div className={classes.logout} onClick={logoutHandler}>
                Logout
              </div>
            )
            :(
              <div className={classes.login} onClick={loginHandler}>
                Login
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state:any) => {
  return {
    info: state.user.info,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserInfo: (value:any) => {
      dispatch(updateUserInfo(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
