import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { loadUser, logout } from './features/authSlice';
import setAuthToken from './utils/setAuthToken';
import { setTimedAlert } from './features/alertSlice';
import compRouter from './utils/compRouter'; 
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import ChangePassword from './components/Login/ChangePassword';
import Alert from './UI/Alert';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';
import UploadedFiles from './components/UploadedFiles/UploadedFiles';
import CurrentStatus from './components/CurrentStatus/CurrentStatus';

import './App.css';

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        dispatch(logout());
        navigate('/login');
        dispatch(setTimedAlert({msg: 'Session expired. Please login again.', alertType: 'warning'}));
      }
    });
  }, [dispatch, navigate, isAuthenticated]);

  // const PrivateRoute = compRouter(true, Dashboard, '/login');

  return (
    <div>
      <Alert />
      <div className='nav'>
        <Navbar />
      </div>
      <main className='pages'>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<h1>Home!</h1>}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/forgotpassword" element={<ForgotPassword />}/>
            <Route path="/changepassword/:resetToken" element={<ChangePassword />}/>
            <Route path="/uploadedfiles" element={<UploadedFiles />}/>
            <Route path="/currentstatus" element={<CurrentStatus />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="*" element={<h1>Not Found!</h1>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
