import React from 'react'
import { Routes, Route } from "react-router-dom";

import classes from './DashBoard.module.css';

/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 */

const Dashboard = () => {
    return (
        <div className={classes.dashboard_container}>
            <h1>DashBoard</h1>
        </div>
    );
}

export default Dashboard;
