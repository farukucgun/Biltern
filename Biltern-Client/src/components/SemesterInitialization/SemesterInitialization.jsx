import React from 'react';
import FileUpload from '../../UI/FileUpload';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../features/alertSlice';
import { initSemester } from '../../apiHelper/backendHelper';

import classes from './SemesterInitialization.module.css';

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 */

const SemesterInitialization = () => {

    const dispatch = useDispatch();
    
    const submitHandler = (files) => {
        console.log(files[0]);
        const formData = new FormData();
        formData.append('file', files[0]);
        initSemester(formData, "multipart/form-data")
            .then(res => {
                dispatch(setTimedAlert("Semester initialized successfully", "success"));
            })
            .catch(err => {
                console.log(err);
                dispatch(setTimedAlert("Semester initialization failed", "error"));
            });
    }

    return (
        <div className={classes.semesterInit_container}>
            <h1>Semester Initialization</h1>
            <FileUpload 
                accept=".xlsx" 
                multiple={false}
                dragMessage="Drag and drop an excel file here or click"
                uploadMessage="Upload an excel file"    
                buttonMessage="Initiate Semester"
                onSubmit={submitHandler}
            />
        </div>
    );
}

export default SemesterInitialization;