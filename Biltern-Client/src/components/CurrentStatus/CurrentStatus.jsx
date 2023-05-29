import React from 'react';
import { useSelector } from 'react-redux';
import StudentCurrentStage from './Student/StudentCurrentStage';
import TACurrentStage from './TA/TACurrentStage';
import InstructorCurrentStage from "./Instructor/InstructorCurrentStage";
import { useParams, useLocation } from 'react-router-dom';

import classes from './CurrentStatus.module.css';
/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 * @todo: witdrawn case
 */

const CurrentStatus = (props) => {

    const authorizedId = useSelector(state => state.auth.user.id);
    const name = useSelector(state => state.auth.user.name);
    const email = useSelector(state => state.auth.user.email);
    const role = useSelector(state => state.auth.user.role);
    const {id} = useParams();
    const location = useLocation();
    const { department, reports, reportId } = location?.state ?? {};

    return (
        <div className={classes.CurrentStatus}>
            {role == "UNDERGRADUATE" && <StudentCurrentStage id={id} authorizedId={authorizedId} 
            name={name} email={email} role={role} />}
            {role == "TEACHING_ASSISTANT" && <TACurrentStage id={id} authorizedId={authorizedId} 
            name={name} email={email} role={role} department={department} reports={reports} reportId={reportId} />}
            {role == "FACULTY_MEMBER" && <InstructorCurrentStage id={id} authorizedId={authorizedId} 
            name={name} email={email} role={role} department={department} reports={reports} reportId={reportId}/>}
        </div>
    );
}

export default CurrentStatus;