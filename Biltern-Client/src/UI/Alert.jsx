import React from 'react'
import { useSelector } from 'react-redux';

import './Alert.css';

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for displaying alerts
 */

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const Alert = () => {
    const alerts = useSelector((state) => state.alert.alerts);
    // const loading = useAppSelector(state => state.post.loading);
    // console.log(loading);
    // if (loading) {
    //     alerts.concat({id: "loading", msg: "Loading...", alertType: "info"});
    // }

    // useEffect(() => {
        
    // }, [alerts]);    

    if (alerts === null || alerts.length === 0) {
        return null;
    }

    return ( 
        <div className="alerts">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                        {alert.msg}
                    </div>    
                ))}
        </div>
    );
}

export default Alert