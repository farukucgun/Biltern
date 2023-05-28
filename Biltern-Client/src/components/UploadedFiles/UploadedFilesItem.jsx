import React from "react";
import classes from "./UploadedFilesItem.module.css";
import fileSymbol from "./files.png"
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdf from "./CS319_AnalysisReport_Iter1_Caffe (2).pdf";
import { useNavigate } from 'react-router-dom';


pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function UploadedFilexItem(props){
    const { to, fileURL, fileName, index } = props;
    const navigate = useNavigate();

    function handleOnClick(){
        navigate(to, {state:{url: fileURL}});
    }

    return(
        <div className={classes.uploaded_files_item_container} onClick={handleOnClick}>
            <Document file={fileURL}>
                <Page pageNumber={1} scale={0.58}></Page>
            </Document>
            <div className={classes.file_information}> 
                <div className={classes.image}>
                    <img src={fileSymbol} />
                </div>
                <div className={classes.file_name}>
                    <p> {fileName} </p>
                </div>

            </div>
        </div>
    );
}