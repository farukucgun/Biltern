import React, {useState, useEffect} from 'react';
import FileUpload from "../../../UI/FileUpload";
import ActionButton from '../../../UI/ActionButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTimedAlert } from '../../../features/alertSlice';
import { getApprovalDueDate, getReportContent, getPreviewFeedback, uploadPreviewFeedback } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

const TAEvaluationStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (files) => {
        let formData = new FormData();
        formData.append('file', files[0]);
        uploadPreviewFeedback(id, formData, "multipart/form-data")
            .then(res => {
                dispatch(setTimedAlert({msg: "Report uploaded successfully", alertType: "success", timeout: 4000}));
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while uploading report", alertType: "error", timeout: 4000}));
            });
    };

    useEffect(() => {
        getApprovalDueDate(id)
            .then(res => {
                setDueDate(res.data);
            })
            .catch(err => {
                console.log(err);
                dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
            });
    }, []);

    const ViewReportHandler = () => {
        console.log("navigate to report with id to display report");
        // navigate("/report/1");
    }

    const viewFeedbackHandler = () => {
        console.log("navigate to feedback with id to display feedback");
        // navigate("/feedback/1");
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
        getReportContent(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                downloadReport(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching report", alertType: "error", timeout: 4000}));
            });
    }

    const downloadFeedbackHandler = () => {
        getPreviewFeedback(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                downloadReport(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching feedback", alertType: "error", timeout: 4000}));
            });
    }

    return (
        <div>
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

export default TAEvaluationStage;