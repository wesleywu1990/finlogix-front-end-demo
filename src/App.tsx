import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import HomePage from './containers/HomePage/HomePage';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import FavoritePostPage from './containers/FavoritePostPage/FavoritePostPage';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateUserInfo } from './store/actions/user';
import { getUserInfo } from './api/commonApi';
import axios from 'axios';

import './App.css';

function App(props:any) {
  React.useEffect(() => {
    if(localStorage.getItem('token')){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      getUserInfo().then((res) => {
        props.updateUserInfo(res?.data.user);
      })
    }
  }, [])
  return (
    <div style={{width: '100%'}}>
      <Header/>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/registered" exact component={FavoritePostPage}/>
      </Switch>
      <Loading/>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserInfo: (value:any) => {
      dispatch(updateUserInfo(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
