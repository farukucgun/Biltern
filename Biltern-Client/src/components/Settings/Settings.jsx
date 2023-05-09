import React from 'react';
import { setTimedAlert } from '../../features/alertSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 */

const Settings = () => {

    const navigate = useNavigate();

    const token = useSelector(state => state.auth.token);

    const changePasswordHandler = (event) => {
        event.preventDefault();
        navigate(`/changepassword/${token}`);
    }
    return (
        <div>
            <h1>Settings</h1>           
            <button onClick={changePasswordHandler}>Change Password</button>
        </div>
    );
}

export default Settings;