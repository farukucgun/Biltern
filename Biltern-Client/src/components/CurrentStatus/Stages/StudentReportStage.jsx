import React, {useEffect, useState} from 'react';
import FileUpload from "../../../UI/FileUpload";
import axios from 'axios';
import ActionButton from '../../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';

import classes from '../CurrentStatus.module.css';

const StudentReportStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (files) => {
        console.log(files[0]);
    };

    useEffect(() => {
        const fetchDueDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token || ""
                }
            };
            await axios.get(`http://localhost:8080/report/dueDate/${id}`, config)
                .then(res => {
                    setDueDate(res.data);
                })
                .catch(err => {
                    dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
                });
        };

        fetchDueDate()
            .catch(err => {
                console.log(err);
                dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
            }
        );
    }, []);

    const fetchReport = async ({onFetchReport}) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        };

        await axios.get("http://localhost:8080/report/reportContent/1", {config, responseType: 'arraybuffer'})
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                onFetchReport(blob);
            })
            .catch(err => {
                // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
                console.log(err);
            });
    };

    const ViewReportHandler = async () => {
        console.log("navigate to report with id to display report");
        // navigate(`/report/${id}`);
    }

    const downloadReportHandler = async () => {

        const onFetchReport = (blob) => {
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

        fetchReport({onFetchReport});
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