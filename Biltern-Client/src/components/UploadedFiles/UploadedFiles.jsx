import React from "react";
import classes from "./UploadedFiles.module.css";
import UploadedFilesItem from "./UploadedFilesItem";
import axios from 'axios';
import { getStudentDetailsById } from "../../apiHelper/backendHelper";
/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */


const UploadedFiles = () => {

    const [url, setUrl] = React.useState("");


    React.useEffect(()=>{
        getStudentDetailsById(12)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        });
    },[])

    React.useEffect(() => {
        const fetchReport = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token") || ""
                }
            };

            await axios.get("http://localhost:8080/report/reportContent/1", {config, responseType: 'arraybuffer'})
                .then(res => {
                    const blob = new Blob([res.data], {type: 'application/pdf'});
                    setUrl(URL.createObjectURL(blob));
                })
                .catch(err => {
                    // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
                    console.log(err);
                });
        };

        fetchReport();
    }, []);

    console.log(url)

    const items = [
        {to: "/displayfilepage", fileURL: url, fileName: "CS319_AnalysisReport_Iter1_Caffe (2).pdf"},
        {to: "/displayfilepage", fileURL: url, fileName: "...pdf"},
        {to: "/displayfilepage", fileURL: url, fileName: "...pdf"},
        {to: "/displayfilepage", fileURL: url, fileName: "...pdf"}
    ]


    return (
        <div className={classes.uploaded_files_container}>
            {items.map((item, index) => <UploadedFilesItem to={item.to} fileURL={item.fileURL} fileName={item.fileName} index={index} key={index} />)}
        </div>
    );
}

export default UploadedFiles;
