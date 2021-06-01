import React from 'react';
import classes from './Introduction.module.css';

const Introduction = () => {
  const observe = React.useRef<any>();

  return(
    <div className={classes.container}>
      <div className={classes.introduction}>
        <div className={classes.textFields}>
          <div className={classes.title}>
            Meet Your Host - Alistair Schultz
          </div>
          <div className={classes.content}>
            <p>
            With more than 15 years of experience covering both the FX and CFD markets, Alistair has extensive knowledge covering algorithmic trading, market analysis & an impressive educational background.
            </p>
            <p>
            As the author of ‘Essentials for Trading Students – An Overview of the Basics for Aspiring Traders’, which was released in 2017, Alistair will take any aspiring trader from the basics right through to advanced analytics used in institutional funds.
            </p>
            <p>
            At the core of Alistair’s teachings is the ability to help each trader uncover their ‘Trading DNA', helping them flourish with the skills and timeframes that work best for them.
            </p>
          </div>
          <div className={classes.more}>
            See more
          </div>
        </div>
        <div className={classes.videoContainer}>
          <iframe src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" className={classes.video}></iframe>
        </div>
      </div>
      
    </div>
  )
}

export default Introduction;
