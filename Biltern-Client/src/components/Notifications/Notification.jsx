import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTimedAlert } from "../../features/alertSlice";
import "./Notification.css"

/**
 * @author Faruk Uçgun
 * @date 09.05.2023
 * @todo: use reportId (if available) to redirect to related report page
 */

const Notification = (props) => {
    const {type, body, date, seen, reportId, notificationId, onDeleteNotification} = props;
    const dispatch = useDispatch();

    const notificationDate = new Date(date)
 

    const activeClasses = `notification ${seen ? "notification-seen" : ""}`;

    const deleteNotificationHandler = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        };

        axios.delete(`http://localhost:8080/notification/${notificationId}`, config)
            .then(res => {
                // dispatch(setTimedAlert({msg: "Notification deleted", alertType: "success", timeout: 4000}));
                onDeleteNotification(notificationId);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while deleting notification", alertType: "error", timeout: 4000}));
            });
    };

    return (
        <li className={activeClasses}>
            <button className="delete-notification" onClick={deleteNotificationHandler}>X</button>
            <h3>{type}</h3>
            <p>{body}</p>
            <p>{notificationDate.toString()}</p>
        </li>
    );    
};

export default Notification;