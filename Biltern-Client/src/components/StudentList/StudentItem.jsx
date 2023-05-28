import React from 'react';

import classes from "./StudentItem.module.css";

const StudentItem = (props) => {
    const {id, studentName, course, ta, deadline} = props.student;
    const {onStudentClicked} = props;

    const clickHandler = () => {
        onStudentClicked(id);
    }

    return (
        <li className={classes.SingleStudent} onClick={clickHandler}>
            <p className={classes.studentInfoField}>#{id}</p>
            <p className={classes.studentInfoField}>{studentName}</p>
            <p className={classes.studentInfoField}>{course}</p>
            <p className={classes.studentInfoField}>{ta}</p>
            <p className={classes.studentInfoField}>{deadline}</p>
        </li>
    )
}

export default StudentItem;
