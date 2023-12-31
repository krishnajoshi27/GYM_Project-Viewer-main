import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import shortBeep from "../assets/short-beep.mp3";
import longBeep from "../assets/long-beep.mp3";
import workoutCompleted from "../assets/workoutCompleted.mp3";

const ArmapTimer = () => {
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const [workoutTime, setWorkoutTime] = useState("");
  const [leadTime, setleadTime] = useState(10);
  let [second, setSecond] = useState(0);
  let [minute, setMinute] = useState(0);
  let [numberOfRounds, setNumberOfRounds] = useState(0);
  const [myalert, setmyAlert] = useState(false);
  const [hideContiner, setHideContiner] = useState(true);

  let [flag, setFlag] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  let loadTimeValue = leadTime;
  const leadTimeHeading = document.getElementById("leadTime");
  let timer = null;
  const [showOtherButtons, setShowOtherButtons] = useState(false);

  useEffect(() => {
    timer = isRunning ? setInterval(calculateTime, 1000) : null;
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    if (Number(workoutTime) === 0) {
      alert("Plz Enter WorkOut Time");
    } else {
      setShowOtherButtons(true);
      setMinute(Number(workoutTime));
      setSecond(0);
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
      userId: userId,
      userName: userName,
      workoutName: "ARMAP Timer",
      duration: workoutTime,
      created: getFormattedDate(),
    };
    let response = await axios.post("http://localhost:8080/workout", obj);
    console.log("resp", response);
  }
  const calculateTime = async () => {
    if (loadTimeValue === 0) {
      closeModel();
      if (flag) {
        second = 60;
        setSecond(60);
        minute = minute - 1;
        setMinute(minute);
        flag = false;
        setFlag(false);
      }
      second = second !== 0 ? second - 1 : 0;
      minute = second === 0 ? minute - 1 : minute;
      setSecond(second);
      setMinute(minute);
      if (minute < 0) {
        console.log("workout completed");
        setmyAlert(true);
        setHideContiner(false);

        workoutCompletedFun();

        numberOfRounds++;
        setNumberOfRounds(numberOfRounds);
        console.log("#ofRounds", numberOfRounds);
        second = 0;
        minute = 0;
        setSecond(second);
        setMinute(minute);
        setFlag(true);
        leadTimeHeading.style.color = "white";
        resetTimer();

        await saveLogsToDB();
        setIsRunning(false);
        setShowOtherButtons(false);
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
    setSecond(0);
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
          <div className="container" id="container">
            <h1 className="heading">ARMAP Timer </h1>

            {!showOtherButtons && (
              <>
                <div className="form">
                  <form>
                    <label className="label">FOR</label>
                    <input
                      type="number"
                      value={workoutTime}
                      onChange={(e) => setWorkoutTime(e.target.value)}
                    />
                    <label className="label">MINUTES</label>
                  </form>
                </div>
              </>
            )}

            <div className="wrapper">
              <p>
                <span className="mins">
                  {minute < 10 ? "0" + minute : minute}
                </span>
                :
                <span className="seconds">
                  {second < 10 ? "0" + second : second}
                </span>
              </p>
              <br />
              <div id="button">
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
export default ArmapTimer;
