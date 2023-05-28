import React from 'react';
import TAEvaluationStage from './TAEvaluationStage';
import StudentReportStage from './StudentReportStage'; 

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 * @todo: witdrawn case
 */

const TACurrentStage = (props) => {

    const {id, currentStatus} = props;

    return (
        <div className={classes.currentStatusPage}>
            {/* {<StudentReportStage id={id}/>} */}
            {<TAEvaluationStage id={id}/>}
        </div>
    );
}

export default TACurrentStage;