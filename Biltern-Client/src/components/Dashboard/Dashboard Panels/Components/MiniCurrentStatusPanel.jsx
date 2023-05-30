/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/MiniCurrentStatusPanel.module.css'
import userSymbol from "../images/CurrentStatusUser.png"
import rightArrow from "../images/right-arrow.png"
import downArrow from "../images/down-arrow.png"
import { getReportStatus, getStudentDetails } from "../../../../apiHelper/backendHelper";

/**
 * Gets necessary information from database and displays the stage that a student is in.
 * @returns mini current status panel
 */
export default function MiniCurrentStatusPanel(){
    React.useEffect(()=>{
        getStudentDetails()
        .then(res => {
            console.log(res.data.reports)

        })
        .catch(err => {
            console.log(err)

    });
    getReportStatus(3)
    .then(res => {
        console.log(res.data)
        setStatusInfo(res.data)
    })
    .catch(err => {
        console.log(err)
});
},[])

    const [statusInfo, setStatusInfo] = React.useState([]);



    const currentStageStyle = {
        backgroundColor: '#A9FF65',
        opacity: '100%'
    }

    return(
        <div className={classes.mini_current_status_panel_container} >
            <h1>Current Status</h1>
            <div className={classes.stage_marker} style={{justifyContent: 'center'}} >
                <img src={userSymbol}/>
                <img src={downArrow} />
            </div>
            <div className={classes.stages_container}>
                <div className={classes.stage} >
                    <p>
                        {statusInfo[0]}
                    </p>
                </div>
                <img src={rightArrow} />
                <div className={classes.stage} style={currentStageStyle}>
                    <p>
                        {statusInfo[1]}
                    </p>
                </div>
                <img src={rightArrow} />
                <div className={classes.stage} >
                    <p>
                        {statusInfo[2]}
                    </p>
                </div>
            </div>
            
        </div>
    )
}