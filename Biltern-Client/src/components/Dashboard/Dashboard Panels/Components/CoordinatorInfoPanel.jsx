import React from "react";
import classes from '../styles/CoordinatorInfoPanel.module.css'
import coordinatorInfo from '../Data/CoordinatorInfoPanel.json'
import profileImg from "../images/profile.png"

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function CoordinatorInfoPanel(){

    const coordinatorExists = coordinatorInfo !== undefined;

    return(
        <div className={classes.coordinator_info_panel_container}>
            <h1> Coordinator </h1>
            {coordinatorExists
            ? 
            <div>
                <div className={classes.coordinator_profile}>
                    <img className={classes.coordinator_image} src={profileImg}/>
                    <div >
                        <div className={classes.coordinator_name}>
                            <p >
                                {coordinatorInfo.coordinatorName}
                            </p>
                        </div>
                        <p>
                            Course Coordinator
                        </p>
                    </div>
                </div>
                <p>
                    Contact: {coordinatorInfo.contactMail}
                </p>
            </div>    
            :  
            <div>
                Coordinator is not initialized yet.
            </div>
            }
        </div>
    )
}