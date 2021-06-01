import React from 'react';
import classes from './LoginPage.module.css';
import { login } from '../../api/commonApi';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateUserInfo, openModal, closeModal } from '../../store/actions/user';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const LoginPage = (props:any) => {
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const submitHandler = () => {
    props.openModal();
    login(account, password).then((res) => {
      console.log(res)
      props.closeModal();
      if(res.data) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        props.updateUserInfo(res.data.user);
        history.push('/');
      }
    }).catch((err) => {
      console.log(err);
      props.closeModal();
    })
  }
  return (
    <div className={classes.container}>
        <div className={classes.inputContainer}>  
          <input
            type="text"
            className={classes.input}
            value={account}
            placeholder={'Account'}
            onChange={(e) => {
              setAccount(e.target.value)
            }}
          />
          <input
            type="password"
            className={classes.input}
            value={password}
            placeholder={'Password'}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <div className={classes.submitButton} onClick={submitHandler}>
            Log In
          </div>
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserInfo: (value:any) => {
      dispatch(updateUserInfo(value))
    },
    openModal: () => {
      dispatch(openModal())
    },
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);
