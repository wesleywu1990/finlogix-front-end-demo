import React from 'react';
import classes from './Dropdown.module.css';
import ArrowDown from '../../images/ArrowDown.png';

const Dropdown = (props: { text: string }) => {
  return (
    <div className={classes.container}>
      {props.text}
      <img src={ArrowDown} className={classes.arrowDown} />
    </div>
  );
}

export default Dropdown;
