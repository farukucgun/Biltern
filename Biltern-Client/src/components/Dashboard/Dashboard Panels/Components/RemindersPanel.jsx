import React from "react";
import classes from '../styles/RemindersPanel.module.css'
import reminders from '../Data/RemindersPanel.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function GraderInfo(){

    const remindersElement = reminders && reminders.map(reminder => <li>{reminder}</li>)
    return(
        <div className={classes.reminders_panel_container}>
            <h1 > Reminders </h1>
            {remindersElement}
        </div>
    )
}