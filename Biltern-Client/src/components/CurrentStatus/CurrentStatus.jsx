import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimedAlert } from '../../features/alertSlice';
import StudentCurrentStage from './Student/StudentCurrentStage';
import TACurrentStage from './TA/TACurrentStage';
import InstructorCurrentStage from "./Instructor/InstructorCurrentStage";
import { getReportStatus, getCompanyStatus } from '../../apiHelper/backendHelper';

import classes from './CurrentStatus.module.css';
/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 * @todo: witdrawn case
 */

const CurrentStatus = () => {

    const dummyId = 1;
    const role = useSelector(state => state.auth.user.role);
    const dispatch = useDispatch();
    const [reportStatus, setReportStatus] = useState([]);
    const [companyStatus, setCompanyStatus] = useState([]);

    const allStats = [
        [" ", "Waiting for submission", "Submitted"],
        ["Submitted", "Waiting for approval", "Approved"],
        ["Approved", "Waiting for grading", "Graded"],
        ["Waiting for grading", "Graded", " "],
        ["Revision requested", "Waiting for submission", "Submitted"],
        [" ", "Withdrawn", " "],
    ];

    useEffect(() => {
        getReportStatus(dummyId)
        .then(res => {
            setReportStatus(res.data);
        })
        .catch(err => {
            dispatch(setTimedAlert("Error while fetching report status", "error"));
        })

        getCompanyStatus(dummyId)
        .then(res => {
            setCompanyStatus(res.data);
        })
        .catch(err => {
            dispatch(setTimedAlert("Error while fetching company status", "error"));
        })
    }, []);

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>Ömer Selvi</h2>
                    <p>Computer Engineering</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: omer.selvi@ug.bilkent.edu.tr</p>
                    <p>Courses: CS-299</p>
                    <p>Bilkent ID: 22001462</p>
                </div>
            </div>
                <h3>Company Evaluation Status</h3>
            <div className={classes.status}>
                {/* make them buttons */}
                <h3 className={classes.singleState}>{companyStatus}</h3>
            </div>
                <h3>Report Status</h3>
            <div className={classes.status}>
                {/* make them buttons */}
                <h3 className={classes.singleState}>{reportStatus[0]}</h3>
                <h3 className={classes.activeState}>{reportStatus[1]}</h3>
                <h3 className={classes.singleState}>{reportStatus[2]}</h3>
            </div>
            {role == "Student" && <StudentCurrentStage id={dummyId} currentStatus={reportStatus}/>}
            {role == "TeachingAssistant" && <TACurrentStage id={dummyId} currentStatus={reportStatus}/>}
            {role == "BCC_ADMIN" && <InstructorCurrentStage id={dummyId} currentStatus={reportStatus}/>}
        </div>
    );
}

export default CurrentStatus;