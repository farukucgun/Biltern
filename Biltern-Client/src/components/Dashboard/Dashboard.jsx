import React from 'react'
import { useSelector } from 'react-redux';
import classes from './DashBoard.module.css';
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
    const role = useSelector(state => state.auth.user.role);
    console.log(role);

    const dashBoardElements = [];
    if( role === "UNDERGRADUATE"){
        dashBoardElements.push( <MiniCurrentStatusPanel /> )
        dashBoardElements.push( <GraderInfoPanel /> )
        dashBoardElements.push( <RemindersPanel /> )
        dashBoardElements.push( <TAInfoPanel /> )
    }
    else if( role === "TEACHING_ASSISTANT"){
        dashBoardElements.push( <ReadyToBeGradedPanel />)
        dashBoardElements.push( <RemindersPanel /> )
        dashBoardElements.push( <MiniStudentListPanel />)
    }
    else if( role === "FACULTY_MEMBER"){
        dashBoardElements.push( <ReadyToBeGradedPanel />)
        dashBoardElements.push( <RemindersPanel /> )
        dashBoardElements.push( <MiniStudentListPanel />)
    }
    else if( role === "DEPARTMENT_COORDINATOR"){
        dashBoardElements.push( <StudentStatisticsPanel />)
        dashBoardElements.push( <GraderListPanel />)
        dashBoardElements.push( <RemindersPanel /> )
        dashBoardElements.push( <TAListPanel />)
    }
    else if( role === "SECRETARY"){
        dashBoardElements.push( <StudentStatisticsPanel />)
        dashBoardElements.push( <CoordinatorInfoPanel />)
        dashBoardElements.push( <GraderListPanel />)
        dashBoardElements.push( <RemindersPanel /> )
        dashBoardElements.push( <TAListPanel />)
    }
    else if( role === "BCC_ADMIN"){
        dashBoardElements.push( <GeneralStatisticsPanel />)
        dashBoardElements.push( <SecretaryListPanel />)
        dashBoardElements.push( <CoordinatorListPanel />)
    }
    return(
        <div className={classes.dashboard_container} >
            {dashBoardElements}
        </div>
    )
}
