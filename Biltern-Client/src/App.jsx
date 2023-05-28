import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { loadUser, logout } from './features/authSlice';
import { setTimedAlert } from './features/alertSlice';
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import ChangePassword from './components/Settings/ChangePassword';
import NewPassword from './components/Login/NewPassword';
import Alert from './UI/Alert';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';
import UploadedFiles from './components/UploadedFiles/UploadedFiles';
import CurrentStatus from './components/CurrentStatus/CurrentStatus';
import SemesterInitialization from './components/SemesterInitialization/SemesterInitialization';
import RoleAssignment from './components/RoleAssignment/RoleAssignment';
import PrivateRoute from './routing/PrivateRoute';
import NotFound from './UI/NotFound';
import Landing from './components/Landing/Landing';
import Notifications from './components/Notifications/Notifications';
import GradingFormPage from "./components/GradingFormPage/GradingFormPage";
import DisplayFilePage from './components/DisplayFilePage/DisplayFilePage';
import RegisterUser from './components/RoleAssignment/RegisterUser';

import './App.css';

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 * @todo: refresh leads to dashboard page, it shouldn't
 * @todo: keep user login date + 1 hour in the local storege and check if it is expired (1 hour)
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
        dispatch(setTimedAlert({msg: 'Session expired. Please login again.', alertType: 'warning', timeout: 4000}));
      }
    });
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <div>
      <Alert />
      {isAuthenticated && <Notifications />}
      <div className='nav'>
        <Navbar />
      </div>
      <main className='pages'>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/login/forgotpassword" element={<ForgotPassword />}/>
            <Route path="/login/newpassword" element={<NewPassword />}/>
            <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />}/>}/>   
            <Route path="/uploadedfiles" element={<PrivateRoute component={<UploadedFiles />}/>}/>
            <Route path="/currentstatus" element={<PrivateRoute component={<CurrentStatus />}/>}/>
            <Route path="/semesterinitialization" element={<PrivateRoute component={<SemesterInitialization />}/>}/>
            <Route path="/roleassignment" element={<PrivateRoute component={<RoleAssignment />}/>}/>
            <Route path="/registeruser" element={<PrivateRoute component={<RegisterUser />}/>}/>
            <Route path="/settings" element={<PrivateRoute component={<Settings />}/>} />
            <Route path="/settings/changepassword/:resetToken" element={<PrivateRoute component={<ChangePassword />}/>}/>
            <Route path="/gradingformpage" element={<PrivateRoute component={<GradingFormPage />}/>}/>
            <Route path='/displayfilepage' element={<PrivateRoute component={<DisplayFilePage />}/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
