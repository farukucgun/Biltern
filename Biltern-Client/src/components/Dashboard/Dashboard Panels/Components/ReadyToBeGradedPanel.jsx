import React from "react";
import classes from '../styles/ReadyToBeGradedPanel.module.css'
import readyReports from '../Data/ReadyToBeGradedPanel.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function ReadyToBeGradedPanel(){

    const readyToBeGraded = readyReports.map( report => {
        return <div className={classes.ready_report} >{report.stage} | {report.studentName}</div>
    })

    return(
        <div className={classes.ready_to_be_graded_panel_container} >
            <h1>Ready to be Graded</h1>
            {readyToBeGraded}
        </div>
    )
}