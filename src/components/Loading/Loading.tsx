import React from 'react';
import classes from './Loading.module.css';
import { connect } from 'react-redux';

const Loading = (props:{active:boolean}) => {
  const renderLoading = () => {
    return(
      <div className={classes.container}>
        Loading
      </div>
    )
  }
  return (
    <>
      {
        props.active
        ?renderLoading()
        :<></>
      }
      
    </>
  );
}

const mapStateToProps = (state:any) => {
    return {
        active: state.user.modalActive,
    }
}

export default connect(mapStateToProps)(Loading);
