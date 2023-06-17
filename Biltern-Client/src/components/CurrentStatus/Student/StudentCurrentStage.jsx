import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import FinalStage from './FinalStage';
import IterationStage from './IterationStage';
import TAEvaluationStage from './TAEvaluationStage';
import StudentReportStage from './StudentReportStage'; 
import GradeStage from './GradeStage';

import { setTimedAlert } from '../../../features/alertSlice';
import { getReportStatus, getCompanyStatus, getStudentDetails } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for displaying general student stage for student
 */

const StudentCurrentStatus = (props) => {

    const { id, authorizedId, name, email, role, department, report } = props;
    const dispatch = useDispatch();

    const [reportStatus, setReportStatus] = useState([]);
    const [curStatus, setCurStatus] = useState();
    const [companyStatus, setCompanyStatus] = useState();

    const [departmentA, setDepartmentA] = useState();
    const [lastReport, setLastReport] = useState();

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
        if (role == "UNDERGRADUATE") {
            getStudentDetails()
                .then(res => {
                    setDepartmentA(res.data.department);
                    setLastReport(res.data.reports[0]);

                    getReportStatus(res.data.reports[0]?.reportId)
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
                            dispatch(setTimedAlert({msg: "Error while fetching report status", alertType: "error", timeout: 4000}));
                        })

                    getCompanyStatus(res.data.reports[0]?.reportId)
                        .then(res => {
                            setCompanyStatus(res.data);
                        })
                        .catch(err => {
                            dispatch(setTimedAlert({msg: "Error while fetching company status", alertType: "error", timeout: 4000}));
                        })
                })
                .catch(err => {
                    console.log(err);
                    dispatch(setTimedAlert("Error while fetching grader details", "error"));
            })
        } else {
            getReportStatus(lastReport?.reportId)
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
                    dispatch(setTimedAlert({msg: "Error while fetching report status", alertType: "error", timeout: 4000}));
                })
    
            getCompanyStatus(lastReport?.reportId)
                .then(res => {
                    setCompanyStatus(res.data);
                })
                .catch(err => {
                    dispatch(setTimedAlert({msg: "Error while fetching company status", alertType: "error", timeout: 4000}));
                })
        }
    }, []);

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>{lastReport?.studentName || name || "NAME"}</h2>
                    <p>{departmentA || "CS"}</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: {lastReport?.studentMail || email}</p>
                    <p>Courses: {lastReport?.courseCode || "CS-299"}</p>
                    <p>Bilkent ID: {lastReport?.studentId || id}</p>
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
            {lastReport?.reportId && 
            <>
                {curStatus == "NOT_SUBMITTED" && <StudentReportStage id={lastReport?.reportId}/>}
                {curStatus == "SUBMITTED" && <TAEvaluationStage id={lastReport?.reportId}/>}
                {curStatus == "APPROVED" && <GradeStage id={lastReport?.reportId}/>}
                {(curStatus == "ITERATION" || curStatus == "ITERATION_SUBMITTED") && <IterationStage id={lastReport?.reportId}/>}
                {curStatus == "GRADED" && <FinalStage id={lastReport?.reportId}/>}
            </>}
        </div>
    );
}

export default StudentCurrentStatus;