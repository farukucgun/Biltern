import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import FinalStage from './FinalStage';
import IterationStage from './IterationStage';
import TAEvaluationStage from './TAEvaluationStage';
import StudentReportStage from './StudentReportStage';
import { setTimedAlert } from '../../../features/alertSlice';
import { getReportStatus, getCompanyStatus } from '../../../apiHelper/backendHelper'; 

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 */

const InstructorCurrentStage = (props) => {
    const { id, authorizedId, role, name, email, department, reports, reportId } = props;
    const dispatch = useDispatch();
    const dummyId = 1;

    const [reportStatus, setReportStatus] = useState([]);
    const [curStatus, setCurStatus] = useState();
    const [companyStatus, setCompanyStatus] = useState();
    // const [firstReport, setFirstReport] = useState({});
    // const [department, setDepartment] = useState("CS");

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
        getReportStatus(reportId || dummyId)
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

        getCompanyStatus(reportId || dummyId)
        .then(res => {
            setCompanyStatus(res.data);
        })
        .catch(err => {
            dispatch(setTimedAlert("Error while fetching company status", "error"));
        })
    }, []);

    const nameDisplayed = id == authorizedId ? name : reports[0].studentName;
    const emailDisplayed = id == authorizedId ? email : reports[0].studentMail;
    const idDisplayed = id == authorizedId ? id : reports[0].studentId;

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>{nameDisplayed}</h2>
                    <p>{department}</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: {emailDisplayed}</p>
                    <p>Courses: {reports[0].courseCode || "CS-299"}</p>
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
            {curStatus == "NOT_SUBMITTED" && <StudentReportStage id={reportId || dummyId}/>}
            {curStatus == "SUBMITTED" && <TAEvaluationStage id={reportId || dummyId}/>}
            {curStatus == "APPROVED" || "ITERATION" || "ITERATION_SUBMITTED" && <IterationStage id={reportId || dummyId}/>}
            {curStatus == "GRADED" && <FinalStage id={reportId || dummyId}/>}
        </div>
    );
}

export default InstructorCurrentStage;