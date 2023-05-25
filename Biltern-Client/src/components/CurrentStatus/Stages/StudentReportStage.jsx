import React, {useState} from 'react';
import FileUpload from "../../../UI/FileUpload";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
// import examplePdf from "./example.pdf";

import classes from '../CurrentStatus.module.css';

const StudentReportStage = () => {

    const examplepdf = "http://faculty.smcm.edu/jwschroeder/Web/ETHR1002/Global_Jutice_Readings_files/3.PlatoRepblic.pdf";

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const submitHandler = (files) => {
        console.log(files[0]);
        // axios.get('http://localhost:8080/report')
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <div className={classes.status}>
                <h3>Previous Status</h3>
                <h3>Current Status</h3>
                <h3>Next Status</h3>
            </div>
            <button>Download Report</button>
            <button>View Report</button>

            <Document file={examplepdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>  

            <p>
                Page {pageNumber} of {numPages}
            </p> 

            <div>
                <FileUpload 
                    accept=".pdf" 
                    multiple={false}
                    onFilesAdded={submitHandler} 
                    dragMessage="Drag and drop a pdf file or click here"
                    uploadMessage="Upload a pdf file"    
                />
                <button type='submit' className={classes.submit}>Upload</button>
            </div>
        </div>
    )
}

export default StudentReportStage;