import React from 'react';
// import { useState,useRef } from 'react' ;
import { useNavigate } from 'react-router-dom';
import '../css/workStyle.css';
const WorkStyle = ({ title, info, routePath }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    function redirect() {
        if (token) {
            navigate(routePath);
        } else {
            window.location.href = '/login'
        }
    }
    return (
        <>
            <div className="card">
                <span className='title-container'>
                    <h3 className="title">{title}</h3>
                    <p className='info'>{info}</p>
                </span>
                <div className="button-box">
                    <button className="card-btn" onClick={redirect}> LET'S GO</button>
                </div>
            </div>
        </>
    );
}
export default WorkStyle