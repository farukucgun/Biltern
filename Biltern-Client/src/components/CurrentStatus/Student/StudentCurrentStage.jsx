import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FinalStage from './FinalStage';
import IterationStage from './IterationStage';
import TAEvaluationStage from './TAEvaluationStage';
import StudentReportStage from './StudentReportStage'; 

import { setTimedAlert } from '../../../features/alertSlice';
import { getReportStatus, getCompanyStatus, getStudentDetails } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 * @todo: witdrawn case
 */

const StudentCurrentStatus = (props) => {

    const { id, authorizedId, role, name, email }= props;
    const dispatch = useDispatch();

    const [reportStatus, setReportStatus] = useState([]);
    const [curStatus, setCurStatus] = useState();
    const [companyStatus, setCompanyStatus] = useState();
    const [firstReport, setFirstReport] = useState({});
    const [department, setDepartment] = useState("CS");

    const allStats = [
        {"NOT_SUBMITTED": [" ", "Waiting for submission", "Submitted"]},
        {"SUBMITTED": ["Submitted", "Waiting for approval", "Approved"]},
        {"ITERATION_SUBMITTED": ["Submitted", "Waiting for grading", "Graded"]},
        {"APPROVED": ["Approved", "Waiting for grading", "Graded"]},
        {"GRADED": ["Waiting for grading", "Graded", " "]},
        {"ITERATION": ["Revision requested", "Waiting for submission", "Submitted"]},
        {"WITHDRAWN": [" ", "Withdrawn", " "]},
    ];

    useEffect(() => {
        getReportStatus(1)
        .then(res => {
            setReportStatus(res.data);
            for (const status of allStats) {
                const key = Object.keys(status)[0];
                const values = status[key];
                
                if (JSON.stringify(values) === JSON.stringify(res.data)) {
                    setCurStatus(key);
                  break;
                }
            }
        })
        .catch(err => {
            dispatch(setTimedAlert("Error while fetching report status", "error"));
        })

        getCompanyStatus(1)
        .then(res => {
            setCompanyStatus(res.data);
        })
        .catch(err => {
            dispatch(setTimedAlert("Error while fetching company status", "error"));
        })

        // getStudentDetails()
        // .then(res => {
        //     console.log(res.data);
        //     setDepartment(res.data.department);
        //     setFirstReport(res.data.reports[0]);
        // })
        // .catch(err => {
        //     console.log(err);
        //     dispatch(setTimedAlert("Error while fetching grader details", "error"));
        // })
    }, []);

    const departmentDisplayed = id == authorizedId ? "same" : "diff";
    const nameDisplayed = id == authorizedId ? name : "diff";
    const emailDisplayed = id == authorizedId ? email : "diff";
    const courseDisplayed = id == authorizedId ? "same" : "diff";
    const idDisplayed = id == authorizedId ? authorizedId : "diff";

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>{nameDisplayed}</h2>
                    <p>{departmentDisplayed}</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: {emailDisplayed}</p>
                    <p>Courses: {firstReport.department}</p>
                    <p>Bilkent ID: {idDisplayed}</p>
                </div>
            </div>
                <h3>Company Evaluation Status</h3>
            <div className={classes.status}>
                <h3 className={classes.singleState}>{companyStatus}</h3>
            </div>
                <h3>Report Status</h3>
            <div className={classes.status}>
                <h3 className={classes.singleState}>{reportStatus[0]}</h3>
                <h3 className={classes.activeState}>{reportStatus[1]}</h3>
                <h3 className={classes.singleState}>{reportStatus[2]}</h3>
            </div>
            {curStatus == "NOT_SUBMITTED" && <StudentReportStage id={1}/>}
            {curStatus == "SUBMITTED" && <TAEvaluationStage id={1}/>}
            {curStatus == "APPROVED" || "ITERATION" || "ITERATION_SUBMITTED" && <IterationStage id={1}/>}
            {curStatus == "GRADED" && <FinalStage id={1}/>}
        </div>
    );
}

export default StudentCurrentStatus;