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
    const { to, pdfFile, index } = props;
    const navigate = useNavigate();

    function handleOnClick(){
        navigate('/displayfilepage')
    }


    return(
        <div className={classes.uploaded_files_item_container} onClick={handleOnClick}>
            <Document file={pdf}>
                <Page pageNumber={1} scale={0.45}></Page>
            </Document>
            <div className={classes.file_information}> 
                <div className={classes.image}>
                    <img src={fileSymbol} />
                </div>
                <div className={classes.file_name}>
                    <p> {pdfFile} </p>
                </div>

            </div>
        </div>
    );
}