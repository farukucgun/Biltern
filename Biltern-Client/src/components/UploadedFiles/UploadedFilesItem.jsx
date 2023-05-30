/**
 * @author Enes Bektaş
 * @date 25.05.2023
 */
import React from "react";
import classes from "./UploadedFilesItem.module.css";
import fileSymbol from "./files.png"
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useNavigate } from 'react-router-dom';
import { getSpecificIteration } from "../../apiHelper/backendHelper";

pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


/**
 * Shows mockup for a report of a student.
 * @param {*} props navigate address, report name, report id
 * @returns uploded files item
 */
export default function UploadedFilesItem(props){
    const { to, reportName, reportId } = props;
    const navigate = useNavigate();

    const [fileUrl, setFileUrl] = React.useState("");

    React.useEffect(()=>{
        getSpecificIteration(reportId, 'arraybuffer')
        .then(res => {
            console.log(res.data instanceof Blob)
            const blob = new Blob([res.data], {type: 'arra'});
            setFileUrl(window.URL.createObjectURL(blob))
        })
        .catch(err => {
            console.log(err)
        });
    },[])
    console.log(fileUrl)
    function handleOnClick(){
        navigate(to, {state:{url: fileUrl}});
    }

    return(
        <div className={classes.uploaded_files_item_container} onClick={handleOnClick}>
            <Document file={fileUrl}>
                <Page pageNumber={1} scale={0.58}></Page>
            </Document>
            <div className={classes.file_information}> 
                <div className={classes.image}>
                    <img src={fileSymbol} />
                </div>
                <div className={classes.file_name}>
                    <p> {reportName} </p>
                </div>

            </div>
        </div>
    );
}