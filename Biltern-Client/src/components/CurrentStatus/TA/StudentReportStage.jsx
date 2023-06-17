import React, { useEffect, useState } from 'react';
import { getReportDueDate } from '../../../apiHelper/backendHelper';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for displaying student report stage for a ta
 */

const StudentReportStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getReportDueDate(id)
            .then(res => {
                setDueDate(res.data);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
            });
    }, []);

    return (
        <div className={classes.StudentReportStage}>
            <div className={classes.dueDate}>
                <p>Due Date: {dueDate}</p>
            </div>
            <h3>Waiting for student report upload</h3>
        </div>    
    )
}

export default StudentReportStage;