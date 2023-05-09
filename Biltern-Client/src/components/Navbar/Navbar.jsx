import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';
import empty_profile_pic from '../../assets/empty_profile_pic.png';
import dummy_profile_pic from '../../assets/dummy_profile_pic.png';

import classes from "./Navbar.module.css";

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.user?.role) || "Grader";

  const logoutHandler = () => {
    dispatch(logout());
    // navigate('/login');
    console.log('logout');
  }

  return (
    <nav className={classes.sidebar}>
      <div className={classes.userInfo}>
        <img src={isAuthenticated ? dummy_profile_pic : empty_profile_pic} alt="profilePicture" className={classes.profilePic}/>
        <div className={classes.userInfoRight}>
          <h4>{isAuthenticated && "Eray Tüzün"}</h4>
          <p>{isAuthenticated && userRole}</p>
        </div>
      </div>
      {isAuthenticated &&
      <>
      <div className={classes.item}>
        <NavLink to="/dashboard" className={classes.navlink}>Dashboard</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/uploadedfiles" className={classes.navlink}>Uploaded Files</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/currentstatus" className={classes.navlink}>Current Status</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings" className={classes.navlink}>Settings</NavLink>
      </div>
      </>}
      <div className={classes.item}>
        {isAuthenticated ? 
        <NavLink to="/login" className={classes.navlink} onClick={logoutHandler}>Logout</NavLink>
        : 
        <NavLink to="/login" className={classes.navlink}>Login</NavLink>}
      </div>
    </nav>
  );
}

export default Navbar;