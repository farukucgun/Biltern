import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
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

    const { id, authorizedId, name, email, role, department, report }= props;
    const dispatch = useDispatch();

    const [reportStatus, setReportStatus] = useState([]);
    const [curStatus, setCurStatus] = useState();
    const [companyStatus, setCompanyStatus] = useState();

    const [departmentA, setDepartmentA] = useState();
    const [lastReport, setLastReport] = useState();

    const departmentUsed = department ? department : departmentA;
    const reportUsed = report ? report : lastReport;

    const allStats = [
        {"NOT_SUBMITTED": [" ", "Waiting for submission", "Submitted"]},
        {"SUBMITTED": ["Submitted", "Waiting for approval", "Approved"]},
        {"ITERATION_SUBMITTED": ["Submitted", "Waiting for grading", "Graded"]},
        {"APPROVED": ["Approved", "Waiting for grading", "Graded"]},
        {"GRADED": ["Waiting for grading", "Graded", " "]},
        {"ITERATION": ["Revision requested", "Waiting for submission", "Submitted"]},
        {"WITHDRAWN": [" ", "Withdrawn", " "]},
    ];

    console.log(departmentUsed, reportUsed);

    useEffect(() => {
        getReportStatus(report?.reportId || 6)
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

        getCompanyStatus(report?.reportId || 6)
            .then(res => {
                setCompanyStatus(res.data);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching company status", alertType: "error", timeout: 4000}));
            })
        if (role == "UNDERGRADUATE") {
            getStudentDetails()
                .then(res => {
                    // console.log(res.data);
                    setDepartmentA(res.data.department);
                    setLastReport(res.data.reports[res.data.reports.length - 1]);
                })
                .catch(err => {
                    console.log(err);
                    dispatch(setTimedAlert("Error while fetching grader details", "error"));
            })
        }
    }, []);

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>{reportUsed?.studentName || "NAME"}</h2>
                    <p>{departmentUsed || "CS"}</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: {reportUsed?.studentMail || email}</p>
                    <p>Courses: {reportUsed?.courseCode || "CS-299"}</p>
                    <p>Bilkent ID: {reportUsed?.studentId || id}</p>
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
            {reportUsed?.reportId && 
            <>
                {curStatus == "NOT_SUBMITTED" && <StudentReportStage id={reportUsed?.reportId || 6}/>}
                {curStatus == "SUBMITTED" && <TAEvaluationStage id={reportUsed?.reportId || 6}/>}
                {(curStatus=="APPROVED" || curStatus=="ITERATION" || curStatus=="ITERATION_SUBMITTED") 
                && <IterationStage id={reportUsed?.reportId || 6}/>}
                {curStatus == "GRADED" && <FinalStage id={reportUsed?.reportId || 6}/>}
            </>}
        </div>
    );
}

export default StudentCurrentStatus;