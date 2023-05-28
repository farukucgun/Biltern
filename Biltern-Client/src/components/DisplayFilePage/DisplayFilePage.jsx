import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import classes from "./DisplayFilePage.module.css"
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function DisplayFilePage( props ) {

    const location = useLocation();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }



    return (
        <div className={classes.display_file_page_container}>
            <Document file={location.state.url} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page 
                        className={classes.page} 
                        key={`page_${index + 1}`} 
                        pageNumber={index + 1}
                        scale={1.2}
                    />
                ))}
            </Document>
        </div>
    )
}