import React, {useEffect, useState} from 'react';
import FileUpload from "../../../UI/FileUpload";
import ActionButton from '../../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';
import DatePicker from '../../../UI/datePicker';
import { getReportDueDate, getReportContent, uploadReportFeedback, 
    getReportFeedback, changeReportDueDate} from '../../../apiHelper/backendHelper';

// @todo: iteration logic is not implemented yet 

import classes from '../CurrentStatus.module.css';

const IterationStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null); 
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [studentFile, setStudentFile] = useState(null);
    const [feedbackFile, setFeedbackFile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (files) => {
        let formData = new FormData();
        formData.append('file', files[0]);
        uploadReportFeedback(id, formData, "multipart/form-data")
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

        getReportFeedback(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                setFeedbackFile(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching feedback", alertType: "error", timeout: 4000}));
            });
    }, []);

    const ViewReportHandler = () => {
        navigate("/displayfilepage", {state:{url: URL.createObjectURL(studentFile)}});
    }

    const viewFeedbackHandler = () => {
        navigate("/displayfilepage", {state:{url: URL.createObjectURL(feedbackFile)}});
    }

    const downloadReport = (blob) => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'file.pdf');
        } 
        else {
            const url = window.URL.createObjectURL(blob);
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

    const downloadStudentReportHandler = () => {
        downloadReport(studentFile);
    }

    const downloadFeedbackHandler = () => {
        downloadReport(feedbackFile);
    }

    const showExtendDeadline = () => {
        setDatePickerOpen((prevState) => (!prevState));
    }

    const gradeHandler = () => {
        navigate("/gradingformpage", {state:{url: URL.createObjectURL(studentFile)}});
    }

    const extendDeadlineHandler = (date) => {
        let data = {"dueDate": date};
        changeReportDueDate(id, data)
            .then(res => {
                setDueDate(date);
                dispatch(setTimedAlert({msg: "Deadline extended successfully", alertType: "success", timeout: 4000}));
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while extending deadline", alertType: "error", timeout: 4000}));
            });
        setDatePickerOpen(false);
    }

    return (
        <div className={classes.iterationStage}>
            <div className={classes.dueDate}>
                <p>Due Date: {dueDate}</p>
            </div>
            <div className={classes.actions}>
                <div className={classes.buttons}>
                    <ActionButton
                        className=""
                        text="Download Student Report"
                        onClick={downloadStudentReportHandler}
                    />
                    <ActionButton
                        className=""
                        text="View Student Report"
                        onClick={ViewReportHandler}
                    />
                    <ActionButton
                        className=""
                        text="Download Feedback"
                        onClick={downloadFeedbackHandler}
                    />
                    <ActionButton
                        className=""
                        text="View Feedback"
                        onClick={viewFeedbackHandler}
                    />
                    <ActionButton
                        className=""
                        text="Set Deadline"
                        onClick={showExtendDeadline}
                    />
                    <ActionButton
                        className=""
                        text="Grade"
                        onClick={gradeHandler}
                    />
                </div>
                <FileUpload 
                    accept=".pdf" 
                    multiple={false}
                    onSubmit={submitHandler} 
                    dragMessage="Drag and drop a pdf file or click here"
                    uploadMessage="Upload a pdf file"
                    buttonMessage="Upload"    
                />
            </div>
            {datePickerOpen && <DatePicker onConfirm={extendDeadlineHandler}/>}   
        </div>
    )
}

export default IterationStage;