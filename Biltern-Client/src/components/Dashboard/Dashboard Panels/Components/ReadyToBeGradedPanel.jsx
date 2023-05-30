import React from "react";
import classes from '../styles/ReadyToBeGradedPanel.module.css'
import readyReports from '../Data/ReadyToBeGradedPanel.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function ReadyToBeGradedPanel(){

    const readyReportsExist = readyReports !== undefined;

    const readyToBeGraded = readyReports.slice(0,4).map( (report, index) => {
        return <div className={classes.ready_report} key={index}> {report.stage} | {report.studentName}</div>
    })

    return(
        <div className={classes.ready_to_be_graded_panel_container} >
            <h1>Ready to be Graded</h1>
            {readyReportsExist
            ?
            readyToBeGraded
            :
            <div>
                There is no ready to be graded reports
            </div>
            }
            
        </div>
    )
}