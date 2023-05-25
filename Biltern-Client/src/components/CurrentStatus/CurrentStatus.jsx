import React, {useEffect, useState} from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import FinalStage from './Stages/FinalStage';
import IterationStage from './Stages/IterationStage';
import TAEvaluationStage from './Stages/TAEvaluationStage';
import StudentReportStage from './Stages/StudentReportStage'; 

import classes from './CurrentStatus.module.css';
/**
 * @author Faruk Uçgun
 * @date 07.05.2023
 */

const CurrentStatus = () => {

    const [currentStatus, setCurrentStatus] = useState([]);
    const dispatch = useDispatch();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }

    useEffect(() => {
        const fetchCurrentStatus = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        };

        await axios.get("http://localhost:8080/status", config)
            .then(res => {
                setCurrentStatus(res.data);
            })
            .catch(err => {
                // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
                console.log(err);
            });
        };

        // fetchCurrentStatus()
        //     .catch(err => {
        //         console.log(err);
        //     }
        // );
    }, []);

    return (
        <div className={classes.currentStatusPage}>
            <div className={classes.infoPane}>
                <div className={classes.infoPaneLeft}>
                    <h2>Ömer Selvi</h2>
                    <p>Computer Engineering</p>
                </div>
                <div className={classes.infoPaneRight}>
                    <p>Contact: omer.selvi@ug.bilkent.edu.tr</p>
                    <p>Courses: CS-299</p>
                    <p>Bilkent ID: 22001462</p>
                </div>

                <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>

            </div>
            <StudentReportStage />
        </div>
    );
}

export default CurrentStatus;