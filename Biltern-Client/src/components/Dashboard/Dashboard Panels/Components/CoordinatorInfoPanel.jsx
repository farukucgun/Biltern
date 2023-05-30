/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/CoordinatorInfoPanel.module.css'
import coordinatorInfo from '../Data/CoordinatorInfoPanel.json'
import profileImg from "../images/profile.png"
import { getSecretaryDetails } from "../../../../apiHelper/backendHelper";


/**
 * Gets coordinator data from database and displays necessary information.
 * @returns coordinator information panel
 */
export default function CoordinatorInfoPanel(){

    React.useEffect(()=>{
        getSecretaryDetails()
        .then(res => {
            console.log(res.data)
            setCoordinatorData(res.data)
        })
        .catch(err => {
            console.log(err)

    });
    },[])

    const coordinatorExists = coordinatorInfo !== undefined; // Check if the coordinator exists

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