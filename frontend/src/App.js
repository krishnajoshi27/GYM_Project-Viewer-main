import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import BasicTimer from "./Components/BasicTimer";
import ArmapTimer from "./Components/ArmapTimer";
import WorkStyles from "./Components/WorkStyles";
import TabataTimer from "./Components/TabataTimer";
import Protected from "./Components/Protected";
//import WorkoutLog from "./Components/WorkoutLog";
import EmomTimer from './Components/EmomTimer'
import SingUp from './auth/SignUp'
import Login from './auth/Login'
import EmailVerify from './auth/EmailVerify'
import ForgetPassword from './auth/ForgetPassword'
import AdminLogin from "./auth/AdminLogin";
import AdminHome from "./Components/AdminHome";
//import { AdminLogin } from "./auth/AdminLogin";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<WorkStyles />}></Route>
        <Route path="signup" element={<SingUp/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="admin" element={<AdminLogin/>}></Route>
        <Route path="adminhome" element={<AdminHome/>}></Route>
        <Route path="forgetpassword" element={<ForgetPassword/>}></Route>
        <Route path="user/:id/verify/:token" element={<EmailVerify />} />

        {/* <Route path="workoutlog" element={<WorkoutLog />}></Route> */}
        <Route
          path="basic"
          element={<Protected Component={BasicTimer} />}
        ></Route>
        <Route
          path="armap"
          element={<Protected Component={ArmapTimer} />}
        ></Route>
        <Route
          path="tabata"
          element={<Protected Component={TabataTimer} />}
        ></Route>
        <Route
          path="emom"
          element={<Protected Component={EmomTimer} />}
        ></Route>

      </Routes>
    </div>
  );
}
export default App;
