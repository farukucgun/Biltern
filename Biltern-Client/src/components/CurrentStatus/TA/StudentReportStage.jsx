import React from 'react';

import classes from '../CurrentStatus.module.css';

const StudentReportStage = () => {
    return (
        <div className={classes.StudentReportStage}>
            <div className={classes.dueDate}>
                <p>Due Date: 18.07.2023</p>
            </div>
            <h3>Waiting for student upload</h3>
        </div>    
    )
}

export default StudentReportStage;