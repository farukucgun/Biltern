import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import FinalStage from './Stages/FinalStage';
import IterationStage from './Stages/IterationStage';
import TAEvaluationStage from './Stages/TAEvaluationStage';
import StudentReportStage from './Stages/StudentReportStage'; 
import { setTimedAlert } from '../../features/alertSlice';

import classes from './CurrentStatus.module.css';
/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 * @todo: witdrawn case
 */

const CurrentStatus = () => {

    const dummyId = 1;
    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const [currentStatus, setCurrentStatus] = useState([]);

    const allStats = [
        [" ", "Waiting for submission", "Submitted"],
        ["Submitted", "Waiting for approval", "Approved"],
        ["Approved", "Waiting for grading", "Graded"],
        ["Waiting for grading", "Graded", " "],
        ["Revision requested", "Waiting for submission", "Submitted"],
        [" ", "Withdrawn", " "],
    ];

    const stagesComponents = [
        <StudentReportStage id={dummyId}/>,
        <TAEvaluationStage id={dummyId}/>,
        <IterationStage id={dummyId}/>,
        <FinalStage id={dummyId}/>
    ];

    // const stageComponent = () => {
    //     if (JSON.stringify(currentStatus) == JSON.stringify(allStats[0])) {
    //         return stagesComponents[0];
    //     } else if (JSON.stringify(currentStatus) == JSON.stringify(allStats[1]) && role == "TA") {
    //         return stagesComponents[1];
    //     } else if (JSON.stringify(currentStatus) == JSON.stringify(allStats[1]) && role == "Student") {
    //         return stagesComponents[0];
    //     } else if (JSON.stringify(currentStatus) == JSON.stringify(allStats[2]) && role == "Student") {
    //         return stagesComponents[2];


    useEffect(() => {
        const fetchCurrentStatus = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token || ""
            }
        };

        await axios.get(`http://localhost:8080/report/reportStatus/${dummyId}`, config)
            .then(res => {
                console.log(res.data);
                setCurrentStatus(res.data);
            })
            .catch(err => {
                // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
            });
        };

        fetchCurrentStatus()
            .catch(err => {
                console.log(err);
                // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
            }
        );
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
            <div className={classes.status}>
                {/* make them buttons */}
                <h3 className={classes.singleState}>{currentStatus[0]}</h3>
                <h3 className={classes.activeState}>{currentStatus[1]}</h3>
                <h3 className={classes.singleState}>{currentStatus[2]}</h3>
            </div>
            {<StudentReportStage id={dummyId}/>}
            {<TAEvaluationStage id={dummyId}/>}
            {<IterationStage id={dummyId}/>}
            {/* {<FinalStage id={dummyId}/>} */}
        </div>
    );
}

export default CurrentStatus;