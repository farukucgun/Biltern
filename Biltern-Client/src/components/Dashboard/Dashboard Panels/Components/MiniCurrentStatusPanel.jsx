import React from "react";
import classes from '../styles/MiniCurrentStatusPanel.module.css'
import currentStatusInfo from "../Data/CurrentStatusPanel.json"
import userSymbol from "../images/CurrentStatusUser.png"
import rightArrow from "../images/right-arrow.png"
import downArrow from "../images/down-arrow.png"

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function CurrentStatusPanel(){

    let statusInfo = []
    for(let i = 0; i < currentStatusInfo.length; i++){
        if( currentStatusInfo[ i ].currentStage ){
            if( i === 0 ){
                statusInfo.push(currentStatusInfo[0])
                statusInfo.push(currentStatusInfo[1])
                statusInfo.push(currentStatusInfo[2])
            }
            else if( i === currentStatusInfo.length - 1 ){
                statusInfo.push(currentStatusInfo[currentStatusInfo.length - 3])
                statusInfo.push(currentStatusInfo[currentStatusInfo.length - 2])
                statusInfo.push(currentStatusInfo[currentStatusInfo.length - 1])
            }
            else{
                statusInfo.push(currentStatusInfo[i-1])
                statusInfo.push(currentStatusInfo[i])
                statusInfo.push(currentStatusInfo[i+1])
            }
        }
    }
    let markerStyle;
    if( statusInfo[0].currentStage ){
        markerStyle = { justifyContent: 'left' }
    }
    else if( statusInfo[1].currentStage ){
        markerStyle = { justifyContent: 'center' }
    }
    else{
        markerStyle = { justifyContent: 'right' }
    }

    const currentStageStyle = {
        backgroundColor: '#A9FF65',
        opacity: '100%'
    }

    return(
        <div className={classes.mini_current_status_panel_container} >
            <h1>Current Status</h1>
            <div className={classes.stage_marker} style={markerStyle} >
                <img src={userSymbol}/>
                <img src={downArrow} />
            </div>
            <div className={classes.stages_container}>
                <div className={classes.stage} style={statusInfo[0].currentStage ? currentStageStyle: {}}>
                    <p>
                        {statusInfo[0].stageName}
                    </p>
                </div>
                <img src={rightArrow} />
                <div className={classes.stage} style={statusInfo[1].currentStage ? currentStageStyle: {}}>
                    <p>
                        {statusInfo[1].stageName}
                    </p>
                </div>
                <img src={rightArrow} />
                <div className={classes.stage} style={statusInfo[2].currentStage ? currentStageStyle: {}}>
                    <p>
                        {statusInfo[2].stageName}
                    </p>
                </div>
            </div>
            
        </div>
    )
}