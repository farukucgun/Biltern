import React from 'react';
import { useDispatch } from 'react-redux';
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

const InstructorCurrentStage = (props) => {

    const {id, currentStatus} = props;
    const dispatch = useDispatch();

    return (
        <div className={classes.currentStatusPage}>
            {/* {<StudentReportStage id={id}/>}  */}
            {/* {<TAEvaluationStage id={id}/>} */}
            {<IterationStage id={id}/>}
            {/* {<FinalStage id={id}/>} */}
        </div>
    );
}

export default InstructorCurrentStage;