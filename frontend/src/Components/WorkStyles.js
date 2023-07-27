import React from 'react';
import WorkStyle from './WorkStyle';
import '../css/workStyles.css';
// import { Outlet } from 'react-router-dom' ;
import bgVideo from '../assets/bg-video.mp4';

const WorkStyles = () => {
  let basicTimerInfo = 'Challenge yourself with our Basic for Time workouts. Set the timer, give it your all, and see how fast you can complete a series of intense exercises.';
  let armapInfo = 'Experience As Many Rounds As Possible in a set time frame with our AMRAP workout .Push yourself to the limit, and achieve new levels of strength and fitness.';
  let amomTimerInfo = 'Get ready for efficient and effective workouts with our EMOM training. Every Minute on the Minute, you will perform exercises that will push your limits and improve your overall fitness. ';
  let tabataTimerInfo = 'Ignite your metabolism with our TABATA workouts, a scientifically proven high-intensity interval training method that will challenge your cardiovascular system and improve your strength. '
  return (
    <>
      <div className="grid-workStyles">
        <div className="grid-style">
          <WorkStyle
            title="Basic Timer"
            info={basicTimerInfo}
            routePath="/basic" />
        </div>
        <div className="grid-style">
          <WorkStyle
            title="ARMAP Timer"
            info={armapInfo}
            routePath="/armap" />
        </div>
        <div className="grid-style">
          <WorkStyle
            title="EMOM Timer"
            info={amomTimerInfo}
            routePath="/emom" />
        </div>
        <div className="grid-style">
          <WorkStyle
            title="TABATA Timer"
            info={tabataTimerInfo}
            routePath="/tabata" />
        </div>
      </div>
      <video autoPlay muted loop id="myVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>
    </>
  );
}
export default WorkStyles