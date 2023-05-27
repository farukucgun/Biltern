import React from "react";
import classes from '../styles/GraderInfo.module.css'
import graderInfo from '../Data/GraderInfo.json'
import profileImg from "../images/profile.png"

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function GraderInfoPanel(){

    return(
        <div className={classes.grader_info_panel_container}>
            <h1 > Grader </h1>
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
    )
}