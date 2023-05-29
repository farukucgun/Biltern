import React from 'react';

import classes from "./StudentItem.module.css";

const StudentItem = (props) => {
    const {courseCode, dueDate, studentName, graderName, taName, reportStats, reportId, taId, studentId, graderId} = props.report;
    const {onStudentClicked, department, index} = props;

    const clickHandler = () => {
        onStudentClicked(studentId, index);
    }

    return (
        <li className={classes.SingleStudent} onClick={clickHandler}>
            <p className={classes.studentInfoField}>#{studentId}</p>
            <p className={classes.studentInfoField}>{studentName}</p>
            <p className={classes.studentInfoField}>{courseCode || "CS-299"}</p>
            <p className={classes.studentInfoField}>{taName}</p>
            <p className={classes.studentInfoField}>{dueDate}</p>
            <p className={classes.studentInfoField}>{reportStats}</p>
        </li>
    )
}

export default StudentItem;
