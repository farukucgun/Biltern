import React, { useState } from 'react'
// import { Routes, Route } from "react-router-dom";
import { setTimedAlert } from '../../features/alertSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPasswordAsync } from '../../features/authSlice';

import classes from './ForgotPassword.module.css';

/**
 * @author Faruk Uçgun
 * @date 05.05.2023
 * @abstract: This component is responsible for displaying forgot password page
 */

const ForgotPassword = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setID] = useState('');
    const [email, setEmail] = useState('');

    const idChangeHandler = (event) => { setID(event.target.value); }

    const emailChangeHandler = (event) => { setEmail(event.target.value); }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(id, email);
        dispatch(resetPasswordAsync({id, email}));
        setID('');
        setEmail('');
    }

    const goBackHandler = (event) => {
        event.preventDefault();
        navigate('/login');
    }

    return (
        <div className={classes.forgotPass_container}>
            <h1>BILTERN</h1>
            <h3>Forgot Password</h3>
            <form action="" onSubmit={submitHandler} className={classes.forgotPass_form}>
                <input
                    value={id} 
                    type="text" 
                    id="bilkentid"
                    placeholder="Bilkent ID"
                    onChange={idChangeHandler}
                    className={classes.input}
                />
                <input 
                    value={email}
                    type="text" 
                    id="bilkentemail" 
                    placeholder="Bilkent Email"
                    onChange={emailChangeHandler}
                    className={classes.input}
                />
                <button type='submit' className={classes.submit}>Send Reset Email</button>
                <button className={classes.back} onClick={goBackHandler}>Back</button>
            </form>
        </div>
    );
}

export default ForgotPassword;