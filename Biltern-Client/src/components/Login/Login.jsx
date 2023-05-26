import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { setTimedAlert } from '../../features/alertSlice';
import { loginAsync } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Login.module.css';

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [id, setID] = useState('');
    const [password, setPassword] = useState('');

    const idChangeHandler = (event) => { setID(event.target.value); }

    const passwordChangeHandler = (event) => { setPassword(event.target.value); }

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(loginAsync({id, password}));
        setID('');
        setPassword('');
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }
    , [isAuthenticated]);

    const forgotPasswordHandler = (event) => {
        event.preventDefault();
        navigate('/login/forgotpassword');
    }

    return (
        <div className={classes.login_container}>
            <h1>BILTERN</h1>
            <h3>Sign Into Your Account</h3>
            <form action="" onSubmit={submitHandler} className={classes.login_form}>
                <input
                    value={id} 
                    type="text" 
                    id="bilkentid"
                    placeholder="Bilkent ID"
                    onChange={idChangeHandler}
                    className={classes.input}
                />
                <input 
                    value={password}
                    type="password" 
                    id="pass" 
                    placeholder="Password"
                    onChange={passwordChangeHandler}
                    className={classes.input}
                />
                <a href="" className={classes.forgot_password}onClick={forgotPasswordHandler}>Forgot Password?</a>
                <button type='submit' className={classes.submit}>Login</button>
            </form>
        </div>
    );
};

export default Login;
