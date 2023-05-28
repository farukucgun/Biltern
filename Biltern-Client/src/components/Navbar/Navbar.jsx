import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import empty_profile_pic from '../../assets/empty_profile_pic.png';
import dummy_profile_pic from '../../assets/dummy_profile_pic.png';
import NavbarItem from './NavbarItem';

import classes from "./Navbar.module.css";

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 * TODO: handle the active page 
 */

const items = [
  {to: "/dashboard", name: "Dashboard"},
  {to: "/uploadedfiles", name: "Uploaded Files"},
  {to: "/currentstatus", name: "Current Status"},
  {to: "/settings", name: "Settings"},
  {to: "/semesterInitialization", name: "Semester Initialization"},
  {to: "/roleassignment", name: "Role Assignment"},
  {to: "/gradingformpage", name: "Grading Form"},
  {to: "/registeruser", name: "Register User"},
  {to: "/studentlist", name: "Student List"},
]

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.user?.role);
  const userName = useSelector(state => state.auth.user?.name);

  const logoutHandler = () => {
    dispatch(logout());
  }

  const goHomeHandler = () => {
    navigate('/dashboard');
  }

  return (
    <nav className={classes.sidebar}>
      <h1 onClick={goHomeHandler} className={classes.title} >BILTERN</h1>
      <div className={classes.userInfo}>
        <img src={isAuthenticated ? dummy_profile_pic : empty_profile_pic} alt="profilePicture" className={classes.profilePic}/>
        <div className={classes.userInfoRight}>
          <h4 className={classes.userName}>{isAuthenticated && userName}</h4>
          <p>{isAuthenticated && userRole}</p>
        </div>
      </div>
      {isAuthenticated ? <>
      {items.map((item, index) => <NavbarItem to={item.to} name={item.name} index={index} key={index}/>)}  
      <NavbarItem to="/login" name="Logout" onClick={logoutHandler}/>
      </> : 
      <NavbarItem to="/login" name="Login"/> }
    </nav>
  );
}

export default Navbar;