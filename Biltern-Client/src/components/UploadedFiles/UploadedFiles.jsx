/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from "./UploadedFiles.module.css";
import UploadedFilesItem from "./UploadedFilesItem";
import { getIterations } from "../../apiHelper/backendHelper";


/**
 * Displays all reports uploaded by a student.
 * @returns uploaded files page
 */
const UploadedFiles = () => {

    const [reports, setReports] = React.useState([])

    React.useEffect(()=>{
        getIterations()
        .then(res => {
            console.log(typeof res.data)
            for(const key in res.data){
                if(res.data.hasOwnProperty(key)){
                    setReports(prevReports =>{
                        console.log({to: "/displayfilepage", reportName: key, reportId: res.data[key] })
                        return [...prevReports, {to: "/displayfilepage", reportName: key, reportId: res.data[key] }]
                    })
                }
            }
        })
        .catch(err => {
            console.log(err)
        });
    },[])
    console.log(reports)


    return (
        <div className={classes.uploaded_files_container}>
            {reports.map((item) => <UploadedFilesItem to={item.to} reportName={item.reportName} reportId={item.reportId} key={item.reportId} />)}
        </div>
    );
}

export default UploadedFiles;
