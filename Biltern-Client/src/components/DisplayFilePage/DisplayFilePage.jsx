import React, {useState} from 'react';
import FileUpload from "../../UI/FileUpload";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function DisplayFilePage() {


    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [url, setURL] = useState("");
    const [viewReport, setViewReport] = useState(true);


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



    return (
        <div>
            {viewReport && 
                <>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document> 
            </>}
            <button onClick={ViewReportHandler}> view</button> 
        </div>
    )
}