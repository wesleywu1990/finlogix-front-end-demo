import React from 'react';
import classes from './HomePage.module.css';
import WebinarList from '../../components/WebinarList/WebinarList';
import Introduction from '../../components/Introduction/Introduction';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const HomePage = () => {
  const myRef = React.useRef<any>();
  const executeScroll = () => {
    myRef.current.scrollIntoView()
  }
  return (
    <div style={{width: '100%'}}>
        <div className={classes.introduce}>
          <div className={classes.title}>
            Forex Webinars
          </div>
          <div className={classes.content}>
            Whether you are new to foreign exchange trading or already have some market experience, we believe that a solid FX trading education is vital to your success as a trader.
          </div>
          <div style={{width: '100%'}}>
            <WebinarList scrollToForm={executeScroll}/>
          </div>
          <div style={{width: '100%'}}>
            <Introduction/>
            <RegisterForm formRef={myRef}/>
          </div>
        </div>
    </div>
  );
}

export default HomePage;
