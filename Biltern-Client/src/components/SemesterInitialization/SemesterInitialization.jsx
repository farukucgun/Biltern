import React from 'react';
import FileUpload from '../../UI/FileUpload';
import { useDispatch } from 'react-redux';

import classes from './SemesterInitialization.module.css';

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 */

const SemesterInitialization = () => {

    const dispatch = useDispatch();
    
    const submitHandler = (files) => {
        console.log(files[0]);
        // dispatch some stuff here
    }

    return (
        <div className={classes.semesterInit_container}>
            <h1>System Initialization</h1>
            <FileUpload 
                accept=".xlsx" 
                multiple={false}
                onFilesAdded={submitHandler} 
                dragMessage="Drag and drop an excel file here or click"
                uploadMessage="Upload an excel file"    
            />
            <button type='submit' className={classes.submit}>Initialize Semester</button>
        </div>
    );
}

export default SemesterInitialization;