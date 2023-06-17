import React, {useState, useEffect} from "react";
import notification_img from "../../assets/notification.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTimedAlert } from "../../features/alertSlice";
import Notification from "./Notification";

import classes from "./Notifications.module.css"; 

/**
 * @author Faruk Uçgun
 * @date 09.05.2023
 * @abstract: This component is responsible for displaying notifications
 */

const Notifications = () => {

    const dispatch = useDispatch();

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
        if (!showNotifications) {
            for (let notification of notifications) {
                if (!notification.seen) {
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem("token") || ""
                        }
                    };

                    const id = notification.notificationId;
                    axios.put(`http://localhost:8080/notification/${id}`, config)
                        .then(res => {

                        })
                        .catch(err => {
                            dispatch(setTimedAlert({msg: "Error while marking notifications as seen", alertType: "error", timeout: 4000}));
                        });
                }
            }            
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        };

        await axios.get("http://localhost:8080/notification", config)
            .then(res => {
                setNotifications(res.data);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
            });
        };

        fetchNotifications()
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
            }
        );
    }, []);

    const deleteNotificationHandler = (notificationId) => {
        setNotifications((prevNotifications) => { 
            return prevNotifications.filter(notification => notification.notificationId !== notificationId);
        });
    };

    return (
        <div>
            <img src={notification_img} alt="notifications-icon" className={classes.notificationIcon} onClick={toggleNotifications}/>
            {showNotifications && 
            <ul className={classes.notificationContainer}>
                <h3>Notifications</h3>
                {notifications.map((notification) => (
                    <Notification
                        type={notification.type}
                        body={notification.body}
                        date={notification.date}
                        seen={notification.seen}
                        reportId={notification.reportId}
                        key={notification.notificationId}
                        notificationId={notification.notificationId}
                        onDeleteNotification={deleteNotificationHandler}
                    />
                ))}
            </ul>}
        </div>
    );    
};

export default Notifications;