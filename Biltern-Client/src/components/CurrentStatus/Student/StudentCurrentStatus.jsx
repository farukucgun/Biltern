import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import FinalStage from '../Stages/FinalStage';
import IterationStage from '../Stages/IterationStage';
import TAEvaluationStage from '../Stages/TAEvaluationStage';
import StudentReportStage from '../Stages/StudentReportStage'; 
import { setTimedAlert } from '../../../features/alertSlice';

import classes from '../CurrentStatus.module.css';
/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 * @todo: witdrawn case
 */

const StudentCurrentStatus = (props) => {

    const {id, currentStatus} = props;
    const dispatch = useDispatch();



    return (
        <div className={classes.currentStatusPage}>
            {/* {<StudentReportStage id={id}/>} */}
            {<TAEvaluationStage id={id}/>}
            {/* {<IterationStage id={id}/>} */}
            {/* {<FinalStage id={id}/>} */}
        </div>
    );
}

export default StudentCurrentStatus;