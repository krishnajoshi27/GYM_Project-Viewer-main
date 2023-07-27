import React, { useEffect } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
const Protected = (props) => {
    const { Component } = props;
    // const { loginWithRedirect, isAuthenticated } = useAuth0();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            window.location.href = '/login'
        }
    })
    return (<div> <Component /> </div>)
}
export default Protected