import React from "react";
import classes from '../styles/TAInfoPanel.module.css'
import TAInfo from '../Data/TAInfo.json'
import profileImg from "../images/profile.png"

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function GraderInfoPanel(){

    return(
        <div className={classes.ta_info_panel_container}>
            <h1 > Teaching Assistant </h1>
            <div className={classes.ta_profile}>
                <img className={classes.profile_image} src={profileImg}/>
                <div >
                    <div className={classes.ta_name}>
                    <p >
                        {TAInfo.TAName}
                    </p>
                    </div>
                    <p>
                        Teaching Assistant
                    </p>
                </div>
            </div>
            <p>
                Contact: {TAInfo.contactMail}
            </p>
        </div>
    )
}