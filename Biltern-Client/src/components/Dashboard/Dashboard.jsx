import React from 'react'
import { Routes, Route } from "react-router-dom";

import classes from './DashBoard.module.css';
import userType from './Dashboard Panels/Data/Dashboard.json'
import TAListPanel from "./Dashboard Panels/Components/TAListPanel";
import GraderInfoPanel from "./Dashboard Panels/Components/GraderInfoPanel";
import RemindersPanel from "./Dashboard Panels/Components/RemindersPanel"
import StudentStatisticsPanel from "./Dashboard Panels/Components/StudentStatisticsPanel"
import MiniCurrentStatusPanel from "./Dashboard Panels/Components/MiniCurrentStatusPanel"
import ReadyToBeGradedPanel from "./Dashboard Panels/Components/ReadyToBeGradedPanel"
import TAInfoPanel from "./Dashboard Panels/Components/TAInfoPanel"
import GraderListPanel from "./Dashboard Panels/Components/GraderListPanel"
import SecretaryListPanel from "./Dashboard Panels/Components/SecretaryListPanel"
import CoordinatorListPanel from "./Dashboard Panels/Components/CoordinatorListPanel"
import CoordinatorInfoPanel from "./Dashboard Panels/Components/CoordinatorInfoPanel"
import MiniStudentListPanel from "./Dashboard Panels/Components/MiniStudentListPanel"
import GeneralStatisticsPanel from "./Dashboard Panels/Components/GeneralStatisticsPanel";

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function Dashboard(){

    const dashBoardElements = [];
    if( userType[0].currentUser ){
        dashBoardElements.push( <MiniCurrentStatusPanel /> )
        dashBoardElements.push( <GraderInfoPanel /> )
        dashBoardElements.push( <RemindersPanel /> )
        dashBoardElements.push( <TAInfoPanel /> )
        dashBoardElements.push( <StudentStatisticsPanel />)
        dashBoardElements.push( <GraderListPanel />)
        dashBoardElements.push( <SecretaryListPanel />)
        dashBoardElements.push( <CoordinatorListPanel />)
        dashBoardElements.push( <TAListPanel />)
        dashBoardElements.push( <CoordinatorInfoPanel />)
        dashBoardElements.push( <MiniStudentListPanel />)
        dashBoardElements.push( <GeneralStatisticsPanel />)
        dashBoardElements.push( <ReadyToBeGradedPanel />)
    }
    else if( userType[1].currentUser ){

    }

    return(
        <div className={classes.dashboard_container} >
            {dashBoardElements}
        </div>
    )
}
