import React, { useState } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import logo3 from "../assets/logo3.jpg";
import "../css/header.css";
import { FaBars, FaTimes } from "react-icons/fa";
const Header = () => {
  // const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navLinkStyles = ({ isActive }) => {
    return { color: isActive ? "#00ff11" : "white" };
  };
  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')
  const [isMobile, setIsMobile] = useState(false)
  function handleLogin(){
    window.location.href = '/login'
  }
  function handleLogout(){
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  return (
    <>
      <nav className="navbar" style={{backgroundColor:"#ffffff"}}>
        <div className="logo-container">
          <div>
            <NavLink to="/" className="logo">
            <img className="logo" alt="logo"
                src={logo3}
                style={{ width: "50px", borderRadius: "50px" }}
                ></img>

            </NavLink>

          </div>
          {token && (
            <div className="user-title">
              Welcome {userName}
            </div>
          )}
        </div>
        <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'}
          onClick={() => setIsMobile(false)}>
          <NavLink style={navLinkStyles} to="/" className="workstyles">
            <li>WorkStyles</li>
          </NavLink>
          {token && <NavLink style={navLinkStyles} to="/workoutlog" className="logs">
            {/*<li>Logs</li>*/}
          </NavLink>}
          <NavLink style={navLinkStyles} to="/about" className="about">
            <li>About</li>
          </NavLink>
          <NavLink className="signup">
            <li>{token ? (
              <button className="#signup"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <button className="#signup" onClick={handleLogin}>Log In</button>
            )}</li>
          </NavLink>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars "></i>)}
        </button>
      </nav>


    </>
  );
};
export default Header;
