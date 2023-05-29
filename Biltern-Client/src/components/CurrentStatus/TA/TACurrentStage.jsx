import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import TAEvaluationStage from './TAEvaluationStage';
import StudentReportStage from './StudentReportStage';
import { setTimedAlert } from '../../../features/alertSlice';
import { getReportStatus, getCompanyStatus } from '../../../apiHelper/backendHelper'; 

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 */

const TACurrentStage = (props) => {
    const { id, authorizedId, name, email, role, department, report }= props;
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
        getReportStatus(report.reportId || 1)
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

        getCompanyStatus(report.reportId || 1)
        .then(res => {
            setCompanyStatus(res.data);
        })
        .catch(err => {
            dispatch(setTimedAlert({msg: "Error while fetching company status", alertType: "error", timeout: 4000}));
        })
    }, []);

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>{report.studentName}</h2>
                    <p>{department}</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: {report.studentMail || email}</p>
                    <p>Courses: {report.courseCode || "CS-299"}</p>
                    <p>Bilkent ID: {report.studentId || id}</p>
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
            {curStatus == "SUBMITTED" ? 
            <TAEvaluationStage id={report.reportId || 1}/>
            :
            <StudentReportStage id={report.reportId || 1}/>}
        </div>
    );
}

export default TACurrentStage;