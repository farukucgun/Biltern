/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/TAInfoPanel.module.css'
import TAInfo from '../Data/TAInfo.json'
import profileImg from "../images/profile.png"


/**
 * Gets teaching assistant data from database and displays necessary information.
 * @returns teaching assistant information panel
 */
export default function TAInfoPanel(){

    const taExists = TAInfo !== undefined;

    return(
        <div className={classes.ta_info_panel_container}>
            <h1 > Teaching Assistant </h1>
            {taExists
            ?
            <div>
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
            :
            <div>
                Teaching Assistant is not initialized yet.
            </div>
            }
            
        </div>
    )
}