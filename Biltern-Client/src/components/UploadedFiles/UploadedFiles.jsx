import React from "react";
import classes from "./UploadedFiles.module.css";
import UploadedFilesItem from "./UploadedFilesItem";

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

const items = [
    {to: "/displayfilepage", file: "CS319_AnalysisReport_Iter1_Caffe (2).pdf"},
    {to: "/displayfilepage", file: "blablabla..pdf"},
    {to: "/displayfilepage", file: "...pdf"},
    {to: "/displayfilepage", file: "...pdf"}
]
const UploadedFiles = () => {
    return (
        <div className={classes.uploaded_files_container}>
            {items.map((item, index) => <UploadedFilesItem to={item.to} pdfFile={item.file} index={index} key={index} />)}
        </div>
    );
}

export default UploadedFiles;
