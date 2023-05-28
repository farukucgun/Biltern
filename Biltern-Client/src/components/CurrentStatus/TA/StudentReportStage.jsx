import React, {useEffect, useState} from 'react';
import ActionButton from '../../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';
import { getReportDueDate, getReportContent } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

const StudentReportStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getReportDueDate(id)
            .then(res => {
                setDueDate(res.data);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
            });
    }, []);

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
    
        getReportContent(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                onFetchReport(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching report", alertType: "error", timeout: 4000}));
            });
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
            </div>
        </div>    
    )
}

export default StudentReportStage;