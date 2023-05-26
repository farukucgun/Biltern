import React, {useState} from 'react';
import FileUpload from "../../../UI/FileUpload";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import ActionButton from '../../../UI/ActionButton';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import classes from '../CurrentStatus.module.css';


const StudentReportStage = () => {

    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [url, setURL] = useState("");
    const [viewReport, setViewReport] = useState(false);

    const submitHandler = (files) => {
        console.log(files[0]);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

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
        setPageNumber(1);
        const onFetchReport = (blob) => {
            const url = URL.createObjectURL(blob);
            setURL(url);
        }

        await fetchReport({onFetchReport});   
        setViewReport((prev) => !prev); 
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

    const previousPageHandler = () => {
        if (pageNumber === 1) {
            return;
        }
        setPageNumber((prev) => prev - 1);
    }

    const nextPageHandler = () => {
        if (pageNumber === numPages) {
            return;
        }
        setPageNumber((prev) => prev + 1);
    }

    return (
        <div>
            <div className={classes.status}>
                <h3>Previous Status</h3>
                <h3>Current Status</h3>
                <h3>Next Status</h3>
            </div>
            {viewReport && 
                <>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>  
                <p>
                    Page {pageNumber} of {numPages}
                </p> 
                <button onClick={previousPageHandler}> previous </button>
                <button onClick={nextPageHandler}> next </button>
            </>}
            <div className={classes.actions}>
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