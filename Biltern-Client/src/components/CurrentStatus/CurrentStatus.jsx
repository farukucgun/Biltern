import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import FinalStage from './Stages/FinalStage';
import IterationStage from './Stages/IterationStage';
import TAEvaluationStage from './Stages/TAEvaluationStage';
import StudentReportStage from './Stages/StudentReportStage'; 

import classes from './CurrentStatus.module.css';
/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 */

const CurrentStatus = () => {

    const [currentStatus, setCurrentStatus] = useState("IterationStage");
    const dispatch = useDispatch();

    const dummyId = 1;

    useEffect(() => {
        const fetchCurrentStatus = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        };

        await axios.get("http://localhost:8080/status", config)
            .then(res => {
                setCurrentStatus(res.data);
            })
            .catch(err => {
                // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
                console.log(err);
            });
        };

        // fetchCurrentStatus()
        //     .catch(err => {
        //         console.log(err);
        //     }
        // );
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
            {currentStatus == "studentReportStage" && <StudentReportStage id={dummyId}/>}
            {currentStatus == "TAEvaluationStage" && <TAEvaluationStage id={dummyId}/>}
            {currentStatus == "IterationStage" && <IterationStage id={dummyId}/>}
            {currentStatus == "FinalStage" && <FinalStage id={dummyId}/>}
        </div>
    );
}

export default CurrentStatus;