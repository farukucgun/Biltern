import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import FinalStage from './FinalStage';
import IterationStage from './IterationStage';
import TAEvaluationStage from './TAEvaluationStage';
import StudentReportStage from './StudentReportStage'; 

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
            {<StudentReportStage id={id}/>}
            {/* {<TAEvaluationStage id={id}/>} */}
            {/* {<IterationStage id={id}/>} */}
            {/* {<FinalStage id={id}/>} */}
        </div>
    );
}

export default StudentCurrentStatus;