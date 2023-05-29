import React, {useEffect, useState} from 'react';
import FileUpload from "../../../UI/FileUpload";
import ActionButton from '../../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';
import { getReportDueDate, getReportContent, uploadReportContent } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

const StudentReportStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null);
    const [studentFile, setStudentFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (files) => {
        let formData = new FormData();
        formData.append('file', files[0]);
        uploadReportContent(id, formData, "multipart/form-data")
            .then(res => {
                dispatch(setTimedAlert({msg: "Report uploaded successfully", alertType: "success", timeout: 4000}));
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while uploading report", alertType: "error", timeout: 4000}));
            });
    };

    useEffect(() => {
        getReportDueDate(id)
            .then(res => {
                setDueDate(res.data);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
            });

        getReportContent(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                setStudentFile(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching report", alertType: "error", timeout: 4000}));
            });    
    }, []);

    const ViewReportHandler = async () => {
        navigate("/displayfilepage", {state:{url: URL.createObjectURL(studentFile)}});
    }

    const downloadReportHandler = async () => {

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(studentFile, 'file.pdf');
        } 
        else {
            const url = window.URL.createObjectURL(studentFile);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'file.pdf';
            link.click();
        
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 0);
        }
    }

    return (
        <div className={classes.StudentReportStage}>
            <div className={classes.dueDate}>
                <p>Due Date: {dueDate}</p>
            </div>
            <div className={classes.actions}>
                <div className={classes.buttons}>
                    <ActionButton
                        className=""
                        text="Download Report"
                        onClick={downloadReportHandler}
                    />
                    <ActionButton
                        className=""
                        text="View Report"
                        onClick={ViewReportHandler}
                    />
                </div>
                <div>
                    <FileUpload 
                        accept=".pdf" 
                        multiple={false}
                        onSubmit={submitHandler} 
                        dragMessage="Drag and drop a pdf file or click here"
                        uploadMessage="Upload a pdf file"
                        buttonMessage="Upload"    
                    />
                </div>
            </div>
        </div>    
    )
}

export default StudentReportStage;