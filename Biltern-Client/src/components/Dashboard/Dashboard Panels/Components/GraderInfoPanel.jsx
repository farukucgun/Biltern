/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/GraderInfo.module.css'
import graderInfo from '../Data/GraderInfo.json'
import profileImg from "../images/profile.png"


/**
 * Gets grader data from database and displays necessary information.
 * @returns grader information panel
 */
export default function GraderInfoPanel(){

    const graderExists = graderInfo !== undefined;


    return(
        <div className={classes.grader_info_panel_container}>
            <h1 > Grader </h1>
            {graderExists
            ?
            <div>
                <div className={classes.grader_profile}>
                    <img className={classes.profile_image} src={profileImg}/>
                    <div >
                        <div className={classes.grader_name}>
                        <p >
                            {graderInfo.graderName}
                        </p>
                        </div>
                        <p>
                            Teaching assistant
                        </p>
                    </div>
                </div>
                <p>
                    Contact: {graderInfo.contactMail}
                </p>
            </div>
            :
            <div>
                Grader is not initialized yet.
            </div>
            }
            
        </div>
    )
}