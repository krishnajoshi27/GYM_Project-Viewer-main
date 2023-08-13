import React from "react";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../css/tabata.css";

import shortBeep from "../assets/short-beep.mp3";
import longBeep from "../assets/long-beep.mp3";
import workoutCompleted from "../assets/workoutCompleted.mp3";

const TabataTimer = () => {
  const { user } = useAuth0();

  let [numberOfSeconds, setNumberOfSeconds] = useState(0);
  let [numberOfSecondsToDb, setNumberOfSecondsToDb] = useState(0);
  let [numberMinutes, setNumberMinutes] = useState(0);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [restTime, setRestTime] = useState(0);
  let [leadTime, setleadTime] = useState(10);
  let [second, setSecond] = useState(0);
  let [minute, setMinute] = useState(0);
  let [flag, setFlag] = useState(true);
  let [countNumberOfRounds, setCountNumberOfRounds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [myalert, setmyAlert] = useState(false);
  const [hideContiner, setHideContiner] = useState(true);
  let loadTimeValue = leadTime;
  let timer = null;
  const leadTimeHeading = document.getElementById("leadTime");
  const [showOtherButtons, setShowOtherButtons] = useState(false);

  useEffect(() => {
    timer = isRunning ? setInterval(calculateTime, 1000) : null;
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    if (Number(numberOfSeconds) === 0 || Number(numberOfRounds)===0) {
      alert("Plz Enter WorkOut Time and Rounds");
    } else {
      if(flag){
        countNumberOfRounds++
        setCountNumberOfRounds(countNumberOfRounds)
        setFlag(false)
      }
      setShowOtherButtons(true);
      leadTimeHeading.style.color = "white";
  
      numberMinutes = Math.floor(Number(numberOfSeconds) / 60);
      minute = numberMinutes;
      setMinute(minute);
      setNumberMinutes(numberMinutes);
      second = numberOfSeconds - minute * 60;
      numberOfSecondsToDb = second;
      setNumberOfSecondsToDb(numberOfSecondsToDb);
      setSecond(second);
      setNumberOfSeconds(numberOfSeconds);
      openModal();
      setIsRunning(true);
    }
  };
  const workoutCompletedFun = () => {
    const audio = new Audio(workoutCompleted);
    audio.play();
  };
  const playShortSound = () => {
    const audio = new Audio(shortBeep);
    audio.play();
  };
  const playLongSound = () => {
    const audio = new Audio(longBeep);
    audio.play();
  };
  function getFormattedDate() {
    let date = Date().split(" ");
    let res = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`;
    return res;
  }
  async function saveLogsToDB() {
    let obj = {
      userName: user.nickname,
      workoutName: "TABATA Timer",
      numberOfRounds: numberOfRounds,
      duration:
        numberMinutes +
        ":" +
        (numberOfSecondsToDb < 10
          ? "0" + numberOfSecondsToDb
          : numberOfSecondsToDb),
      created: getFormattedDate(),
    };
    let response = await axios.post("http://localhost:8080/workout", obj);
    console.log("resp", response);
  }
  const calculateTime = async () => {
    if (loadTimeValue === 0) {
      closeModel();
      second = second !== 0 ? second - 1 : 60;
      setSecond(second);
      minute = second === 0 ? minute - 1 : minute;
      setMinute(minute);
      if (minute < 0) {
        countNumberOfRounds++;
        setCountNumberOfRounds(countNumberOfRounds);
        if (countNumberOfRounds === (Number(numberOfRounds)+1)) {
          console.log("workout compledted");
          setmyAlert(true);
          setHideContiner(false);

          workoutCompletedFun();
          second = 0;
          minute = 0;
          setSecond(second);
          setMinute(minute);
          setIsRunning(false);
          resetTimer();

          await saveLogsToDB();
          setShowOtherButtons(false);
        } else {
          loadTimeValue = restTime;
          setleadTime(loadTimeValue);
          startTimer();
        }
      }
    } else {
      if (loadTimeValue < 5) {
        leadTimeHeading.style.color = "red";
      }
      if (loadTimeValue < 3) {
        playLongSound();
      } else if (loadTimeValue < 6) {
        playShortSound();
      }
      loadTimeValue -= 1;
      setleadTime(loadTimeValue);
    }
  };
  function pauseTimer() {
    setIsRunning(!isRunning);
  }
  function resetTimer() {
    setNumberOfSeconds(0);
    setNumberMinutes(0);
    setCountNumberOfRounds(0);

    setSecond(0);
    setRestTime(0);
    setMinute(0);
    setleadTime(10);
    leadTimeHeading.style.color = "white";

    setIsRunning(false);
    clearInterval(timer);
  }

  function openModal() {
    const modelDiv = document.getElementById("myModal");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }
  function closeModel() {
    const modelDiv = document.getElementById("myModal");

    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }
  function closeAlert() {
    // myalert = false
    setmyAlert(false);
    setHideContiner(true);
    // setShowOtherButtons(true)
  }
  return (
    <>
      {hideContiner && (
        <>
          <div className="tabata-container" id="tabata-container">
            <h1 className="tabata-heading">TABATA Timer </h1>

            {!showOtherButtons && (
              <>
                <div className="tabata-form">
                  <form>
                    <label className="label">FOR</label>
                    <input
                      type="number"
                      value={numberOfRounds}
                      onChange={(e) => setNumberOfRounds(e.target.value)}
                    />
                    <label className="label">ROUNDS</label>
                    <br />
                    <label className="label">WORK</label>
                    <input
                      type="number"
                      value={numberOfSeconds}
                      onChange={(e) => setNumberOfSeconds(e.target.value)}
                    />
                    <label className="label">SECONDS</label>
                    <br />
                    <label className="label">REST</label>
                    <input
                      type="number"
                      value={restTime}
                      onChange={(e) => setRestTime(e.target.value)}
                    />
                    <label className="label">SECONDS</label>
                  </form>
                </div>
              </>
            )}

            <div className="tabata-wrapper">
              <p>
                <span
                  className="rounds"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    padding: "0px 20px",
                  }}
                >
                  {countNumberOfRounds}
                </span>
                <span className="mins">
                  {minute < 10 ? "0" + minute : minute}
                </span>
                :
                <span className="seconds">
                  {second < 10 ? "0" + second : second}
                </span>
              </p>
              <br />
              <div id="tabata-button">
                <button onClick={startTimer} className="btn-start">
                  Start
                </button>
                {showOtherButtons && (
                  <>
                    <button onClick={pauseTimer} className="btn-stop">
                      {isRunning ? "Pause" : "Resume"}
                    </button>
                    <button onClick={resetTimer} className="btn-reset">
                      Reset
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {myalert && (
        <>
          <div
            id="custom-alert"
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <h4 className="alert-heading">Good Job! WorkOut completed</h4>
            <p>Your Logs Are Stored</p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={closeAlert}
            ></button>
          </div>
        </>
      )}

      <div className="modal" id="myModal">
        <div className="modal-dialog modal-fullscreen">
          <div id="modal-content">
            {/* <div className="modal-header"> <h4 className="modal-title">Prepare your stuff. Get Ready</h4> </div> */}
            <div id="modal-body">
              <h1 id="leadTime">{leadTime}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabataTimer;
